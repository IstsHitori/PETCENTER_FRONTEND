import ModalAddProduct from "./ModalAddProduct";
import ModalAddCategory from "./ModalAddCategory";
export default function HeaderProducts() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold">Inventario de Productos</h1>
      <div className="space-x-2">
        <ModalAddCategory />
        <ModalAddProduct />
      </div>
    </div>
  );
}
