import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";

export default function ViewProducts() {
  const products = useVeterinarieStore((state) => state.products);
  const categories = useVeterinarieStore((state) => state.categories);
  const fetchProducts = useVeterinarieStore((state) => state.fetchProducts);
  const fetchCategories = useVeterinarieStore((state) => state.fetchCategories);

  useEffect(() => {
    const fetch = async () => {
      await fetchProducts();
      await fetchCategories();
    };
    fetch();
  }, []);
  
  return <div>ViewProducts klk</div>;
}
