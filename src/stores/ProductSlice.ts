import { StateCreator } from "zustand";
import { Product } from "@/types/ProductTypes";
import { config } from "@/helpers/fetchAPI";
import clientAxios from "@/config/axios";
import { safeParse } from "valibot";
import { ProductsSchema } from "@/schemas/Product";
export interface IProductSlice {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

async function getProductsFetch() {
  const token = localStorage.getItem("pet-veterinaria-token") || "";
  const response = await clientAxios.get("/product", config(token));
  if (response.status !== 200) {
    throw new Error("Error al obtener los productos");
  }
  const { data } = response;
  const productResponse = safeParse(ProductsSchema, data);
  if (!productResponse.success) {
    throw new Error("Error al parsear los productos");
  }
  return productResponse.output.products;
}

export const createProductSlice: StateCreator<IProductSlice> = (set, get) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const products = await getProductsFetch();
      set(() => ({
        products,
      }));
    } catch (error) {
      console.log(error);
    }
  },
});
