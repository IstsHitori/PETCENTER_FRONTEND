import { Edit, Package, Search, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { useEffect } from "react";
import img_product from "/bg_product.png";
import { Category } from "@/types/CategoryTypes";
import { Product } from "@/types/ProductTypes";
import ModalDetailsProducts from "./ModalDetailsProducts";
import ModalEditProduct from "./ModalEditProduct";
import { formatMoney } from "@/helpers";

export default function MainProducts() {
  const categories = useVeterinarieStore((state) => state.categories);
  const products = useVeterinarieStore((state) => state.products);
  const deleteCategory = useVeterinarieStore((state) => state.deleteCategory);
  const deleteProduct = useVeterinarieStore((state) => state.deleteProduct);
  const isActiveModalDetailsProduct = useVeterinarieStore(
    (state) => state.isActiveModalDetailsProduct
  );
  const isActiveModalEditProduct = useVeterinarieStore(
    (state) => state.isActiveModalEditProduct
  );
  const setEditingProduct = useVeterinarieStore(
    (state) => state.setEditingProduct
  );
  const setModalEditProduct = useVeterinarieStore(
    (state) => state.setModalEditProduct
  );
  const setModalDetailsProduct = useVeterinarieStore(
    (state) => state.setModalDetailsProduct
  );

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortCriteria, sortOrder]);

  //Products
  const handleDeleteProduct = async (productId: Product["_id"]) => {
    await deleteProduct(productId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };
  const filterProducts = (term: string, category: Category["name"]) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) &&
        (category === "todos" || product.category.name === category)
    );
    setFilteredProducts(filtered);
  };

  const handleSortChange = (value: string) => {
    if (value === sortCriteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(value);
      setSortOrder("asc");
    }
  };

  const filterAndSortProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) &&
        (selectedCategory === "todos" ||
          product.category.name === selectedCategory)
    );

    filtered.sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria])
        return sortOrder === "asc" ? -1 : 1;
      if (a[sortCriteria] > b[sortCriteria])
        return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredProducts(filtered);
  };
  //---

  const handleCategoryChange = (value: Category["name"]) => {
    setSelectedCategory(value);
    filterProducts(searchTerm, value);
  };
  const handleDeleteCategory = async (IdcategoryToDelete: Category["_id"]) => {
    await deleteCategory(IdcategoryToDelete);
  };

  return (
    <>
      <aside className="w-full md:w-64 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[11rem] xl:max-h-[300px] overflow-auto">
              {categories.map((cat) => (
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
                  {cat.name !== "todos" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará
                            permanentemente la categoría y reasignará todos los
                            productos asociados a "Sin categoría".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCategory(cat._id)}
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm xl:text-[1rem]">
              <div className="flex justify-between">
                <dt>Total de Productos:</dt>
                <dd className="font-semibold">{products.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Categorías:</dt>
                <dd className="font-semibold">{categories.length - 1}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Valor del Inventario:</dt>
                <dd className="font-semibold text-green-500">
                  {formatMoney(
                    products.reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    )
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </aside>
      <main className="flex-1">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-8"
              type="search"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Select defaultValue={sortCriteria} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">
                Nombre{" "}
                {sortCriteria === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </SelectItem>
              <SelectItem value="price">
                Precio{" "}
                {sortCriteria === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </SelectItem>
              <SelectItem value="quantity">
                Stock{" "}
                {sortCriteria === "quantity" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:grid-cols-3 max-h-[370px] xl:max-h-[750px] overflow-y-auto">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden max-h-[360px] max-w-[270px]"
            >
              <CardHeader className="p-1">
                <div className="aspect-video h-[150px] relative">
                  <img
                    src={img_product}
                    className="bg-cover mt-4 w-[66%] mx-auto"
                    alt={product.name}
                  />
                  <Badge className="absolute top-2 right-2">
                    {product.category.name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-md font-bold">
                    {formatMoney(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.quantity}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex space-y-2 flex-wrap">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setModalDetailsProduct(true);
                    setEditingProduct(product);
                  }}
                >
                  <Package className="mr-2 h-4 w-4" /> Detalles
                </Button>
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={() => {
                    setModalEditProduct(true);
                    setEditingProduct(product);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-1/2 bg-red-500 text-white"
                      onClick={() => {
                        setEditingProduct(product);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará
                        permanentemente el producto del inventario.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await handleDeleteProduct(product._id);
                          setEditingProduct(product);
                        }}
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
        {isActiveModalDetailsProduct && <ModalDetailsProducts />}
        {isActiveModalEditProduct && <ModalEditProduct />}
      </main>
    </>
  );
}
