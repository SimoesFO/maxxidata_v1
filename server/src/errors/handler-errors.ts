import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { ValidationError as ClassValidatorError } from 'class-validator';
import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';

interface iValidationError {
  [key: string]: string;
}
interface iValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console.log(error);
  if (error instanceof ValidationError) {
    const errors: iValidationErrors = {};
    error.inner.forEach(err => {
      errors[err.path as string] = err.errors;
    });

    return res.status(400).json({ message: 'Validation fails', errors });
  }

  if (error instanceof Array) {
    const errors: iValidationErrors = {};
    error.forEach(err => {
      if (err instanceof ClassValidatorError) {
        const messageError = Object.values(err.constraints as iValidationError);
        errors[err.property as string] = messageError;
      }
    });

    return res.status(400).json({ message: 'Validation fails', errors });
  }

  const date = format(new Date(), 'yyyyMMddHHmmss_T');
  const contentError = error.stack.toString();
  fs.writeFileSync(
    path.join(__dirname, 'files', `${date}_error.log`),
    contentError,
  );

  return res
    .status(500)
    .json({ message: 'Sorry, there was an error in your request.' });
};

export default errorHandler;
