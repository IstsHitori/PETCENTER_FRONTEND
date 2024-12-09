import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalAddOrder from "@/components/orders/ModalAddOrder";
import { Receipt } from "@/components/orders/Receipt";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { Order } from "@/types/OrderTypes";
import { useEffect, useState } from "react";
export default function MainOrders() {
  const orders = useVeterinarieStore((state) => state.orders);
  const [filter, setFilter] = useState("todos");
  const [ordersFilter, setOrdersFilter] = useState([...orders]);
  const [searchCustomer, setSearchCustomer] = useState("");

  const filterOrders = (
    term: string,
    payment_method: Order["payment_method"] | "todos"
  ) => {
    const filtered = orders.filter(
      (order) =>
        (order.customer.name.toLowerCase().includes(term) ||
          order.customer.name.toLowerCase().includes(term)) &&
        (payment_method === "todos" || order.payment_method === payment_method)
    );
    setOrdersFilter(filtered);
  };

  function handleCategoryChange(term: string): void {
    setFilter(term);
  }

  function handleSearchChange(value: string) {
    setSearchCustomer(value);
  }

  useEffect(() => {
    filterOrders(searchCustomer, filter);
  }, [filter, searchCustomer, orders]);

  return (
    <>
      <aside className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant={filter === "todos" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleCategoryChange("todos")}
          >
            Todos
          </Button>

          <Button
            variant={filter === "efectivo" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleCategoryChange("efectivo")}
          >
            Efectivo
          </Button>

          <Button
            variant={filter === "transferencia" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleCategoryChange("transferencia")}
          >
            Transferencia
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <ModalAddOrder />
          <Input
            className="w-[400px]"
            placeholder="Buscar factura por orden del cliente"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </aside>
      <div className="grid mt-3 grid-cols-2 2xl:grid-cols-3 2xl:max-h-[900px] max-h-[580px] overflow-auto">
        {ordersFilter.map((order) => (
          <Receipt key={order._id} order={order} />
        ))}
      </div>
    </>
  );
}
