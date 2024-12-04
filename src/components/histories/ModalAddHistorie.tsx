import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { FormEvent } from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import ComboSearchPatient from "./ComboSearchPatient";

export default function ModalAddHistorie() {
  const createHistory = useVeterinarieStore((state) => state.createHistory);
  const [objHistory, setObjHistory] = useState({
    patient: "",
    history: "",
  });
  //--

  const handleHistory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(objHistory).includes("")) {
      toast.error("Error al registrar la historia, hay campos vacíos");
      return;
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center justify-center rounded-lg gap-x-4 p-2 hover:bg-black/80 transition-all bg-black text-white">
            <GoPlus className="text-xl" />
            <span className="text-sm md:text-md">Agregar historia</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Historia Clínica</DialogTitle>
            <DialogDescription>
              Ingrese los detalles de la nueva historia clínica para el paciente
              seleccionado.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleHistory} className="space-y-4">
            <div className="space-y-2">
              <p>Buscar paciente</p>
              <ComboSearchPatient /> 
            </div>
            <div className="space-y-2">
              <label htmlFor="">Historia clínica</label>
            </div>
            <button className="flex items-center justify-center rounded-lg gap-x-4 p-2 px-3 text-sm hover:bg-black/85 transition-all bg-black text-white" type="submit">Agregar Historia</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
