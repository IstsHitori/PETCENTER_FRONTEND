import ModalAddHistorie from "@/components/histories/ModalAddHistorie";
import ShowPatientHistory from "@/components/histories/ShowPatientHistory";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
export default function AddMedicalHisotory() {
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);
  const patients = useVeterinarieStore((state) => state.patients);

  useEffect(() => {
    fetchPatients();
  }, []);
  
  return (
    <section>
      <ModalAddHistorie />

      <h1 className="bg-blue-50 border border-blue-500 rounded-md mb-2 text-md 2xl:text-lg p-4 text-center">
        Elije un paciente de la lista y agregale una historia clínica !!
      </h1>
      <h2 className="inline-block mr-10">
        Se encontraron <strong>{patients.length}</strong> pacientes
      </h2>
      <label htmlFor="propietor">Buscar paciente por su propietario:</label>
      <input
        className="ml-2 outline-none border text-sm p-1 rounded-md px-2 focus:border-zinc-500"
        type="text"
        id="propietor"
      />
      <div className="grid  grid-cols-1 lg:grid-cols-3 gap-5">
        {patients.map((patient) => (
          <ShowPatientHistory key={patient._id} patient={patient} />
        ))}
      </div>
    </section>
  );
}
