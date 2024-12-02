import { StateCreator } from "zustand";
import { IProfile } from "../types";
import { fetchProfile } from "../helpers/fetchAPI";
export interface IAuthSlice {
  token: string;
  profile: IProfile;
  getProfile: () => Promise<void>;
  logoutSesion: () => void;
  setToken: (token: string) => void;
}

export const createAuthSlice: StateCreator<IAuthSlice> = (set, get) => ({
  token:
    (localStorage.getItem("pet-veterinaria-token")?.toString() as string) || "",
  profile: {
    name: "",
    userName: "",
  },
  getProfile: async () => {
    const dataProfile = (await fetchProfile(get().token)) as IProfile;
    set(() => ({
      profile: dataProfile,
    }));
  },
  logoutSesion: () => {
    localStorage.removeItem("pet-veterinaria-token");
    set(() => ({ token: "" }));
  },
  setToken: (token: string) => {
    set(() => ({
      token,
    }));
  },
});
