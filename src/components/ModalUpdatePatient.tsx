import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import gato from "/gato.svg";
import {Patient, UpdatePatient } from "@/types/PatientTypes";
import Error from "./Error";
import { listTypePetDefault } from "@/helpers";
import { listSizePetDefault } from "@/helpers";
import { useEffect } from "react";

export default function ModalUpdatePatient() {
  const isUpdatePatient = useVeterinarieStore((state) => state.isUpdatePatient);
  //---
  const setUpdatePatient = useVeterinarieStore(
    (state) => state.setUpdatePatient
  );
  const patientSelected = useVeterinarieStore((state) => state.patientSelected);
  const updatePatient = useVeterinarieStore((state) => state.updatePatient);
  const selectPatient = useVeterinarieStore((state) => state.selectPatient);
  //---
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdatePatient>();

  const handlePatient = async (data: UpdatePatient) => {
    data.hasVaccine = data.hasVaccine.toString() == "true" ? true : false;
    data.state = data.state.toString() == "true" ? true : false;
    await updatePatient(data, patientSelected._id);
    setUpdatePatient(false);
    selectPatient({} as Patient);
    reset();
  };

  useEffect(() => {
    setValue("name", patientSelected.name);
    setValue("propietor", patientSelected.propietor);
    setValue("docPropietor", patientSelected.docPropietor);
    setValue("telephone", patientSelected.telephone);
    setValue("symptoms", patientSelected.symptoms);
    setValue("typePet", patientSelected.typePet);
    setValue("size", patientSelected.size);
    setValue("hasVaccine", patientSelected.hasVaccine);
    setValue("state", patientSelected.state);
  }, [patientSelected,isUpdatePatient]);
  return (
    <>
      <Dialog
        open={isUpdatePatient}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setUpdatePatient(false);
          reset();
        }}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <form
            onSubmit={handleSubmit(handlePatient)}
            className="flex min-h-full items-center justify-center p-4"
          >
            <DialogPanel
              transition
              className="w-full max-w-3xl rounded-xl border-2 bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-md  gap-2"
            >
              <DialogTitle
                as="h3"
                className="text-base mb-4 text-center font-medium text-black"
              >
                <p className="inline-block">
                  Actualicemos el paciente {patientSelected.name}
                </p>
                <span>
                  <img
                    className="inline-block"
                    src={gato}
                    width={30}
                    alt="gato"
                  />
                </span>{" "}
                !!
              </DialogTitle>
              <div className="grid grid-cols-2  gap-x-16">
                <div className="flex flex-col mt-2">
                  <label htmlFor="name" className="text-sm/6 text-black/90">
                    Nombre del paciente
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="nombre del paciente"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("name", {
                      required: "Escriba el nombre del paciente",
                      minLength: {
                        value: 2,
                        message: "El nombre debe ser mínimo 2 letras",
                      },
                    })}
                  />
                  {errors.name && (
                    <Error message={errors.name.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="propietor"
                    className="text-sm/6 text-black/90"
                  >
                    Nombre del propietario
                  </label>
                  <input
                    type="text"
                    id="propietor"
                    placeholder="nombre del propietario"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("propietor", {
                      required: "Escriba el nombre del propietario",
                      minLength: {
                        value: 2,
                        message: "El nombre debe ser mínimo 2 letras",
                      },
                    })}
                  />
                  {errors.propietor && (
                    <Error message={errors.propietor.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="docPropietor"
                    className="text-sm/6 text-black/90"
                  >
                    Documento del propietario
                  </label>
                  <input
                    type="number"
                    id="docPropietor"
                    placeholder="documento"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400 appearance-none"
                    {...register("docPropietor", {
                      required: "Escriba el documento del propietario",
                      minLength: {
                        value: 10,
                        message: "Mínimo 10 dígitos",
                      },
                      maxLength: {
                        value: 10,
                        message: "Máximo 10 dígitos",
                      },
                    })}
                  />
                  {errors.docPropietor && (
                    <Error message={errors.docPropietor.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="telephone"
                    className="text-sm/6 text-black/90"
                  >
                    Telefono del propietario
                  </label>
                  <input
                    type="number"
                    id="telephone"
                    placeholder="telefono"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400 "
                    {...register("telephone", {
                      required: "Escriba el teléfono del propietario",
                      minLength: {
                        value: 10,
                        message: "Mínimo 10 dígitos",
                      },
                      maxLength: {
                        value: 10,
                        message: "Máximo 10 dígitos",
                      },
                    })}
                  />
                  {errors.telephone && (
                    <Error message={errors.telephone.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="symptoms" className="text-sm/6 text-black/90">
                    Sintomas del paciente
                  </label>
                  <textarea
                    id="symptoms"
                    placeholder="Sintomas"
                    className="min-h-24 outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("symptoms", {
                      required: "Escriba los sintomas",
                    })}
                  ></textarea>
                  {errors.symptoms && (
                    <Error message={errors.symptoms.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="typePet" className="text-sm/6 text-black/90">
                    Tipo de mascota
                  </label>
                  <select
                    id="typePet"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("typePet", {
                      required: "Elija un tipo de mascota",
                    })}
                  >
                    <option value="">
                      --- Seleccione un tipo de animal ---
                    </option>
                    {listTypePetDefault.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  {errors.typePet && (
                    <Error message={errors.typePet.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="size" className="text-sm/6 text-black/90">
                    Tamaño de la mascota
                  </label>
                  <select
                    id="size"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("size", {
                      required: "Elija un tamaño de la mascota",
                    })}
                  >
                    <option value="">
                      - Seleccione el tamaño de la mascota -
                    </option>
                    {listSizePetDefault.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  {errors.size && (
                    <Error message={errors.size.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="hasVaccine"
                    className="text-sm/6 text-black/90"
                  >
                    ¿El paciente tendrá vacunas?
                  </label>
                  <select
                    id="hasVaccine"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("hasVaccine", {
                      required: "Elija un opción",
                    })}
                  >
                    <option value="">- Seleccione una opción -</option>
                    <option value={`${"true"}`}>Sí</option>
                    <option value="false">No</option>
                  </select>
                  {errors.hasVaccine && (
                    <Error message={errors.hasVaccine.message as string} />
                  )}
                </div>

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="hasVaccine"
                    className="text-sm/6 text-black/90"
                  >
                    Estado del paciente
                  </label>
                  <select
                    id="state"
                    className="outline-none border rounded-lg px-2 text-sm h-8 focus:border-zinc-400"
                    {...register("state", {
                      required: "Elija un opción",
                    })}
                  >
                    <option value="">- Seleccione una opción -</option>
                    <option value={`${"true"}`}>Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                  {errors.state && (
                    <Error message={errors.state.message as string} />
                  )}
                </div>

                <div className="mt-4">
                  <input
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 focus:outline-1 cursor-pointer data-[focus]:outline-white "
                    type="submit"
                    value={"Actualizar paciente"}
                  />
                </div>
              </div>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </>
  );
}
