import { HistoriesSchema, HitorySchema } from "@/schemas/History";
import { InferOutput } from "valibot";

export type History = InferOutput<typeof HitorySchema>
export type Histories = InferOutput<typeof HistoriesSchema>
export type AddHistory = {
    history:string
}