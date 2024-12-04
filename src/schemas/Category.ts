import { array, object, string } from "valibot";

export const CategorySchema = object({
    _id:string(),
    name:string(),
    description:string()
});

export const CategoriesScehma = object({
  categories: array(CategorySchema),
});
