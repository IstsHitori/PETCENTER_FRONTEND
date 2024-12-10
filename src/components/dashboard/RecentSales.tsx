import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatMoney } from "@/helpers";
import { Order } from "@/types/OrderTypes";

export function RecentSales({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-8 max-h-[300px] 2xl:h-auto overflow-auto p-4">
      {orders.map((order, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {order.customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.customer.name}
            </p>
            <p className="text-sm text-muted-foreground ">
              {order.customer?.telephone}
            </p>
          </div>
          <div className={`ml-auto font-medium text-green-500`}>{"+" + formatMoney(order.total_amount)}</div>
        </div>
      ))}
    </div>
  );
}
