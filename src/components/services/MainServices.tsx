import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import ServiceDetails from "./ServiceDetails";

export default function MainServices() {
  const servicesFetched = useVeterinarieStore((state) => state.services);
  const fetchServices = useVeterinarieStore((state) => state.fetchServices);
  const [filter, setFilter] = useState("todos");
  const [services, setServices] = useState([...servicesFetched]);

  useEffect(() => {
    const fetch = async () => {
      await fetchServices();
    };
    fetch();
  }, []);
  console.log(services);
  return (
    <div className="mt-4">
      <aside className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant={filter === "todos" ? "default" : "outline"}
            className="h-8"
            onClick={() => setFilter("todos")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "pagados" ? "default" : "outline"}
            className="h-8"
            onClick={() => setFilter("pagados")}
          >
            Pagados
          </Button>

          <Button
            variant={filter === "cancelados" ? "default" : "outline"}
            className="h-8"
            onClick={() => setFilter("cancelados")}
          >
            Cancelados
          </Button>
        </div>
        <Input
          className="max-w-[400px]"
          placeholder="Buscar por nombre de paciente o propietario"
        />
      </aside>
      <section className="mt-2 grid grid-cols-3 gap-5 max-h-[800px] overflow-y-auto">
        {servicesFetched.map((service) => (
          <ServiceDetails key={service._id} service={service} />
        ))} 
      </section>
    </div>
  );
}
