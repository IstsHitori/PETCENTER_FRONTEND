import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import ServiceDetails from "./ServiceDetails";
import { Service } from "@/types/ServiceTypes";
import ModalAddService from "./ModalAddService";

export default function MainServices() {
  const services = useVeterinarieStore((state) => state.services);

  const [filter, setFilter] = useState<Service["state"] | "todos">("todos");
  const [servicesFilter, setServicesFilter] = useState([...services]);
  const [searchPatient, setSearchPatient] = useState("");

  const filterServices = (
    term: string,
    category: Service["state"] | "todos"
  ) => {
    const filtered = services.filter(
      (serv) =>
        (serv.patient.name.toLowerCase().includes(term) ||
          serv.patient.propietor.toLowerCase().includes(term)) &&
        (category === "todos" || serv.state === category)
    );
    setServicesFilter(filtered);
  };

  const handleCategoryChange = (category: Service["state"] | "todos") => {
    setFilter(category);
  };

  const handleSearchChange = (term: string) => {
    setSearchPatient(term.toLowerCase());
  };

  useEffect(() => {
    filterServices(searchPatient, filter);
  }, [filter, searchPatient, services]);

  return (
    <div className="mt-4">
      <aside className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant={filter === "todos" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleCategoryChange("todos")}
          >
            Todos
          </Button>

          <Button
            variant={filter === "pagado" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleCategoryChange("pagado")}
          >
            Pagados
          </Button>

          <Button
            variant={filter === "no pagado" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleCategoryChange("no pagado")}
          >
            No pagados
          </Button>
        </div>
        <ModalAddService />
        <Input
          className="max-w-[400px]"
          placeholder="Buscar por nombre de paciente o propietario"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </aside>

      <section className="mt-4 grid grid-cols-2 2xl:grid-cols-4 gap-4 max-h-[450px] 2xl:max-h-[880px] overflow-y-auto">
        {servicesFilter.map((service) => (
          <ServiceDetails key={service._id} service={service} />
        ))}
      </section>
    </div>
  );
}
