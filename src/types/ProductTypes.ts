import { InferOutput } from "valibot";
import { ProductSchema } from "@/schemas/Product";

export type Product = InferOutput<typeof ProductSchema>;
export type AddProduct = {
    name:string,
    brand:string,
    price:number,
    quantity:number,
    category:string,
    witght:string
}