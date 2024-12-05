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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types/CategoryTypes";
import { Product } from "@/types/ProductTypes";

export default function MainProducts() {
  const categories = useVeterinarieStore((state) => state.categories);
  const products = useVeterinarieStore((state) => state.products);
  const deleteCategory = useVeterinarieStore((state) => state.deleteCategory);
  const fetchCategories = useVeterinarieStore((state) => state.fetchCategories);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const handleDeleteCategory = async (IdcategoryToDelete: Category["_id"]) => {
    await deleteCategory(IdcategoryToDelete);
    await fetchCategories();
  };

  const handleDeleteProduct = (productId: Product["_id"]) => {};

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (value: Category["name"]) => {
    setSelectedCategory(value);
    filterProducts(searchTerm, value);
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
    <>
      <aside className="w-full md:w-64 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex items-center justify-between"
                >
                  <Button
                    variant={
                      selectedCategory === cat.name ? "default" : "outline"
                    }
                    className="w-full justify-start"
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
            <dl className="space-y-2">
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
                <dd className="font-semibold">
                  $
                  {products
                    .reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
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
          <Select defaultValue="name">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="price">Precio</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden max-w-[300px]">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      fill="#0099ff"
                      d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354zm0 640l177-89l-463-265l-211 106zm315-157l182-91l-497-249l-149 75zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288zm-640 710v-455l-384-192v454zm64-566l369-184l-369-185l-369 185zm576-1l448-224l448 224v527l-448 224l-448-224zm384 576v-305l-256-128v305zm384-128v-305l-256 128v305zm-320-288l241-121l-241-120l-241 120z"
                    />
                  </svg>
                  <Badge className="absolute top-2 right-2">
                    {product.category.name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.quantity}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex space-y-2 flex-wrap">
                <Button variant="outline" className="w-full">
                  <Package className="mr-2 h-4 w-4" /> Detalles
                </Button>
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={() => {
                    //setEditingProduct(product);
                    //setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-1/2 bg-red-400">
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
                        onClick={() => {
                          //ass
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
      </main>
    </>
  );
}
