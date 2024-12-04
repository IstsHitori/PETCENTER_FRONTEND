import { InferOutput } from "valibot";
import { ProductSchema } from "@/schemas/Product";

export type Product = InferOutput<typeof ProductSchema>;