import { formatMoney } from "@/helpers";
import { Item } from "@/types/OrderTypes";
import { ProductsTable } from "./ProductsTable";

export const ReceiptItems = ({
  items,
  total,
}: {
  items: Item[];
  total: number;
}) => {
  return (
    <div>
      <h2 className="font-semibold text-gray-700 mb-3">Detalle de venta</h2>
      <div className="space-y-2 mb-4">
        <ProductsTable items={items} />
      </div>
      <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
        <span className="font-bold text-blue-700">Total</span>
        <span className="font-bold text-blue-700 text-lg">
          {formatMoney(total)}
        </span>
      </div>
    </div>
  );
};
