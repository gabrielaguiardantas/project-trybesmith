import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import Order from '../interfaces/order.interface';
import ProductModel from '../models/products.model';
import Token from '../interfaces/token.interface';

class OrdersService {
  model1: OrderModel;

  model2: ProductModel;

  constructor() {
    this.model1 = new OrderModel(connection);
    this.model2 = new ProductModel(connection);
  }

  async getAll(): Promise<Order[]> {
    const Orders = await this.model1.getAll();
    return Orders;
  }

  async create(productsIds: number[], user: Token): Promise<Order> {
    const newOrder = await this.model1.create(user);
    await Promise.all(productsIds
      .map((productId: number) => this.model2.update(newOrder.id, productId)));
    return { userId: user.id, productsIds };
  }
}

export default OrdersService;