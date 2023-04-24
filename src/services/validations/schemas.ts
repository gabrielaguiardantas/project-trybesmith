import Joi from 'joi';

const fieldSchema = Joi.string().min(3).required();

const addProductSchema = Joi.object({
  name: fieldSchema.label('name'),
  amount: fieldSchema.label('amount'),
});

const addUserSchema = Joi.object({
  username: fieldSchema.label('username'),
  vocation: fieldSchema.label('vocation'),
  level: Joi.number().min(1).required().label('level'),
  password: Joi.string().min(8).required().label('password'),
});

// const itemSale = Joi.object({
//   productId: idSchema.label('productId'),
//   quantity: idSchema.label('quantity').messages({
//     'any.required': '"quantity" is required',
//     'number.min': '"quantity" must be greater than or equal to 1',
//   }),
// });

// const addSaleSchema = Joi.array().min(1).items(itemSale);

export default {
  addProductSchema,
  addUserSchema,
};