import clientAxios from "../config/axios";
import { IProfile } from "@/types";
export const config = (token: string) => {
  return {
    headers: {
      "Content-type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchProfile = async (token: string) => {
  try {
    const response = await clientAxios.get("/auth/get-profile", config(token));
    if (response.status === 200) {
      const data:IProfile = response.data;
      return data;
    }
    return new Error("Veterinario no encontrado");
  } catch (error) {
    console.log(error);
  }
};
