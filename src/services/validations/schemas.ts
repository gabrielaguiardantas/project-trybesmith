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

const addLoginSchema = Joi.object({
  username: fieldSchema.label('username'),
  password: fieldSchema.label('password'),
});

const addOrderSchema = Joi.object({
  productsIds: Joi.array().required().min(1).label('productsIds')
    .messages({
      'array.min': '"productsIds" must include only numbers',
    }),
});

export default {
  addProductSchema,
  addUserSchema,
  addLoginSchema,
  addOrderSchema,
};