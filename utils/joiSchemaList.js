const joi = require('joi');
const { listOfCurrencies } = require('./supportedCurrencies');

// User Entity Schema
exports.userSchema = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.forbidden()
    }),
  fullName: joi.string()
    .min(5)
    .max(50)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  email: joi.string()
    .email({ minDomainSegments: 2 })
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.forbidden()
    }),
  address: joi.string()
    .min(5)
    .max(50)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  password: joi.string()
    .min(8)
    .max(80)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  phoneNumber: joi.string()
    .min(10)
    .max(10)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  roleName: joi.string()
    .min(5)
    .max(50),
  discount: joi.number()
    .min(0.01)
    .max(1)
    .precision(2),
  currency: joi.string()
    .min(3)
    .max(3)
    .valid(...listOfCurrencies)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    })
}).options({ abortEarly: false });

// Order Entity Schema
exports.orderSchema = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (orderSchema) => orderSchema.required(),
      put: (orderSchema) => orderSchema.forbidden()
    }),
  userId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (orderSchema) => orderSchema.required(),
      put: (orderSchema) => orderSchema.forbidden()
    }),
  itemList: joi.array()
    .items({
      itemId: joi.string()
        .guid({ version: 'uuidv4' })
        .alter({
          post: (orderSchema) => orderSchema.required(),
          put: (orderSchema) => orderSchema.forbidden()
        }),
      quantity: joi.number()
        .integer()
        .positive()
        .alter({
          post: (orderSchema) => orderSchema.required(),
          put: (orderSchema) => orderSchema.forbidden()
        }),
      status: joi.string()
        .alter({
          post: (orderSchema) => orderSchema.forbidden(),
          put: (orderSchema) => orderSchema.required()
        })
    }),
  currency: joi.string()
    .min(3)
    .max(3)
    .valid(...listOfCurrencies)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    })
}).options({ abortEarly: false });

// Item Entity Schema
exports.itemSchema = joi.object({
  id: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (orderSchema) => orderSchema.required(),
      put: (orderSchema) => orderSchema.forbidden()
    }),
  name: joi.string()
    .min(1)
    .max(50)
    .alter({
      post: (userSchema) => userSchema.required(),
      put: (userSchema) => userSchema.optional()
    }),
  serialNumber: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (orderSchema) => orderSchema.required(),
      put: (orderSchema) => orderSchema.forbidden()
    }),
  price: joi.number()
    .positive(),
  categoryId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (orderSchema) => orderSchema.required(),
      put: (orderSchema) => orderSchema.forbidden()
    }),
  manufacturerId: joi.string()
    .guid({ version: 'uuidv4' })
    .alter({
      post: (orderSchema) => orderSchema.required(),
      put: (orderSchema) => orderSchema.forbidden()
    }),
  quantity: joi.number()
    .positive()
}).options({ abortEarly: false });
