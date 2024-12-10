import { Order } from "@/types/OrderTypes";
import { Patient } from "@/types/PatientTypes";
import { Service } from "@/types/ServiceTypes";

export const dataProducts = {
  text_header: "Productos",
  img: "products.png",
  item_1: {
    url: "/dashboard/productos/ver-productos",
    link_text: "Ver inventario",
  },
  item_2: {
    url: "/dashboard/productos/agregar-producto",
    link_text: "Agregar producto",
  },
};

export const dataPatients = {
  text_header: "Pacientes",
  img: "cat.png",
  item_1: {
    url: "/dashboard/pacientes/ver-pacientes",
    link_text: "Ver pacientes",
  },
  item_2: {
    url: "/dashboard/pacientes/agregar-paciente",
    link_text: "Agregar paciente",
  },
};

export const dataHistory = {
  text_header: "Historias clínicas",
  img: "medical.png",
  item_1: {
    url: "/dashboard/historias/ver-historias",
    link_text: "Ver historias clínicas",
  },
};

export const dataVaccine = {
  text_header: "Vacunas",
  img: "vaccine.png",
  item_1: {
    url: "/dashboard/vacunas/ver-vacunas",
    link_text: "Ver vacunas",
  },
  item_2: {
    url: "/dashboard/vacunas/agregar-vacunas",
    link_text: "Agregar vacunas",
  },
};

export const listTypePetDefault = ["Perro", "Gato", "Hamster", "Loro", "Otro"];

const listImgTypePetDefault = [
  "dog-default.svg",
  "cat-default.svg",
  "hamster-default.svg",
  "parrot-default.svg",
  "pet-default.svg",
];

export const listSizePetDefault = ["Pequeño", "Mediano", "Grande"];

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("es-es", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formattedTime = (date: string) =>
  new Date(date).toLocaleTimeString("es-es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const formatDate = (date: string) => {
  return `${formattedDate(date)} ${formattedTime(date)}`;
};
export function getImageByTypePet(typePet: Patient["typePet"]) {
  const position = listTypePetDefault.findIndex((value) => value === typePet);
  return listImgTypePetDefault[position];
}

export const formatMoney = (money: number): string =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(money);

export const calculateRevenueChange = (
  orders: Order[],
  services: Service[]
): {
  currentTotal: number;
  previousTotal: number;
  percentageChange: string;
} => {
  const currentDate = new Date();

  // Mes actual
  const startOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Mes anterior
  const startOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const endOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  // Calcular ingresos de ordenes del mes actual
  const currentMonthOrdersRevenue = orders
    .filter((order) => new Date(order.date) >= startOfCurrentMonth)
    .reduce((total, order) => total + order.total_amount, 0);

  // Calcular ingresos de servicios del mes actual
  const currentMonthServicesRevenue = services
    .filter((service) => new Date(service.date) >= startOfCurrentMonth) // Assuming a 'date' property in Service
    .reduce((total, service) => total += service.state === "pagado" ? service.price : 0, 0);

  // Calcular ingresos totales del mes actual
  const currentMonthTotalRevenue =
    currentMonthOrdersRevenue + currentMonthServicesRevenue;

  // Filtro similar para ingresos del mes anterior (orders and services)
  const previousMonthOrdersRevenue = orders
    .filter(
      (order) =>
        new Date(order.date) >= startOfPreviousMonth &&
        new Date(order.date) <= endOfPreviousMonth
    )
    .reduce((total, order) => total + order.total_amount, 0);

  const previousMonthServicesRevenue = services
    .filter(
      (service) =>
        new Date(service.date) >= startOfPreviousMonth &&
        new Date(service.date) <= endOfPreviousMonth
    ) // Assuming a 'date' property in Service
    .reduce((total, service) => total + service.price, 0);

  const previousMonthTotalRevenue =
    previousMonthOrdersRevenue + previousMonthServicesRevenue;

  // Calcular el cambio porcentual
  const percentageChange =
    previousMonthTotalRevenue > 0
      ? ((currentMonthTotalRevenue - previousMonthTotalRevenue) /
          previousMonthTotalRevenue) *
        100
      : currentMonthTotalRevenue > 0
      ? 100
      : 0;

  return {
    currentTotal: currentMonthTotalRevenue,
    previousTotal: previousMonthTotalRevenue,
    percentageChange: `${percentageChange.toFixed(1)}%`,
  };
};


export function calculateSimpleMonthlyRevenue(
  orders: Order[],
  services: Service[],
  year: number
): Array<{ name: string; total: number }> {
  const MONTHS = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  return MONTHS.map((name, index) => {
    const monthOrders = orders
      .filter(
        (order) =>
          new Date(order.date).getMonth() === index &&
          new Date(order.date).getFullYear() === year
      )
      .reduce((sum, order) => sum + order.total_amount, 0);

    const monthServices = services
      .filter(
        (service) =>
          new Date(service.date).getMonth() === index &&
          new Date(service.date).getFullYear() === year
      )
      .reduce((sum, service) => sum += service.state === "pagado" ? service.price : 0, 0);

    return {
      name,
      total: monthOrders + monthServices,
    };
  });
}
