import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/Overview";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect, useMemo } from "react";
import { calculateRevenueChange, formatMoney } from "@/helpers";
export default function DashBoard() {
  const fetchOrders = useVeterinarieStore((state) => state.fetchOrders);
  const orders = useVeterinarieStore((state) => state.orders);
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);
  const fetchServices = useVeterinarieStore((state) => state.fetchServices);
  const fetchProducts = useVeterinarieStore((state) => state.fetchProducts);
  const products = useVeterinarieStore((state) => state.products);
  const patients = useVeterinarieStore((state) => state.patients);
  const services = useVeterinarieStore((state) => state.services);

  useEffect(() => {
    const fetch = async () => {
      await fetchOrders();
      await fetchPatients();
      await fetchServices();
      await fetchProducts();
    };
    fetch();
  }, []);

  const dataMoney = useMemo(
    () => calculateRevenueChange(orders, services),
    [orders, services]
  );
  const total_patients = useMemo(() => patients.length ,[patients])
  return (
    <main className="h-full max-h-[500px] 2xl:max-h-[800px] overflow-auto">
      <section className="flex flex-col gap-10 overflow-y-auto p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border shadow-md shadow-green-100 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos Totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMoney(dataMoney.currentTotal)}</div>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{dataMoney.percentageChange} respecto al mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pacientes
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total_patients}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
              <CreditCard className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card className="border border-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ordenes</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Resumen de Ingresos</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview orders={orders} services={services} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Ventas Recientes</CardTitle>
              <CardDescription>
                Has realizado {orders.length} ventas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales orders={orders} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
