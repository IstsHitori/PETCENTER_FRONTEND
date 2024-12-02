import { array, object, string } from "valibot";

export const HitorySchema = object({
    _id:string(),
    patient:string(),
    history:string(),
    date:string(),
});

export const HistoriesSchema = array(HitorySchema);