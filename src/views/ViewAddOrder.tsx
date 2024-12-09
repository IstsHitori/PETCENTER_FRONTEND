import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import MainAddOrder from "@/components/orders/MainAddOrder";
export default function ViewAddOrder() {
  const fetchProducts = useVeterinarieStore((state) => state.fetchProducts);
  const fetchCategories = useVeterinarieStore((state) => state.fetchCategories);
  useEffect(() => {
    const fetch = async () => {
      await fetchProducts();
      await fetchCategories();
    };
    fetch();
  }, []);
  return (
    <div className="p-2">
      <h1 className="text-2xl font-medium">Crear orden</h1>
      <MainAddOrder />
    </div>
  );
}
