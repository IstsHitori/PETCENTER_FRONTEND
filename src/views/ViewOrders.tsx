import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import MainOrders from "@/components/orders/MainOrders";

export default function ViewOrders() {
  const fetchOrders = useVeterinarieStore((state) => state.fetchOrders);

  useEffect(() => {
    const fetch = async () => {
      await fetchOrders();
    };
    fetch();
  }, []);

  return (
    <div className="px-8 py-3">
      <h1 className="text-2xl font-bold mb-4">Ordenes de clientes</h1>
      <MainOrders />
    </div>
  );
}
