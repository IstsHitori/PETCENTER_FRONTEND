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
  const isModalAddHistorie = useVeterinarieStore((state) => state.isModalAddHistorie);
  const setModalAddHistorie = useVeterinarieStore((state) => state.setModalAddHistorie);
  const idPatient = useVeterinarieStore((state) => state.idPatient);
  const [history, setHistory] = useState("");
  //--

  const handleHistory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (history === "" || idPatient === "") {
      toast.error("Error al registrar la historia, hay campos vacíos");
      return;
    }
    await createHistory({
      history,
      patient: idPatient,
    });
  };
  return (
    <>
      <Dialog open={isModalAddHistorie} onOpenChange={setModalAddHistorie}>
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
              <p>Historia clínica</p>
              <textarea
                onChange={(e) => setHistory(e.target.value)}
                className="outline-none border shadow-sm rounded-md p-1 w-[300px] h-[120px]"
                placeholder="Escriba la historia"
              ></textarea>
            </div>
            <button
              className="flex items-center justify-center rounded-lg gap-x-4 p-2 px-3 text-sm hover:bg-black/85 transition-all bg-black text-white"
              type="submit"
            >
              Agregar Historia
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
