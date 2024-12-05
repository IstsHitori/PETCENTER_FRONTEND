import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AddProduct } from "@/types/ProductTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ModalAddProduct() {
  const isActviveModalAddProduct = useVeterinarieStore(
    (state) => state.isActiveModalAddProduct
  );
  const setModalAddProduct = useVeterinarieStore(
    (state) => state.setModalAddProduct
  );
  const categories = useVeterinarieStore((state) => state.categories);
  const createProduct = useVeterinarieStore((state) => state.createProduct);
  const fetchProducts = useVeterinarieStore((state) => state.fetchProducts);

  const [product, setProduct] = useState<AddProduct>({
    name: "",
    brand: "",
    price: 0,
    witght: "",
    quantity: 0,
    category: "",
  });

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      Object.values(product).includes("") ||
      Object.values(product).includes(0)
    ) {
      toast.error("Error, hay campos vacíos o valores en 0");
      return;
    }
    await createProduct(product);
    await fetchProducts();
    setModalAddProduct(false);
  };
  return (
    <Dialog open={isActviveModalAddProduct} onOpenChange={setModalAddProduct}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-svh overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>
            Complete los detalles del producto aquí. Haga clic en guardar cuando
            termine.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              onValueChange={(e) => setProduct({ ...product, category: e })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat.name !== "all")
                  .map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              min={0}
              onChange={(e) =>
                setProduct({ ...product, price: +e.target.value })
              }
              step="100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min={1}
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: +e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <Input
              id="brand"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="witght">Peso</Label>
            <Input
              id="witght"
              value={product.witght}
              onChange={(e) =>
                setProduct({ ...product, witght: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Guardar Producto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
