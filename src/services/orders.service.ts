import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import Order from '../interfaces/order.interface';

class OrdersService {
  model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  async getAll(): Promise<Order[]> {
    const Orders = await this.model.getAll();
    return Orders;
  }
}

export default OrdersService;