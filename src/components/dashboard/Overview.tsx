import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { calculateSimpleMonthlyRevenue } from "@/helpers";
import { Order } from "@/types/OrderTypes";
import { Service } from "@/types/ServiceTypes";

export function Overview({
  orders,
  services,
}: {
  orders: Order[];
  services: Service[];
}) {
  const result = calculateSimpleMonthlyRevenue(
    orders,
    services,
    new Date().getFullYear()
  );
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={result}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          contentStyle={{ background: "#fff", border: "1px solid #ccc" }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
