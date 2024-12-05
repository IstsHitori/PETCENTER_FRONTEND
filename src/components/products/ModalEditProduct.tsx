import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { AddProduct, Product } from "@/types/ProductTypes";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ModalEditProduct() {
  const isActiveModalEditProduct = useVeterinarieStore(
    (state) => state.isActiveModalEditProduct
  );
  const setModalEditProduct = useVeterinarieStore(
    (state) => state.setModalEditProduct
  );
  const categories = useVeterinarieStore((state) => state.categories);
  const editingProduct = useVeterinarieStore((state) => state.editingProduct);
  const editProduct = useVeterinarieStore((state) => state.editProduct);
  const setEditingProduct = useVeterinarieStore(
    (state) => state.setEditingProduct
  );

  const [newProduct, setNewProduct] = useState<AddProduct>({
    name: editingProduct.name,
    brand: editingProduct.brand,
    price: editingProduct.price,
    quantity: editingProduct.quantity,
    witght: editingProduct.witght,
    category: editingProduct.category.name,
  });
  const handleEditProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      Object.values(newProduct).includes("") ||
      Object.values(newProduct).includes(0)
    ) {
      toast.error("Error, hay campos vacíos o valores en 0");
      return;
    }
    const idCategory = categories.find(
      (cat) => cat.name === newProduct.category
    )?._id;
    newProduct.category = idCategory as string;
    await editProduct(newProduct, editingProduct._id);
    setModalEditProduct(false);
  };
  return (
    <Dialog
      open={isActiveModalEditProduct}
      onOpenChange={(e) => {
        setModalEditProduct(e);
        setEditingProduct({} as Product);
      }}
    >
      <DialogContent className="sm:max-w-[425px] max-h-svh overflow-y-auto">
        
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Modifique los detalles del producto aquí. Haga clic en guardar
            cuando termine.
          </DialogDescription>
        </DialogHeader>
        {editingProduct && (
          <form onSubmit={handleEditProduct} className="xl:space-y-4 space-y-2">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoría</Label>
              <Select
                name="category"
                defaultValue={editingProduct.category.name}
                onValueChange={(e) =>
                  setNewProduct({ ...newProduct, category: e })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => cat.name !== "todos")
                    .map((cat) => (
                      <SelectItem key={cat._id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre del Producto</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={editingProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Precio</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                min={0}
                step="100"
                defaultValue={editingProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: +e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock</Label>
              <Input
                id="edit-stock"
                name="stock"
                type="number"
                min={0}
                defaultValue={editingProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: +e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-brand">Marca</Label>
              <Input
                id="edit-brand"
                name="brand"
                defaultValue={editingProduct.brand}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-witght">Peso</Label>
              <Input
                id="edit-witght"
                name="witght"
                defaultValue={editingProduct.witght}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, witght: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Guardar Cambios
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
