import { ChangeEvent, FormEvent } from "react";
import gato from "/gato.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import clientAxios from "../config/axios";
export default function ConfirmAccount() {
  const [token, setToken] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const TOKEN =
      token.n1 + token.n2 + token.n3 + token.n4 + token.n5 + token.n6;

    try {
      const response = await clientAxios.post("/auth/confirm-account", {
        token: TOKEN,
      });
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setToken({
      ...token,
      [name]: e.target.value,
    });
  };
  return (
    <div className="bg-slate-50 rounded-md p-5">
      <img className="mx-auto" src={gato} width={100} alt="gatito" />
      <h1 className="text-2xl">
        Ingresa el código que recibiste en el correo!!
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-10 flex gap-6 items-center justify-center"
      >
        <input
          className="size-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-violet-400 outline-none border-2 rounded-md text-center"
          type="number"
          name="n1"
          onChange={handleChange}
        />
        <input
          className="size-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-violet-400 outline-none border-2 rounded-md text-center"
          type="number"
          name="n2"
          onChange={handleChange}
        />
        <input
          className="size-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-violet-400 outline-none border-2 rounded-md text-center"
          type="number"
          name="n3"
          onChange={handleChange}
        />
        <input
          className="size-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-violet-400 outline-none border-2 rounded-md text-center"
          type="number"
          name="n4"
          onChange={handleChange}
        />
        <input
          className="size-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-violet-400 outline-none border-2 rounded-md text-center"
          type="number"
          name="n5"
          onChange={handleChange}
        />
        <input
          className="size-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-violet-400 outline-none border-2 rounded-md text-center"
          type="number"
          name="n6"
          onChange={handleChange}
        />
        <input type="submit" value="" />
      </form>
    </div>
  );
}
