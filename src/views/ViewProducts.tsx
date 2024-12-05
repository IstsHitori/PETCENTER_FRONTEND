import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";

import { Search, Package, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/alert-dialog";
import HeaderProducts from "@/components/products/HeaderProducts";


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

  return (
    <div className="container mx-auto p-6">
      <HeaderProducts />
      {/* <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between">
                    <Button
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Button>
                    {cat !== "all" && (
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
                              permanentemente la categoría y reasignará todos
                              los productos asociados a "Sin categoría".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCategory(cat)}
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
                        (sum, product) => sum + product.price * product.stock,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2">
                      {product.category}
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
                      Stock: {product.stock}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Package className="mr-2 h-4 w-4" /> Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div> */}
    </div>
  );
}
