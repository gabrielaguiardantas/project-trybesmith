import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/user.interface';
import Json from '../interfaces/json.interface';

class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async getAll(): Promise<User[]> {
    const Users = await this.model.getAll();
    return Users;
  }

  async getByUser(username: string, password: string): Promise<{ user?: User, json?: Json }> {
    const [validUser] = await this.model.getByUser(username, password);
    if (validUser) return { user: validUser };

    return { json: { message: 'Username or password invalid' } };
  }

  async create(user: User): Promise<User> {
    return this.model.create(user);
  }
}

export default UserService;