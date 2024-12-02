import { useEffect, useState } from "react";
import gato from "/gato.svg";
import dashboard from "/dashboard.png";
import logout from "/logout.png";
import cat from "/cat.png";
import person from "/person.png";
import { NavLink } from "react-router-dom";
import settings from "/settings.png";
import { useVeterinarieStore } from "../stores/useVeterinarieStore";
import Acordion from "./Acordion";
import { useLocation } from "react-router-dom";
import {
  dataProducts,
  dataPatients,
  dataHistory,
  dataVaccine,
} from "@/helpers";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const getProfile = useVeterinarieStore((state) => state.getProfile);
  const logoutSesion = useVeterinarieStore((state) => state.logoutSesion);
  const profile = useVeterinarieStore((state) => state.profile);

  //--
  const { pathname } = useLocation();
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="flex min-w-60 py-3 border-r border-r-slate-200 justify-between px-3 border-b border-gray-400  md:flex-col">
      <nav>
        <section className="MOBILE-MENU flex justify-between w-[400px] px-2 items-center lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2 hover:bg-gray-200 p-2 rounded-lg transition-all"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>

            <a href="/"></a>
          </div>

          <img className="mx-6" src={gato} width={50} alt="logo" />

          <div className="bg-white size-10 rounded-full uppercase text-center flex items-center justify-center border-2 border-violet-700  font-semibold">
            {profile.name.charAt(0) + profile.name.charAt(1)}
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col min-h-[200px]">
              <li>
                <NavLink className={"text-md font-semibold"} to={"/dashboard"}>
                  Inicio
                </NavLink>
              </li>
              <li>
                <Acordion data={dataProducts} />
              </li>
              <li>
                <Acordion data={dataPatients} />
              </li>
              <li>
                <Acordion data={dataHistory} />
              </li>
              <li>
                <Acordion data={dataVaccine} />
              </li>
              <li>
                <NavLink
                  className={"text-md font-semibold"}
                  to={"/veterinarios/ver-veterinarios"}
                >
                  Veterinarios
                </NavLink>
              </li>
            </ul>
          </div>
        </section>
        <div className="text-center hidden md:block px-1 py-5 border-b ">
          <div className="flex items-center gap-3 justify-center">
            <img src={gato} alt="gato" width={40} />
            <h1 className="text-lg font-normal text-gray-800 bg-violet-200/95 px-3 p-1 rounded-md">
              Veterinaria{" "}
              <span className="font-semibold text-violet-600">PET</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 px-1 mt-2 ">
            <div className="bg-white size-10 rounded-full uppercase text-center flex items-center justify-center border-2 border-violet-700  font-semibold">
              {profile.name.charAt(0) + profile.name.charAt(1)}
            </div>
            <div className="space-y-1">
              <h1 className="text-sm uppercase block text-center ">
                {profile.name}
              </h1>
              <p className="text-zinc-500 text-xs block text-center">
                {profile.userName}
              </p>
            </div>
          </div>
        </div>

        <ul className="DESKTOP-MENU hidden lg:text-md mt-2 md:flex flex-col space-y-1">
          <li></li>

          <li>
            <NavLink
              className={`${
                pathname === "/dashboard"
                  ? "font-semibold underline bg-zinc-100"
                  : "hover:bg-zinc-100"
              } flex p-2 transition-all rounded-md items-center text-sm gap-4`}
              to={"/dashboard"}
            >
              <img src={dashboard} alt="inicio" width={20} />
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${
                pathname === "/dashboard/pacientes"
                  ? "font-semibold underline bg-zinc-100"
                  : "hover:bg-zinc-100"
              } flex p-2 transition-all rounded-md items-center text-sm gap-4`}
              to={"/dashboard/pacientes"}
            >
              <img src={cat} alt="inicio" width={20} />
              Pacientes
            </NavLink>
          </li>
          <li>
            <Acordion data={dataHistory} />
          </li>
          <li>
            <Acordion data={dataProducts} />
          </li>
          <li>
            <Acordion data={dataVaccine} />
          </li>
          <li>
            <NavLink
              className={`${
                pathname === "/veterinarios/ver-veterinarios"
                  ? "font-semibold underline bg-zinc-200"
                  : "hover:bg-zinc-100"
              } flex p-2 transition-all rounded-md items-center text-sm gap-4`}
              to={"/veterinarios/ver-veterinarios"}
            >
              <img src={person} alt="veterinarios" width={20} />
              Ver veterinarios
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="hidden md:flex  flex-col gap-5 mt-10 border-t py-1">
        <div className="flex flex-col">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-zinc-100 flex p-2 transition-all hover:underline rounded-md gap-4 text-sm items-center"
                : "flex hover:bg-zinc-100 transition-all hover:underline p-2 rounded-md gap-4 text-sm items-center"
            }
            to={"/perfil/configuración"}
          >
            <img src={settings} alt="configuracion" width={20} />
            Configuración
          </NavLink>

          <button
            className={`flex hover:bg-zinc-100 transition-all hover:underline p-2 rounded-md gap-4 text-sm items-center`}
            onClick={() => {
              logoutSesion();
            }}
          >
            <img src={logout} alt="configuracion" width={20} />
            Cerrar sesión
          </button>
        </div>
      </div>

      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
