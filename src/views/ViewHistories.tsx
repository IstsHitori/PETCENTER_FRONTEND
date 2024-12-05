import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import ModalShowHistory from "@/components/histories/ModalShowHistory";
import ModalAddHistorie from "@/components/histories/ModalAddHistorie";
export default function ViewHistories() {
  const patients = useVeterinarieStore((state) => state.patients);
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);
  const searchPatientByPropietor = useVeterinarieStore((state) => state.searchPatientByPropietor);

  useEffect(() => {
    fetchPatients();
  }, []);
  return (
    <>
      <section className="h-full">
        <div className="flex items-center flex-col md:flex-row md:space-y-0 space-y-3 justify-between md:px-10 border-b py-4">
          <div className="flex justify-center flex-col">
            <h1 className="text-2xl font-semibold">Historias Clínicas</h1>
            <p className="text-gray-600 font-light">
              Gestiona los registros médicos de tus pacientes
            </p>
          </div>

          <ModalAddHistorie />
        </div>
        <div className="flex gap-2 flex-col text-sm items-center md:flex-row  mt-2">
          <label htmlFor="propietor">Busca el paciente por su propietario </label>
          <input type="text" onChange={(e) => {
            searchPatientByPropietor(e.target.value);
          }} id="propietor" placeholder="nombre del propietario" className="border rounded-lg ml-1 p-1 outline-none focus:border-zinc-400" />
        </div>
        <div className="grid py-2 max-h-[530px] 2xl:max-h-[980px] overflow-auto 2xl:grid-cols-4 lg:grid-cols-2 px-2 gap-4">
          {patients.map((patient) => (
            <ModalShowHistory key={patient._id} patient={patient} />
          ))}
        </div>
      </section>
    </>
  );
}
