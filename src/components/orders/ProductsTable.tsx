import { formatMoney } from "@/helpers";
import { Item } from "@/types/OrderTypes";

export const ProductsTable = ({ items }: { items: Item[] }) => {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="py-2 px-3 text-left rounded-l-lg">Producto</th>
            <th className="py-2 px-3 text-center">Cant.</th>
            <th className="py-2 px-3 text-right rounded-r-lg">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item._id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-3 text-gray-700">{item.product.name}</td>
              <td className="py-2 px-3 text-center text-gray-600">
                {item.quantity}
              </td>
              <td className="py-2 px-3 text-right text-gray-800">
                {formatMoney(item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
