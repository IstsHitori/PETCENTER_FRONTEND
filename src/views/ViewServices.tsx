import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import HeaderServices from "@/components/services/HeaderServices";
import MainServices from "@/components/services/MainServices";
import { useEffect } from "react";
export default function ViewServices() {
  const fetchServices = useVeterinarieStore((state) => state.fetchServices);
  useEffect(() => {
    const fetch = async () => {
      await fetchServices();
    };
    fetch();
  }, []);

  return (
    <div className="py-4 px-12">
      <HeaderServices />
      <MainServices />
    </div>
  );
}
