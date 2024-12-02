import clientAxios from "@/config/axios";
import { Patient } from "@/types/PatientTypes";
import { config } from "@/helpers/fetchAPI";
import { StateCreator } from "zustand";
import { safeParse } from "valibot";
import { PatientSchema } from "@/schemas/Patient";
import { AddHistory, Histories } from "@/types/HistoryTypes";
import { toast } from "react-toastify";
import { HistoriesSchema } from "@/schemas/History";

export interface IHistorySlice {
  idPatient: Patient["_id"];
  patient: Patient;
  isModalAddHistorie: boolean;
  setIdPatient: (id: Patient["_id"]) => void;
  setModalAddHistorie: (state: boolean) => void;
  searchPatientById: () => Promise<void>;
  createHistory: (history: AddHistory) => Promise<void>;
  getHistorysByPatient: (id: Patient["_id"]) => Promise<Histories>;
}

export const createHistorySlice: StateCreator<IHistorySlice> = (set, get) => ({
  idPatient: "",
  isModalAddHistorie: false,
  patient: {} as Patient,
  setIdPatient: (id: Patient["_id"]) => {
    set(() => ({
      idPatient: id,
    }));
  },
  setModalAddHistorie: (state: boolean) => {
    set(() => ({
      isModalAddHistorie: state,
    }));
  },
  searchPatientById: async () => {
    const idPatient = get().idPatient;
    const token = localStorage.getItem("pet-veterinaria-token") as string;
    if (idPatient) {
      const response = await clientAxios(
        `/patients/get-patient/${idPatient}`,
        config(token)
      );
      const responseSchema = safeParse(PatientSchema, response.data);
      if (responseSchema.success) {
        const patient = responseSchema.output;
        set(() => ({
          patient,
        }));
      }
    }
  },
  createHistory: async (history: AddHistory) => {
    const token = localStorage.getItem("pet-veterinaria-token") as string;
    const response = await clientAxios.post(
      "histories/create-history",
      history,
      config(token)
    );
    if (response.status === 200) {
      toast.success(response.data);
      set(() => ({
        isModalAddHistorie: false,
        idPatient: "",
        patient: {} as Patient,
      }));
    }
  },
  getHistorysByPatient: async (id: Patient["_id"]) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") as string;
      const response = await clientAxios(`histories/${id}`, config(token));
      const responseSchema = safeParse(
        HistoriesSchema,
        response.data.patientHistories
      );
      if (!responseSchema.success) {
        const error = new Error("Hubo un error la historia del paciente");
        toast.error(error.message);
        return [] as Histories;
      }
      const historiesPatient = responseSchema.output;
      return historiesPatient;
    } catch (error) {
      console.log(error);
    }

    return [] as Histories;
  },
});
