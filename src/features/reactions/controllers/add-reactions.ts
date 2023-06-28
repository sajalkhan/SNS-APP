import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { reactionService } from '@service/db/reaction.service';
import { joiValidation } from '@global/decorators/joi-validation-decorator';
import { addReactionSchema } from '@reaction/validation-schema/reaction';
import { IReactionDocument, IReactionJob } from '@reaction/interfaces/reaction.interface';

export class Add {
  @joiValidation(addReactionSchema)
  public async reaction(req: Request, res: Response): Promise<void> {
    const { userTo, postId, type, previousReaction, profilePicture } = req.body;
    const reactionObject: IReactionDocument = {
      _id: new ObjectId(),
      postId,
      type,
      avatarColor: req.currentUser!.avatarColor,
      username: req.currentUser!.username,
      profilePicture
    } as IReactionDocument;

    const databaseReactionData: IReactionJob = {
      postId,
      userTo,
      userFrom: req.currentUser!.userId,
      username: req.currentUser!.username,
      type,
      previousReaction,
      reactionObject
    };

    await reactionService.addReactionDataToDB(databaseReactionData);
    res.status(HTTP_STATUS.OK).json({ message: 'Reaction added successfully' });
  }
}
