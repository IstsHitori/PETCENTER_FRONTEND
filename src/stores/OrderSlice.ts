import clientAxios from "@/config/axios";
import { AddItem, AddOrder, Order } from "@/types/OrderTypes";
import { config } from "@/helpers/fetchAPI";
import { safeParse } from "valibot";
import { StateCreator } from "zustand";
import { OrdersSchema } from "@/schemas/Order";
import { toast } from "react-toastify";
import { Product } from "@/types/ProductTypes";

export interface IOrderSlice {
  orders: Order[];
  carItems: AddOrder["items"];
  fetchOrders: () => Promise<void>;
  addItemToCar: (item: AddItem, stockProduct: number) => void;
  handleChangeQuan: (
    value: number,
    idProduct: Product["_id"],
    stockProduct: number
  ) => void;
  handleDeleteItemToCar: (idProduct: Product["_id"]) => void;
  createOrder: (newOrder: AddOrder) => Promise<void>;
}

async function getOrdersFetch() {
  const token = localStorage.getItem("pet-veterinaria-token") || "";
  const response = await clientAxios.get("/order/", config(token));
  if (response.status !== 200) {
    throw new Error("Error al obtener las ordenes");
  }
  const { data } = response;
  const ordersResponse = safeParse(OrdersSchema, data);

  if (!ordersResponse.success) {
    throw new Error("Error al parsear las ordenes");
  }
  return ordersResponse.output.orders;
}

export const createOrderSlice: StateCreator<IOrderSlice> = (set, get) => ({
  orders: [],
  carItems: [],
  fetchOrders: async () => {
    try {
      const orders = await getOrdersFetch();
      set(() => ({ orders }));
    } catch (error) {
      console.error(error);
    }
  },
  addItemToCar: (item, stockProduct) => {
    const copyItems = [...get().carItems];
    const index = copyItems.findIndex((it) => it.product === item.product);
    if (index !== -1) {
      const numberOfDiference = stockProduct - copyItems[index].quantity;
      if (numberOfDiference === 0) {
        toast.error("No hay más stock de este producto.");
        return;
      }
      copyItems[index].quantity++;
      set(() => ({
        carItems: [...copyItems],
      }));
      return;
    }
    set(() => ({
      carItems: [...copyItems, item],
    }));
  },
  handleChangeQuan: (value, idProduct, stockProduct) => {
    const copyItems = [...get().carItems];
    const index = copyItems.findIndex((it) => it.product === idProduct);
    if (index === -1) return;
    const numberOfDiference = stockProduct - copyItems[index].quantity;

    switch (value) {
      case 1:
        if (numberOfDiference === 0) {
          toast.error("No hay más stock de este producto.");
          return;
        }
        copyItems[index].quantity++;
        break;
      case 0:
        copyItems[index].quantity -= copyItems[index].quantity > 1 ? 1 : 0;
        break;
    }
    set(() => ({ carItems: copyItems }));
  },
  handleDeleteItemToCar: (idProduct) => {
    const newItems = [...get().carItems].filter(
      (item) => item.product !== idProduct
    );
    set(() => ({
      carItems: [...newItems],
    }));
  },
  createOrder: async (newOrder) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.post(
        "/order/create-order",
        newOrder,
        config(token)
      );

      if (response.status !== 200) {
        throw new Error("Error crear la orden");
      }
      set(() => ({ carItems: [] }));
      toast.success("Orden creada");
    } catch (error) {
      console.log(error);
    }
  },
});
