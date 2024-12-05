import { Patient } from "@/types/PatientTypes";

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

export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString("es-es", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(date).toLocaleTimeString("es-es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} ${formattedTime}`;
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
