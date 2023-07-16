import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { reactionService } from '@service/db/reaction.service';
import { IReactionJob } from '@reaction/interfaces/reaction.interface';

export class Remove {
  public async reaction(req: Request, res: Response): Promise<void> {
    const { postId, previousReaction } = req.params;
    const databaseReactionData: IReactionJob = {
      postId,
      username: req.currentUser!.username,
      previousReaction
    };
    await reactionService.removeReactionDataFromDB(databaseReactionData);

    res.status(HTTP_STATUS.OK).json({ message: 'Reaction removed from post' });
  }
}
