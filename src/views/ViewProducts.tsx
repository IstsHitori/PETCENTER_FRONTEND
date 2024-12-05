import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import HeaderProducts from "@/components/products/HeaderProducts";
import MainProducts from "@/components/products/MainProducts";

export default function ViewProducts() {
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
    <div className="container mx-auto p-3 " >
      <HeaderProducts />
      <div className="flex flex-col md:flex-row gap-5">
        <MainProducts />
      </div>
    </div>
  );
}
