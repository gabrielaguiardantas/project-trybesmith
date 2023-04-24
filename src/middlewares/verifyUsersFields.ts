import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import schemas from '../services/validations/schemas';

const verifyUsersFields = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemas.addUserSchema.validate(req.body);

  if (error) {
    if (error.message.includes('required')) {
      return res
        .status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }
    if (error.message.includes('string')) {
      return res
        .status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
    }
    return res
      .status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }
  next();
};

export default verifyUsersFields;