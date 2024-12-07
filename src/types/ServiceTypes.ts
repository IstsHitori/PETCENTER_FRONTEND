import { InferOutput } from "valibot";
import { ServiceSchema,ServicesSchema } from "@/schemas/Service";

export type Service = InferOutput<typeof ServiceSchema>;
export type Services = InferOutput<typeof ServicesSchema>;