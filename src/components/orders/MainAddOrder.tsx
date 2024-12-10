import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import ProductToAdd from "./ProductToAdd";
import ModalDetailsProducts from "../products/ModalDetailsProducts";
import { Category } from "@/types/CategoryTypes";
import CarProducts from "./CarProducts";
export default function MainAddOrder() {
  const products = useVeterinarieStore((state) => state.products);
  const categories = useVeterinarieStore((state) => state.categories);
  const isActiveModalDetailsProduct = useVeterinarieStore(
    (state) => state.isActiveModalDetailsProduct
  );

  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    filterProducts(searchTerm, selectedCategory);
  }, [products, searchTerm, selectedCategory]);

  function handleCategoryChange(name: string): void {
    setSelectedCategory(name);
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  const filterProducts = (term: string, category: Category["name"]) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) &&
        (category === "todos" || product.category.name === category)
    );
    setFilteredProducts(filtered);
  };

  return (
    <section className="grid grid-cols-2">
      {/* Para las categorias y los productos */}
      <div className=" max-w-2xl 2xl:max-w-5xl ">
        {/* Las categorias */}
        <aside className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="font-medium">Categorías</p>
            <div className=" space-x-1 max-w-md p-3 max-h-[11rem] xl:max-h-[400px] overflow-auto flex items-center">
              {categories.map((cat, index) => {
                if (index < 2) {
                  return (
                    <div
                      key={cat._id}
                      className="flex items-center justify-between"
                    >
                      <Button
                        variant={
                          selectedCategory === cat.name ? "default" : "outline"
                        }
                        className="w-full justify-start "
                        onClick={() => handleCategoryChange(cat.name)}
                      >
                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                      </Button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoSearchOutline />
            <Input
              className=""
              placeholder="Busca el producto por su nombre"
              onChange={handleSearch}
            />
          </div>
        </aside>
        {/* Los productos */}
        <div className="grid grid-cols-2 max-h-[475px] 2xl:grid-cols-3 gap-2 2xl:max-h-[910px] overflow-auto">
          {filteredProducts.map((product) => (
            <ProductToAdd key={product._id} product={product} />
          ))}
        </div>
      </div>
      {/* Para la factura */}
      <CarProducts />
      {isActiveModalDetailsProduct && <ModalDetailsProducts />}
    </section>
  );
}
