import { z } from 'zod';
// Re-exporting types specifically
export type {
  Product,
  ProductCategory,
  ProductSpecification,
  ProductToTemplate
} from './src/productValidator';

// Re-exporting actual values (functions, classes, objects)
export {
  ProductSchema,
  ProductSpecificationSchema,
  ProductToTemplateSchema
} from './src/productValidator';