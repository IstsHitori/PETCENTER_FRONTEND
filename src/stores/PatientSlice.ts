import { AddPatient, Patient, UpdatePatient } from "@/types/PatientTypes";
import { StateCreator } from "zustand";
import clientAxios from "@/config/axios";
import { config } from "@/helpers/fetchAPI";
import { toast } from "react-toastify";
import { safeParse } from "valibot";
import { PatientsSchema } from "@/schemas/Patient";

export interface IPatientSlice {
  patients: Patient[];
  patientSelected: Patient;
  isActivateModalAddPatient: boolean;
  isUpdatePatient: boolean;
  patientFilter: string;
  addNewPatient: (patient: AddPatient) => Promise<void>;
  updatePatient: (patient: UpdatePatient, _id: Patient["_id"]) => Promise<void>;
  selectPatient: (patient: Patient) => void;
  setUpdatePatient: (state: boolean) => void;
  fetchPatients: () => Promise<void>;
  searchPatientByPropietor: (name: Patient["propietor"]) => Promise<void>;
  deletePatient: (_id: Patient["_id"]) => Promise<void>;
  activateModalAddPatient: (state: boolean) => void;
  setPatientFilter: (filter: string) => void;
  filterPatients: () => Promise<void>;
}

//---
function filterByName(a: Patient, b: Patient) {
  const commonA = a["name"];
  const commonB = b["name"];
  return commonA.localeCompare(commonB);
}
async function getPatientsFetch() {
  const token = localStorage.getItem("pet-veterinaria-token") || "";
  const response = await clientAxios.get("/patients", config(token));
  if (response.status !== 200) {
    throw new Error("Error al obtener los pacientes");
  }
  const { data } = response;
  const patientsResponse = safeParse(PatientsSchema, data);
  if (!patientsResponse.success) {
    throw new Error("Error al parsear los pacientes");
  }
  return patientsResponse.output.patients;
}

export const createPatientSlice: StateCreator<IPatientSlice> = (set, get) => ({
  patients: [],
  patientSelected: {} as Patient,
  isActivateModalAddPatient: false,
  isUpdatePatient: false,
  patientFilter: "",
  fetchPatients: async () => {
    try {
      const patients = await getPatientsFetch();
      set(() => ({
        patients,
      }));
    } catch (error) {
      toast.error("Ha ocurrido un error al botener los pacientes");
    }
  },
  searchPatientByPropietor: async (propietor: Patient["propietor"]) => {
    const patients = [...get().patients];

    const filteredPatiens = patients.filter(
      (patient) => patient.propietor.toLowerCase() === propietor.toLowerCase()
    );

    if (filteredPatiens.length > 0) {
      set(() => ({
        patients: [...filteredPatiens],
      }));
      return;
    }
    if (!propietor) {
      const patientsFetch = await getPatientsFetch();
      set(() => ({
        patients: patientsFetch,
      }));
    }
  },
  selectPatient: (patient: Patient) => {
    set(() => ({
      patientSelected: patient,
    }));
  },
  activateModalAddPatient: (state: boolean) => {
    set(() => ({
      isActivateModalAddPatient: state,
    }));
  },
  addNewPatient: async (patient: AddPatient) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";

      const response = await clientAxios.post(
        "/patients/create-patient",
        patient,
        config(token)
      );
      toast.success(response.data);
      set(() => ({
        isActivateModalAddPatient: false,
      }));
      await get().fetchPatients();
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al agregar el paciante, pueden haber datos vacíos o la imagen del paciente pesa mucho"
      );
      console.log(error);
    }
  },
  updatePatient: async (patient: AddPatient, _id: Patient["_id"]) => {
    const token = localStorage.getItem("pet-veterinaria-token") || "";
    const response = await clientAxios.put(
      `/patients/update-patient/${_id}`,
      patient,
      config(token)
    );
    if (response.status === 200) {
      toast.success("Paciente actualizado !!");
      await get().fetchPatients();
    }
  },
  setUpdatePatient: (state: boolean) => {
    set(() => ({
      isUpdatePatient: state,
    }));
  },
  deletePatient: async (_id: Patient["_id"]) => {
    try {
      const token = localStorage.getItem("pet-veterinaria-token") || "";
      const response = await clientAxios.delete(
        `/patients/delete-patient/${_id}`,
        config(token)
      );
      toast.success(response.data);
      await get().fetchPatients();
      set(() => ({
        patientSelected: {} as Patient,
      }));
    } catch (error) {
      toast.error("Ha ocurrido un error al eliminar el paciente");
    }
  },
  setPatientFilter: (filter: string) => {
    set(() => ({
      patientFilter: filter,
    }));
  },
  filterPatients: async () => {
    const filterPets = ["gato", "perro", "hamster"];
    const patientsDefault = await getPatientsFetch();
    set(() => ({
      patients: [...patientsDefault],
    }));
    const filter = get().patientFilter;
    if (filter === "") {
      const patientsFetch = await getPatientsFetch();

      set(() => ({
        patients: [...patientsFetch],
      }));
      return;
    }
    if (filter === "name") {
      const patients = [...get().patients];
      patients.sort((a, b) => filterByName(a, b));
      set(() => ({
        patients,
      }));
      return;
    }
    if (filterPets.includes(filter)) {
      let patients = [...get().patients];
      const filteredPatiens = patients.filter(
        (patient) => patient.typePet.toLowerCase() === filter.toLowerCase()
      );
      patients = [...filteredPatiens];
      set(() => ({ patients }));
    }
  },
});
