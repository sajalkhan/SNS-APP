import mongoose from 'mongoose';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { reactionService } from '@service/db/reaction.service';
import { IReactionDocument } from '@reaction/interfaces/reaction.interface';

export class Get {
  public async reactions(req: Request, res: Response): Promise<void> {
    const { postId } = req.params;
    const reactions: [IReactionDocument[], number] = await reactionService.getPostReactions(
      { postId: new mongoose.Types.ObjectId(postId) },
      { createdAt: -1 }
    );
    res.status(HTTP_STATUS.OK).json({ message: 'Post reactions', reactions: reactions[0], count: reactions[1] });
  }

  public async singleReactionByUsername(req: Request, res: Response): Promise<void> {
    const { postId, username } = req.params;

    const reactions: [IReactionDocument, number] | [] = await reactionService.getSinglePostReactionByUsername(postId, username);

    res.status(HTTP_STATUS.OK).json({
      message: 'Single post reaction by username',
      reactions: reactions.length ? reactions[0] : {},
      count: reactions.length ? reactions[1] : 0
    });
  }

  public async reactionsByUsername(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    const reactions: IReactionDocument[] = await reactionService.getReactionsByUsername(username);
    res.status(HTTP_STATUS.OK).json({ message: 'All user reactions by username', reactions });
  }
}
