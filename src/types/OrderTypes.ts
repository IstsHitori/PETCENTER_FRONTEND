import { CustomerSchema, ItemSchema, OrderSchema } from "@/schemas/Order";
import { InferOutput } from "valibot";

export type Customer = InferOutput<typeof CustomerSchema>;
export type Item = InferOutput<typeof ItemSchema>;
export type Order = InferOutput<typeof OrderSchema>;

export type AddOrder = {
  customer: {
    name: string;
    nit: number;
    address: string;
    telephone: string;
  };
  items:
    {
      product: string;
      quantity: number;
      price: number;
    }[],
  total_amount: number;
  payment_method: string;
};

export type AddItem ={
    product:string,
    quantity:number,
    price:number
}