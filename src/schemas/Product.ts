import { string, number, object, array } from "valibot";

export const ProductSchema = object({
  _id: string(),
  name: string(),
  price: number(),
  brand: string(),
  witght: string(),
  quantity: number(),
  category: object({
    name: string(),
  }),
});

export const ProductsSchema = object({
  products: array(ProductSchema),
});
