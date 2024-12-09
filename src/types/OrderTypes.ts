import { CustomerSchema, ItemSchema, OrderSchema } from "@/schemas/Order";
import { InferOutput } from "valibot";

export type Customer = InferOutput<typeof CustomerSchema>;
export type Item = InferOutput<typeof ItemSchema>;
export type Order = InferOutput<typeof OrderSchema>;