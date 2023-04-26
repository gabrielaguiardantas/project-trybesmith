import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';
import Token from '../interfaces/token.interface';

const stringQuery1 = 'SELECT ord.id, ord.user_id AS userId, JSON_ARRAYAGG(pro.id) AS productsIds ';
const stringQuery2 = 'FROM Trybesmith.orders as ord INNER JOIN Trybesmith.products ';
const stringQuery3 = 'as pro ON ord.id = pro.order_id GROUP BY pro.order_id;';
const completeQuery = String.prototype.concat(stringQuery1, stringQuery2, stringQuery3);

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Order[]> {
    const result = await this.connection
      .execute(completeQuery);
    const [rows] = result;
    return rows as Order[];
  }

  async create(user: Token): Promise<{ id: number }> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [user.id],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId };
  }
}