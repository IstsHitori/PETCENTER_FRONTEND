import clientAxios from "@/config/axios";
import { config } from "@/helpers/fetchAPI";
import { Service } from "@/types/ServiceTypes";
import { StateCreator } from "zustand";
import { ServicesSchema } from "@/schemas/Service";
import { safeParse } from "valibot";
import { toast } from "react-toastify";

export interface IServiceSlice {
  services: Service[];
  fetchServices: () => Promise<void>;
}

async function getServices() {
  try {
    const token = localStorage.getItem("pet-veterinaria-token") || "";
    const response = await clientAxios.get("/service", config(token));
    if (response.status !== 200) {
      throw new Error("Error al obtener los productos");
    }
    const { data } = response;
    const serviceResponse = safeParse(ServicesSchema, data);
    if (!serviceResponse.success) {
      throw new Error("Error al parsear los productos");
    }
    return serviceResponse.output.services;
  } catch (error) {
    console.log(error);
  }
}

export const createServiceSlice: StateCreator<IServiceSlice> = (set, get) => ({
  services: [],
  fetchServices: async () => {
    try {
      const services = await getServices();
      set(() => ({
        services,
      }));
    } catch (error) {
      toast.error("Error al obtener los servicios");
      console.log(error);
    }
  },
});
