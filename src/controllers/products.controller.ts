import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import ProductsService from '../services/products.service';

class ProductsController {
  productsService: ProductsService;
  
  constructor(productsService = new ProductsService()) {
    this.productsService = productsService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const Products = await this.productsService.getAll();
    res.status(statusCodes.OK).json(Products);
  }

  async create(req: Request, res: Response): Promise<void> {
    const product = req.body;
    const newProduct = await this.productsService.create(product);
    res.status(statusCodes.CREATED).json(newProduct);
  }
}

export default ProductsController;