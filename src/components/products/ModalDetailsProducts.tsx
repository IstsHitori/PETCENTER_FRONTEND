import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import img_product from "/bg_product.png";
import { Product } from "@/types/ProductTypes";
import { formatMoney } from "@/helpers";
export default function ModalDetailsProducts() {
  const isActiveModalDetailsProduct = useVeterinarieStore(
    (state) => state.isActiveModalDetailsProduct
  );
  const setModalDetailsProduct = useVeterinarieStore(
    (state) => state.setModalDetailsProduct
  );
  const editingProduct = useVeterinarieStore((state) => state.editingProduct);
  const setEditingProduct = useVeterinarieStore((state) => state.setEditingProduct);
  return (
    <Dialog
      open={isActiveModalDetailsProduct}
      onOpenChange={(e) => {
        setModalDetailsProduct(e);
        setEditingProduct({} as Product);
      }}
      
    >
      <DialogContent className="sm:max-w-[425px] max-h-svh overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Producto</DialogTitle>
        </DialogHeader>
        {editingProduct && (
          <div className="space-y-4">
            <div className="aspect-video relative">
              <img
                src={img_product}
                alt={editingProduct.name}
                className="object-cover w-1/2 mx-auto h-full rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold">{editingProduct.name}</h3>
            <p>
              <strong>Categoría:</strong> {editingProduct.category.name}
            </p>
            <p>
              <strong>Precio:</strong> {formatMoney(editingProduct.price)}
            </p>
            <p>
              <strong>Stock:</strong> {editingProduct.quantity}
            </p>
            <p>
              <strong>Peso:</strong> {editingProduct.witght}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
