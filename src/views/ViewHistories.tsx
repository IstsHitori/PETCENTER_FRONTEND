import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
export default function ViewHistories() {
  const patients = useVeterinarieStore((state) => state.patients);
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);

  useEffect(() => {
    fetchPatients();
  } ,[])
  return (
    <>
      <section className="h-full">
        <h1>Historias Clínicas</h1>
        <p>Gestiona los registros médicos de tus pacientes</p>
        <div className="grid py-2 max-h-[530px] 2xl:max-h-[980px] overflow-auto 2xl:grid-cols-3 lg:grid-cols-2 px-2 gap-4 mt-2">
          {}
        </div>
      </section>
    </>
  );
}
