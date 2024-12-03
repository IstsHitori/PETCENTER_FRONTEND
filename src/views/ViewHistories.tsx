import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import ModalShowHistory from "@/components/histories/ModalShowHistory";
export default function ViewHistories() {
  const patients = useVeterinarieStore((state) => state.patients);
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);

  useEffect(() => {
    fetchPatients();
  }, []);
  return (
    <>
      <section className="h-full">
        <div className="flex items-center  justify-between px-10 border-b py-4">
          <div className="flex justify-center flex-col">
            <h1 className="text-2xl font-semibold">Historias Clínicas</h1>
            <p className="text-gray-600 font-light">Gestiona los registros médicos de tus pacientes</p>
          </div>

          <button className="flex items-center justify-center rounded-lg gap-x-4 p-2 hover:bg-black/80 transition-all bg-black text-white">
            <GoPlus className="text-xl" />
            <span>Agregar historia</span>
          </button>
        </div>
        <div className="grid py-2 max-h-[530px] 2xl:max-h-[980px] overflow-auto 2xl:grid-cols-4 lg:grid-cols-2 px-2 gap-4">
          {
            patients.map(patient => <ModalShowHistory key={patient._id} patient={patient} />)
          }
        </div>
      </section>
    </>
  );
}
