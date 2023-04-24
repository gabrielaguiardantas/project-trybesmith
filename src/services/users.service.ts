import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/user.interface';

class UserService {
  model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  async getAll(): Promise<User[]> {
    const Users = await this.model.getAll();
    return Users;
  }

  async create(user: User): Promise<User> {
    return this.model.create(user);
  }
}

export default UserService;