/* eslint-disable max-lines-per-function */
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/users.service';
import Token from '../interfaces/token.interface';

interface RequestWithUserRole extends Request {
  user?: Token,
}

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const validateJWT = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const userService = new UsersService();
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    }); 
  }
  try {
    const decoded = <Token>jwt.verify(token, secret);
    const user = (await userService
      .getAll()).find((userOb) => userOb.username === decoded.username);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateJWT;