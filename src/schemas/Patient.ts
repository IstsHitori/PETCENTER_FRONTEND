import { array, boolean, object, string } from "valibot";
export const PatientSchema = object({
  _id: string(),
  name: string(),
  propietor: string(),
  docPropietor: string(),
  telephone: string(),
  date: string(),
  state: boolean(),
  createdAt:string(),
  updatedAt:string(),
  symptoms: string(),
  size: string(),
  typePet: string(),
  hasVaccine: boolean(),
});

export const PatientsSchema = object({
  patients:array(PatientSchema)
});
