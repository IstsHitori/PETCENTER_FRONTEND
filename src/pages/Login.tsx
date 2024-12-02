import { ILogin } from "../types";
import gato from "/gato.svg";
import imagen from "/veterinaria.png";
import { useForm } from "react-hook-form";
import clientAxios from "@/config/axios";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useVeterinarieStore } from "../stores/useVeterinarieStore";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  //---
  const token = useVeterinarieStore((state) => state.token);
  const setToken = useVeterinarieStore((state) => state.setToken);
  //---
  const navigate = useNavigate();
  //---
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  return (
    <div className=" md:max-w-6xl max-w-lg flex-col-reverse flex md:flex-row md:p-10 p-2  gap-10">
      <form
        onSubmit={handleSubmit(async (login: ILogin) => {
          try {
            const response = await clientAxios.post("/auth/login", login);
            if (response.status === 200) {
              const { data } = response;
              localStorage.setItem("pet-veterinaria-token", data);
              setToken(localStorage.getItem("pet-veterinaria-token") as string);
            }
          } catch (error) {
            toast.error(error.response.data.error);
          }
        })}
      >
        <div className="flex flex-col">
          <h1 className="text-black font-bold text-2xl">
            Bienvenido de vuelta{" "}
            <img
              className=" inline-block ml-3"
              src={gato}
              width={40}
              alt="gatito"
            />{" "}
          </h1>
          <p className="text-zinc-800 mt-2">
            Inicia sesión y administra tus pacientes!!
          </p>

          <p className="text-sm text-black mt-10">Nombre de usuario</p>
          <input
            type="text"
            className="text-md px-5 rounded-xl py-2 mt-1 outline-none border text-black bg-[#F7FBFF]"
            placeholder="nombre de usuario"
            {...register("userName", {
              required: "El nombre de usuario es obligatorio",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            })}
          />
          {errors.userName && (
            <Error message={errors.userName.message as string} />
          )}

          <p className="text-sm text-black mt-4">Contraseña</p>
          <input
            type="password"
            placeholder="contraseña"
            className="text-md px-5 rounded-xl py-2 mt-1 outline-none border text-black bg-[#F7FBFF]"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <Error message={errors.password.message as string} />
          )}
          <input
            className="bg-zinc-700 text-[15px] cursor-pointer mt-5 text-white rounded-lg py-2 transition-all hover:bg-zinc-800"
            type="submit"
            value="Iniciar sesion"
          />
          <p className="text-center mt-2 mb-2">O</p>
          <NavLink
            className={
              "bg-slate-100 border  text-[15px] cursor-pointer  text-black rounded-lg py-2 transition-all hover:bg-slate-200 text-center"
            }
            to={"/registrarse"}
          >
            Crear una cuenta
          </NavLink>

          <p className="text-black mt-10 text-sm text-center">
            Vectors and icons by{" "}
            <a
              className="font-bold"
              href="https://dribbble.com/Howieart?ref=svgrepo.com"
              target="_blank"
            >
              Howieart
            </a>{" "}
            in CC Attribution License via{" "}
            <a
              className="font-bold"
              href="https://www.svgrepo.com/"
              target="_blank"
            >
              SVG Repo
            </a>
          </p>

          <p className="text-zinc-500 text-sm text-center relative mt-10">
            &copy; 2024 Todos los derechos reservados
          </p>
        </div>
      </form>
      <div className="md:my-auto">
        <img
          className="rounded-lg md:max-w-2xl bg-cover"
          src={imagen}
          alt="gato"
        />
      </div>
    </div>
  );
}
