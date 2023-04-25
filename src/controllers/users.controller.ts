import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../utils/statusCodes';
import UsersService from '../services/users.service';

class UsersController {
  UsersService: UsersService;
  
  constructor(usersService = new UsersService()) {
    this.UsersService = usersService;
    this.getAll = this.getAll.bind(this);
    this.getByUser = this.getByUser.bind(this);
    this.create = this.create.bind(this);
    this.createLogin = this.createLogin.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const Users = await this.UsersService.getAll();
    res.status(statusCodes.OK).json(Users);
  }

  async getByUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const user = await this
      .UsersService.getByUser(username, password);
    res.status(statusCodes.OK).json(user);
  }

  async create(req: Request, res: Response): Promise<void> {
    const user = req.body;
    const newUser = await this.UsersService.create(user);
    const payload = {
      username: user.username,
      id: newUser.id,
      admin: false };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.status(statusCodes.CREATED).json({ token });
  }

  async createLogin(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const result = await this.UsersService.getByUser(username, password);
    if (result.json) {
      res.status(401).json({ message: result.json.message });
      return;
    }
    const payload = {
      username: req.body.username,
      id: result.user?.id,
      admin: false };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' }); 
    res.status(200).json({ token });
  }
}

export default UsersController;