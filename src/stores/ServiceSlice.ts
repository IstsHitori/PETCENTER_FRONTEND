import clientAxios from "@/config/axios";
import { config } from "@/helpers/fetchAPI";
import { AddService, Service } from "@/types/ServiceTypes";
import { StateCreator } from "zustand";
import { ServicesSchema } from "@/schemas/Service";
import { safeParse } from "valibot";
import { toast } from "react-toastify";
import { Patient } from "@/types/PatientTypes";
import axios from "axios";

export interface IServiceSlice {
  services: Service[];
  fetchServices: () => Promise<void>;
  isActiveModalAddService: boolean;
  setModalAddService: (state: boolean) => void;
  patchStateService: (
    idService: Service["_id"],
    newState: Service["state"]
  ) => Promise<void>;
  createService: (
    idPatient: Patient["_id"],
    service: AddService
  ) => Promise<void>;
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
  isActiveModalAddService: false,
  setModalAddService: (state) => {
    set(() => ({
      isActiveModalAddService: state,
    }));
  },
  patchStateService: async (idService, newState) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.patch(
        `/service/change-state/${idService}`,
        { state: newState },
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al cambiar el estado del servicio");
        return;
      }
      toast.success("Se ha cambiado el estado");
      await get().fetchServices();
    } catch (error) {
      console.log(error);
    }
  },
  createService: async (idPatient, service) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.post(
        `/service/create-service/${idPatient}`,
        service,
        config(token)
      );
      if (response.status !== 200) {
        toast.error("Ha habido un error al cambiar el estado del servicio");
        return;
      }
      toast.success("Se ha registrado el servicio");
      set(() => ({
        isActiveModalAddService: false,
      }));
      await get().fetchServices();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.msg);
      }
      set(() => ({
        isActiveModalAddService: false,
      }));
      console.log(error);
    }
  },
});
