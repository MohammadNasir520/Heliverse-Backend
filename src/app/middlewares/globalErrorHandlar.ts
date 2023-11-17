import { ErrorRequestHandler, NextFunction } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';

import ApiError from '../../errors/ApiError';
// import { errorLogger } from '../../shared/logger';

import handleZodError from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';
import { ZodError } from 'zod';

const globalErrorHandlar: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  // console.log('gllobar erro handlear consoleded');
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.log('globalErrorHandler', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  /*here many types of error 
  1.mongoose error
  2. error with custom type ApiError.
  3. CastError
  4.Error for missing something and for mistake
  */
  if (error?.name === 'validationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};
export default globalErrorHandlar;
