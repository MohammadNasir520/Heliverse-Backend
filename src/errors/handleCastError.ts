import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: '',
      message: error.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'invalid Id',
    errorMessages: errors,
  };
};
