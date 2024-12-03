import { Patient } from "@/types/PatientTypes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useState, useEffect } from "react";
import { getImageByTypePet } from "@/helpers";
import { History } from "@/types/HistoryTypes";
import imgPerson from "/person.svg";
import { toast } from "react-toastify";

export default function ModalShowHistory({ patient }: { patient: Patient }) {
  //---
  const { _id, typePet, name, state, propietor } = patient;
  const getHistorysByPatient = useVeterinarieStore(
    (state) => state.getHistorysByPatient
  );

  const [patientHistories, setPatientHistories] = useState<History[]>([]);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const histories = await getHistorysByPatient(_id);
        setPatientHistories(histories);
      } catch (error) {
        toast.error("Ha ocurrido un error al obtener las historias medicas");
        console.error("Error fetching patient histories:", error);
      }
    };

    fetchHistories();
  }, [getHistorysByPatient, _id]);

  //---

  console.log(patientHistories);
  return (
    <Sheet key={patient._id}>
      {/* Información del pacient */}
      <SheetTrigger asChild>
        <article className="flex sticky gap-5 border-b border-b-zinc-200 py-3 w-full shadow-gray-200 rounded-md mb-4 hover:bg-muted/50 transition-colors cursor-pointer">
          <img
            className="p-3 size-16 border rounded-xl"
            src={`/${getImageByTypePet(typePet)}`}
            width={20}
            alt={`${typePet}-image`}
          />
          <div>
            <p className="text-[14.7px] font-semibold">{name}</p>
            <p className="text-zinc-500 text-[13px] flex gap-1 mb-1">
              <img src={imgPerson} width={18} alt="dueño-mascota" />
              {propietor}
            </p>
            <p
              className={`${
                state
                  ? "bg-green-50 border border-green-400 text-green-500 shadow-md shadow-green-100"
                  : "bg-red-50 border border-red-400 text-red-500 shadow-md shadow-red-100"
              } rounded-md inline-block text-[12.5px] px-5 py-1 text-center`}
            >
              {state ? "Activo" : "Inactivo"}
            </p>
          </div>
        </article>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Historia Clínica de {patient.name}</SheetTitle>
          <SheetDescription>Dueño: {patient.propietor}</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Registros Médicos</h3>
          {patientHistories.length < 1 ? (
            <p className="text-red-600">No hay hisotrias para este paciente</p>
          ) : (
            patientHistories.map((record, index) => (
              <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">{record.date}</p>
                <p className="text-sm text-muted-foreground">
                  {record.history}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
