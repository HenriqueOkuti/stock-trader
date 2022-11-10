import { TOKEN_LENGTH } from '../enums/index.js';
import Joi from 'joi';

export const tokenSchema = Joi.string()
  .length(TOKEN_LENGTH)
  .lowercase()
  .required();
