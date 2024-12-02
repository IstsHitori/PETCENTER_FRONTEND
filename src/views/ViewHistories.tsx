import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import AccordionHistories from "@/components/histories/AccordionHistories";
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
        <div className="grid py-2 max-h-[530px] 2xl:max-h-[980px] overflow-auto 2xl:grid-cols-3 lg:grid-cols-2 px-2 gap-4 mt-2">
          {patients.map((patient) => (
            <AccordionHistories key={patient._id} patient={patient} />
          ))}
        </div>
      </section>
    </>
  );
}
