/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from "zustand";
import { AddProduct, Product } from "@/types/ProductTypes";
import { config } from "@/helpers/fetchAPI";
import clientAxios from "@/config/axios";
import { safeParse } from "valibot";
import { ProductsSchema } from "@/schemas/Product";
import { toast } from "react-toastify";
import axios from "axios";
export interface IProductSlice {
  products: Product[];
  fetchProducts: () => Promise<void>;
  isActiveModalAddProduct: boolean;
  setModalAddProduct: (state: boolean) => void;
  createProduct: (product: AddProduct) => Promise<void>;
  setFilterProducts: (term: string, category: string) => void;
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
  isActiveModalAddProduct: false,
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
  setModalAddProduct: (state: boolean) => {
    set(() => ({
      isActiveModalAddProduct: state,
    }));
  },
  createProduct: async (product: AddProduct) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.post(
        "/product/create-product",
        product,
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al crear el producto");
        return;
      }
      const data: string = response.data;
      toast.success(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.msg);
      }
      console.log(error);
    }
  },
  setFilterProducts: (term: string, category: string) => {
    const products = [...get().products];
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) &&
        (category === "todos" || product.category.name === category)
    );
    set(() => ({
      products: filtered,
    }));
  },
});
