import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import OrdersService from '../services/orders.service';
import statusCodes from '../utils/statusCodes';
import Token from '../interfaces/token.interface';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

class OrdersController {
  ordersService: OrdersService;

  constructor(ordersService = new OrdersService()) {
    this.ordersService = ordersService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const Orders = await this.ordersService.getAll();
    res.status(statusCodes.OK).json(Orders);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { productsIds } = req.body;
    const token = req.header('Authorization');
    if (token) {
      const decoded = jwt.verify(token, secret) as Token;
      const userId = {
        id: decoded.id,
        username: decoded.username,
      };
      const newOrder = await this.ordersService.create(productsIds, userId);
      return res.status(statusCodes.CREATED).json(newOrder);
    }
    return res.status(401).json({
      message: 'Token not found',
    });
  }
}

export default OrdersController;