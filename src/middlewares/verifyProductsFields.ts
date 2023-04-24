import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

const verifyProductsFields = (req: Request, res: Response, next: NextFunction) => {
  const { name, amount } = req.body;
  if (!name || !amount) {
    return res.status(statusCodes.BAD_REQUEST).json({ 
      message: 'Campo name e amount orbigatórios!',
    });
  }
  if (typeof name !== 'string' || typeof amount !== 'string') {
    return res.status(statusCodes.BAD_REQUEST).json({ 
      message: 'Campo name e amount devem estar no formato string!',
    });
  }
  next();
};

export default verifyProductsFields;