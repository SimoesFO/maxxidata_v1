import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

function validation(schema: OptionalObjectSchema<ObjectShape>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ValidationError | void> => {
    const { body } = req;

    await schema.validate(body, { abortEarly: false });

    return next();
  };
}
export default validation;
