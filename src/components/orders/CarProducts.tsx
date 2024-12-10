import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { FormEvent, useMemo, useState } from "react";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { formatMoney } from "@/helpers";
import { Trash2 } from "lucide-react";
import { AddOrder } from "@/types/OrderTypes";
import { toast } from "react-toastify";
export default function CarProducts() {
  const [customer, setCustomer] = useState({
    name: "",
    nit: 0,
    address: "",
    telephone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const carItems = useVeterinarieStore((state) => state.carItems);
  const products = useVeterinarieStore((state) => state.products);
  const fetchProducts = useVeterinarieStore((state) => state.fetchProducts);
  const handleDeleteItemToCar = useVeterinarieStore(
    (state) => state.handleDeleteItemToCar
  );
  const handleChangeQuan = useVeterinarieStore(
    (state) => state.handleChangeQuan
  );
  const createOrder = useVeterinarieStore((state) => state.createOrder);

  const precioTotal = useMemo(
    () =>
      carItems.reduce((sum, index) => sum + index.price * index.quantity, 0),
    [carItems]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newOrder: AddOrder = {
      customer,
      items: carItems,
      payment_method: paymentMethod,
      total_amount: precioTotal,
    };
  
    if (newOrder.customer.name === "") {
      toast.error("Error, escriba el nombre del cliente");
      return;
    } if (newOrder.items.length < 1) {
      toast.error("Error, el carrito está vacío");
      return;
    }
  

    await createOrder(newOrder);
    await fetchProducts();
    setCustomer({
      name: "",
      nit: 0,
      address: "",
      telephone: "",
    });
    setPaymentMethod("efectivo");
  };
  return (
    <div>
      <form
        className="  border h-full text-center shadow-xl rounded-lg mt-2 shadow-blue-100 px-5 ml-10 2xl:w-[600px] 2xl:mx-auto py-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center mb-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-lg font-bold text-blue-600 mb-2">
            Tienda Veterinaria Pet Center
          </h1>
        </div>

        <div className="my-6 border-b-2 border-dashed border-gray-200"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Nit del cliente:</span>
            <input
              className="rounded-lg p-1 text-gray-800 outline-none"
              onChange={(e) =>
                setCustomer({ ...customer, nit: +e.target.value })
              }
              value={customer.nit}
              type="number"
            />
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">
              Nombre del cliente:
            </span>
            <input
              className="rounded-lg p-1 text-gray-800 outline-none"
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              value={customer.name}
              type="text"
            />
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">
              Teléfono del cliente:
            </span>
            <input
              className="rounded-lg p-1 text-gray-800 outline-none"
              onChange={(e) =>
                setCustomer({ ...customer, telephone: e.target.value })
              }
              value={customer.telephone}
              type="number"
            />
          </div>{" "}
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">
              Dirección del cliente:
            </span>
            <input
              className="rounded-lg p-1 text-gray-800 outline-none"
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              value={customer.address}
              type="text"
            />
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Método de pago:</span>
            <div>
              <Select
                onValueChange={(e) => setPaymentMethod(e)}
                defaultValue={"efectivo"}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Secciona el método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"efectivo"}>En efectivo</SelectItem>
                  <SelectItem value={"transferencia"}>Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className=" mb-4 mt-5 overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="py-2 px-3 text-left rounded-l-lg">Eliminar</th>
                <th className="py-2 px-3 text-center">Producto</th>
                <th className="py-2 px-3 text-center">Cant.</th>
                <th className="py-2 px-3 text-right rounded-r-lg">Precio</th>
              </tr>
            </thead>
            <tbody>
              {carItems.map((item) => (
                <tr
                  key={item.product}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="text-left px-5">
                    <Button
                      variant={"destructive"}
                      className="size-6"
                      type="button"
                      onClick={() => handleDeleteItemToCar(item.product)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                  <td className="py-2 px-3 text-gray-700 text-center ">
                    {products.find((prod) => prod._id === item.product)?.name}
                  </td>
                  <td className="py-2 px-3 flex items-center justify-center gap-2 text-center text-gray-600">
                    <Button
                      type="button"
                      className="size-6 bg-blue-500 hover:bg-blue-600 "
                      onClick={() => {
                        const stockProduct = products.find(
                          (prod) => prod._id === item.product
                        )?.quantity as number;
                        handleChangeQuan(1, item.product, stockProduct);
                      }}
                    >
                      +
                    </Button>
                    {item.quantity}
                    <Button
                      variant={"destructive"}
                      className="size-6"
                      type="button"
                      onClick={() => {
                        const stockProduct = products.find(
                          (prod) => prod._id === item.product
                        )?.quantity as number;
                        handleChangeQuan(0, item.product, stockProduct);
                      }}
                    >
                      -
                    </Button>
                  </td>
                  <td className="py-2 px-3 text-right text-gray-800">
                    {formatMoney(item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {carItems.length > 0 && (
          <p className="flex items-center p-3 bg-blue-100 text-blue-800 rounded-lg justify-around mt-2 font-semibold">
            <span>Total a pagar:</span>
            {formatMoney(precioTotal)}
          </p>
        )}
        <Button type="submit" className="mt-5 bg-blue-600 hover:bg-blue-700">
          Crear orden
        </Button>
      </form>
    </div>
  );
}
