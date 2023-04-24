import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import UsersService from '../services/users.service';

class UsersController {
  UsersService: UsersService;
  
  constructor(usersService = new UsersService()) {
    this.UsersService = usersService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const Users = await this.UsersService.getAll();
    res.status(statusCodes.OK).json(Users);
  }

  async create(req: Request, res: Response): Promise<void> {
    const user = req.body;
    const newUser = await this.UsersService.create(user);
    res.status(statusCodes.CREATED).json(newUser);
  }
}

export default UsersController;