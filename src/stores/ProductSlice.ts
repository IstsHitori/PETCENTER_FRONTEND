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
  isActiveModalEditProduct: boolean;
  isActiveModalDetailsProduct: boolean;
  editingProduct: Product;
  setModalAddProduct: (state: boolean) => void;
  setModalEditProduct: (state: boolean) => void;
  setModalDetailsProduct: (state: boolean) => void;
  setEditingProduct: (product: Product) => Promise<void>;
  createProduct: (product: AddProduct) => Promise<void>;
  deleteProduct: (idProduct: Product["_id"]) => Promise<void>;
  editProduct: (
    newProduct: AddProduct,
    idProduct: Product["_id"]
  ) => Promise<void>;
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
  isActiveModalEditProduct: false,
  isActiveModalDetailsProduct: false,
  editingProduct: {} as Product,
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
  setModalEditProduct: (state) => {
    set(() => ({ isActiveModalEditProduct: state }));
  },
  setEditingProduct: async (product) => {
    set(() => ({ editingProduct: product }));
  },
  setModalDetailsProduct: (state) => {
    set(() => ({ isActiveModalDetailsProduct: state }));
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
      await get().fetchProducts();
      toast.success(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.msg);
      }
      console.log(error);
    }
  },
  deleteProduct: async (idProduct) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.delete(
        `/product/delete-product/${idProduct}`,
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al crear el producto");
        return;
      }
      const data: string = response.data;
      await get().fetchProducts();
      toast.success(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Ha habido un error al eliminar el producto");
      }
      console.log(error);
    }
  },
  editProduct: async (newProduct, idProduct) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.put(
        `/product/update-product/${idProduct}`,
        newProduct,
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al crear el producto");
        return;
      }
      const data: string = response.data;
      await get().fetchProducts();
      toast.success(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.msg);
      }
      console.log(error);
    }
  },
});
