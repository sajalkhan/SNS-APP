import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export interface AuthPayload {
  userId: string;
  uId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number;
}

export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  uId: string;
  username: string;
  email: string;
  password?: string;
  avatarColor: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface ISignUpData {
  _id: ObjectId;
  uId: string;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
}

export interface IAuthJob {
  value?: string | IAuthDocument;
}

/** NOTE:
This is TypeScript code for an authentication system that uses Mongoose, a MongoDB object modeling tool.
Here's what each part of the code does:

1. The first line imports the `Document` type from Mongoose and the `ObjectId` type from MongoDB.

2. The `declare global` block extends the `Express` namespace in TypeScript. Specifically, it adds a `currentUser`
  property to the `Request` interface in the `Express` namespace, which is optional and of type `AuthPayload`.

3. The `AuthPayload` interface defines the shape of the payload that will be used to authenticate users.
  It includes fields like `userId`, `uId`, `email`, `username`, `avatarColor`, and `iat`.

4. The `IAuthDocument` interface defines the shape of the authentication document that will be stored in the database.
   It includes fields like `_id`, `uId`, `username`, `email`, `password`, `avatarColor`, `createdAt`, `passwordResetToken`, and `passwordResetExpires`.
   It also includes methods like `comparePassword` and `hashPassword`.

5. The `ISignUpData` interface defines the shape of the data that will be used to sign up new users.
   It includes fields like `_id`, `uId`, `email`, `username`, `password`, and `avatarColor`.

6. The `IAuthJob` interface defines the shape of a job that can be passed to a function.
   It includes a `value` field that is either a string or an `IAuthDocument` object.

Overall, this code defines the types and interfaces needed for an authentication system that uses Mongoose and MongoDB.
*/
