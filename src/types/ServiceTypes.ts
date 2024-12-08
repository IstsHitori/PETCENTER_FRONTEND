import { InferOutput } from "valibot";
import { ServiceSchema,ServicesSchema } from "@/schemas/Service";
import { Patient } from "./PatientTypes";
import { Product } from "./ProductTypes";

export type Service = InferOutput<typeof ServiceSchema>;
export type Services = InferOutput<typeof ServicesSchema>;
export type AddService = {
    name:string,
    price:number,
    state:string,
    patient:Patient["_id"],
    product:Product["_id"] | undefined,
    days:number | undefined,
    type:string | undefined
}