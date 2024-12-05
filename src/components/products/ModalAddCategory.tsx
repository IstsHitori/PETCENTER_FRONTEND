import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { FormEvent } from "react";
import { useState } from "react";
import { AddCategory } from "@/types/CategoryTypes";
import { toast } from "react-toastify";

export default function ModalAddCategory() {
  const isActiveModalAddCategory = useVeterinarieStore(
    (state) => state.isActiveModalAddCategory
  );

  const setModalAddCategory = useVeterinarieStore(
    (state) => state.setModalAddCategory
  );

  const fetchCategories = useVeterinarieStore(
    (state) => state.fetchCategories
  );

  const createCategory = useVeterinarieStore((state) => state.createCategory);

  const [category, setCategory] = useState<AddCategory>({
    name: "",
    description: "",
  });

  const handleAddCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(category).includes("")) {
      toast.error("No pueden haber campos vacíos");
      return;
    }
    await createCategory(category);
    await fetchCategories();
    setModalAddCategory(false);
  };
  return (
    <Dialog open={isActiveModalAddCategory} onOpenChange={setModalAddCategory}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Nueva Categoría
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Categoría</DialogTitle>
          <DialogDescription>
            Ingrese el nombre de la nueva categoría.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddCategory}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={category.name}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={category.description}
                onChange={(e) =>
                  setCategory({ ...category, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Crear Categoría</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
