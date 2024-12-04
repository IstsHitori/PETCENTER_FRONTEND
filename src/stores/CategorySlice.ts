import { Category } from "@/types/CategoryTypes";
import { StateCreator } from "zustand";
import { safeParse } from "valibot";
import { CategoriesScehma } from "@/schemas/Category";
import clientAxios from "@/config/axios";
import { config } from "@/helpers/fetchAPI";
export interface ICategorySlice {
    categories:Category[]
    fetchCategories: () => Promise<void>;
}

async function getCategoriesFetch() {
    const token = localStorage.getItem("pet-veterinaria-token") || "";
    const response = await clientAxios.get("/category", config(token));
    if (response.status !== 200) {
      throw new Error("Error al obtener las categorias");
    }
    const { data } = response;
    const categoryResponse = safeParse(CategoriesScehma, data);
    if (!categoryResponse.success) {
      throw new Error("Error al parsear las categorias");
    }
    return categoryResponse.output.categories;
}

export const createCategorySlice:StateCreator<ICategorySlice> = (set,get) => ({
    categories:[],
    fetchCategories: async () => {
        try{
            const categories = await getCategoriesFetch();
            set(() => ({
                categories
            }))
        }catch(error){
            console.log(error);
        }
    }
});
