import { PatientSchema } from "@/schemas/Patient"
import { InferOutput } from "valibot";
export type Patient = InferOutput<typeof PatientSchema>;
export type AddPatient  = Omit<Patient, "state" | "createdAt" | "updatedAt" | "_id" >
export type UpdatePatient = Omit<Patient,"createdAt" | "updatedAt" | "_id">