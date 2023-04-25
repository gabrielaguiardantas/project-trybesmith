import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';
import statusCodes from '../utils/statusCodes';

class OrdersController {
  ordersService: OrdersService;

  constructor(ordersService = new OrdersService()) {
    this.ordersService = ordersService;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const Orders = await this.ordersService.getAll();
    res.status(statusCodes.OK).json(Orders);
  }
}

export default OrdersController;