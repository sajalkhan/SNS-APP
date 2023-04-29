import HTTP_STATUS from 'http-status-codes';

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status
    };
  }
}

export class JoiRequestValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

/**
 **This code defines an abstract CustomError class that extends the built-in Error class in JavaScript.
 **This class is designed to be inherited by specific error classes to provide a consistent error response format.
 **The CustomError class has two abstract properties statusCode and status which must be implemented by the subclasses that inherit from it.
 **It also has a method serializeErrors() which will be used to serialize the error response to be returned to the client.
 **The IError and IErrorResponse interfaces define the structure of the error response object that will be returned to the client,
 **and the serializeErrors() method of CustomError returns this object.
 **The JoiRequestValidationError class extends CustomError and implements its own constructor which accepts a message parameter.
 **It sets the statusCode and status properties to HTTP_STATUS.BAD_REQUEST and 'error' respectively.
 **When an instance of this class is created, the message, statusCode, and status properties will be set accordingly.
 **In summary, this code provides a way to create custom error classes with a consistent error response format,
 **making it easier to handle errors in a Node.js application.
 */
