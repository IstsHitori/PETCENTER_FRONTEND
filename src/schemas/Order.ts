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
  product: object({
    _id: string(),
    name: string(),
  }),
  quantity: number(),
  price: number(),
});

export const OrderSchema = object({
  _id: string(),
  customer: CustomerSchema,
  items: array(ItemSchema),
  total_amount: number(),
  date: string(),
  payment_method: string(),
});

export const OrdersSchema = object({
  orders: array(OrderSchema),
});
