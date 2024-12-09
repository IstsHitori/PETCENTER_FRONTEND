import { Order } from "@/types/OrderTypes";

export const ReceiptDetails = ({ order }: { order: Order }) => {
  const { date, customer, _id, payment_method } = order;

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">Fecha:</span>
        <span className="text-gray-800">{new Date(date).toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">No. Ticket:</span>
        <span className="text-gray-800 font-mono">{_id}</span>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">Nit del cliente:</span>
        <span className="text-gray-800">{customer.nit}</span>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">Cliente:</span>
        <span className="text-gray-800">{customer.name}</span>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">Teléfono del cliente:</span>
        <span className="text-gray-800">{customer.telephone === "" ? "No aplica" : customer.telephone}</span>
      </div>{" "}
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">
          Dirección del cliente:
        </span>
        <span className="text-gray-800">{customer.address === "" ? "No aplica" : customer.address}</span>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="text-gray-600 font-medium">
          Método de pago:
        </span>
        <span className="text-green-500 capitalize">{payment_method}</span>
      </div>
    </div>
  );
};
