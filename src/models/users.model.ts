import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.users');
    const [rows] = result;
    return rows as User[];
  }

  async create(user: User): Promise<User> {
    const { username, vocation, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { ...user, id: insertId };
  }
}