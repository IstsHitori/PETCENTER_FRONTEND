/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddCategory, Category } from "@/types/CategoryTypes";
import { StateCreator } from "zustand";
import { safeParse } from "valibot";
import { CategoriesScehma } from "@/schemas/Category";
import clientAxios from "@/config/axios";
import { config } from "@/helpers/fetchAPI";
import axios from "axios";
import { Id, toast } from "react-toastify";
export interface ICategorySlice {
  categories: Category[];
  isActiveModalAddCategory: boolean;
  fetchCategories: () => Promise<void>;
  setModalAddCategory: (state: boolean) => void;
  createCategory: (category: AddCategory) => Promise<void>;
  deleteCategory: (idCategoryToDelete: Category["_id"]) => Promise<void>;
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

export const createCategorySlice: StateCreator<ICategorySlice> = (
  set,
  get
) => ({
  categories: [],
  isActiveModalAddCategory: false,
  fetchCategories: async () => {
    try {
      const categories = await getCategoriesFetch();
      set(() => ({
        categories,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  setModalAddCategory: (state: boolean) => {
    set(() => ({
      isActiveModalAddCategory: state,
    }));
  },
  createCategory: async (category: AddCategory) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.post(
        "/category/create-category",
        category,
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al crear la categoria");
        return;
      }
      toast.success("Se ha creado la categoria");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.msg);
        return;
      }
    }
  },
  deleteCategory: async (idCategoryToDelete) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.delete(
        `/category/delete-category/${idCategoryToDelete}`,
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al crear la categoria");
        return;
      }
      toast.success("Se ha creado la categoria");
      await get().fetchCategories();
    } catch (error) {
      toast.error("Ha ocurrido un error al eliminar la categoria");
      console.log(error);
    }
  },
});
