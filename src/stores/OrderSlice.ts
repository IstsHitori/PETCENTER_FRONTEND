import clientAxios from "@/config/axios";
import { Order } from "@/types/OrderTypes";
import { config } from "@/helpers/fetchAPI";
import { safeParse } from "valibot";
import { StateCreator } from "zustand";
import { OrdersSchema } from "@/schemas/Order";

export interface IOrderSlice {
  orders: Order[];
  fetchOrders: () => Promise<void>;
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
  fetchOrders: async () => {
    try {
      const orders = await getOrdersFetch();
      set(() => ({ orders }));
    } catch (error) {
      console.error(error);
    }
  },
});
