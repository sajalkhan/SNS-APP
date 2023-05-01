import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { UploadApiResponse } from 'cloudinary';
import { config } from '@root/config';
import { Helpers } from '@global/helpers/helpers';
import { UserCache } from '@service/redis/user.cache';
import { authService } from '@service/db/auth.service';
import { uploads } from '@global/helpers/coludinary-upload';
import { signupSchema } from '@auth/validation-schema/signup';
import { IUserDocument } from '@user/interfaces/user.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { joiValidation } from '@global/decorators/joi-validation-decorator';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';

const userCache: UserCache = new UserCache();

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor, avatarImage } = req.body;
    const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;

    const authData: IAuthDocument = this.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor
    });

    const result: UploadApiResponse = (await uploads(avatarImage, 'SnsApp-profileImage', `${userObjectId}`)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: Error occurred. Try again.');
    }

    // Add to redis cache
    const userDataForCache: IUserDocument = this.userData(authData, userObjectId);
    userDataForCache.profilePicture = `https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/v${result.version}/SnsApp-profileImage/${userObjectId}`;
    await userCache.saveUserToCache(`${userObjectId}`, uId, userDataForCache);

    res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user: authData });
  }

  private signupData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      password,
      avatarColor,
      createdAt: new Date()
    } as IAuthDocument;
  }

  //we will store this user data to redis cache
  private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email,
      password,
      avatarColor,
      profilePicture: '',
      blocked: [],
      blockedBy: [],
      work: '',
      location: '',
      school: '',
      quote: '',
      bgImageVersion: '',
      bgImageId: '',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      notifications: {
        messages: true,
        reactions: true,
        comments: true,
        follows: true
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
      }
    } as unknown as IUserDocument;
  }
}
