import { array, number, object, string, undefined, union } from "valibot";

export const ServiceSchema = object({
    _id:string(),
    name:string(),
    price:number(),
    date:string(),
    patient:object({
        _id:string(),
        name:string(),
        propietor:string()
    }),
    state:string(),
    days:union([number(),undefined()]),
    type:union([string(),undefined()]),
    product:union([object({
        _id:string(),
        name:string()
    }),undefined()])
});

export const ServicesSchema = object({
    services:array(ServiceSchema)
})