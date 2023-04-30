import { hash, compare } from 'bcryptjs';
import { model, Model, Schema } from 'mongoose';
import { IAuthDocument } from '@auth/interfaces/auth.interface';

const SALT_ROUND = 10;

const authSchema: Schema = new Schema(
  {
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    avatarColor: { type: String },
    createdAt: { type: Date, default: Date.now },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
});

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as unknown as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };

/** NOTE:
This is TypeScript code that defines a Mongoose schema for an authentication document and exports a model based on that schema.
Here's what each part of the code does:

1. The first two lines import the `hash` and `compare` functions from the `bcryptjs` library and the `model`, `Model`, and `Schema` types from Mongoose.
   It also imports the `IAuthDocument` interface from the `auth.interface.ts` file.

2. The `SALT_ROUND` constant defines the number of rounds of hashing to apply to the password when it's being hashed.

3. The `authSchema` constant defines a new Mongoose schema for the authentication document. It includes fields like
   `username`, `uId`, `email`, `password`, `avatarColor`, `createdAt`, `passwordResetToken`, and `passwordResetExpires`.
   It also includes a `toJSON` transform that removes the password field from the document when it's converted to JSON.

4. The `authSchema.pre` method sets up a pre-hook that runs before a document is saved. It hashes the password using the `hash` function from `bcryptjs`.

5. The `authSchema.methods.comparePassword` method is a custom method that can be called on an authentication document instance.
   It compares the provided password to the hashed password stored in the document.

6. The `authSchema.methods.hashPassword` method is another custom method that can be called on an authentication document instance.
    It hashes the provided password using the `hash` function from `bcryptjs`.

7. The `AuthModel` constant defines a new Mongoose model for the `Auth` collection, based on the `authSchema`.
    It is exported for use in other parts of the application.

Overall, this code sets up a Mongoose schema and model for an authentication document, with pre-hooks for hashing passwords and custom methods for comparing and hashing passwords.
 */
