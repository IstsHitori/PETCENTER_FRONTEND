import { array, number, object, string } from "valibot";

export const CustomerSchema = object({
  _id: string(),
  name: string(),
  nit: number(),
  address: string(),
  telephone: string(),
});

export const ItemSchema = object({
  _id: string(),
  product: string(),
  quantity: number(),
  price: number(),
});

export const OrderSchema = object({
  _id: string(),
  customer: CustomerSchema,
  items: array(ItemSchema),
  total_amunt: number(),
  date: string(),
});

export const OrdersSchema = array(OrderSchema);
