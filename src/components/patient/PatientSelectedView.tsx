import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import edit from "/edit.svg";
import person from "/person.svg";
import imgDelete from "/delete.svg";
import imgTelephone from "/telephone.svg";
import imgDate from "/date.svg";
import imgSymptoms from "/symptoms.svg";
import imgState from "/state.svg";
import imgDocument from "/document.svg";
import imgPet from "/typePet.svg";
import imgSize from "/sizePet.svg";
import { formatDate } from "@/helpers";
import { getImageByTypePet } from "@/helpers";
import { Patient } from "@/types/PatientTypes";
export default function PatientSelectedView() {
  const patientSelected = useVeterinarieStore((state) => state.patientSelected);
  const deletePatient = useVeterinarieStore((state) => state.deletePatient);
  const setUpdatePatient = useVeterinarieStore(
    (state) => state.setUpdatePatient
  );
  const {
    _id,
    name,
    propietor,
    telephone,
    date,
    symptoms,
    state,
    typePet,
    docPropietor,
    size,
    hasVaccine,
    createdAt,
    updatedAt,
  } = patientSelected as Patient;
  return (
    <section
      className={` transition-all lg:col-span-4 lg:overflow-y-auto  lg:max-h-[535px] 2xl:max-h-[930px] shadow rounded-lg  h-full 2xl:col-span-3 duration-700 delay-[20ms]  overflow-y-auto ${
        _id
          ? "  translate-x-0 bg-zinc-50 "
          : " -translate-x-[-100px] bg-transparent delay-0 duration-0"
      } `}
    >
      {_id && (
        <>
          <div
            className={`rounded-xl relative overflow-hidden flex items-center justify-center flex-col py-8`}
          >
            {/* Imagen */}

            <div className="w-full h-full absolute blur-xl bg-cover " style={{
              backgroundImage: `url(/${getImageByTypePet(typePet)})`
            }}>

            </div>
            <div className="z-10 flex flex-col items-center">
              <div
                className={`size-28 2xl:size-32 p-5 border-2  rounded-full flex items-center justify-center overflow-hidden border-dashed}`}
              >
                <img src={`/${getImageByTypePet(typePet)}`} alt={`${typePet}-image`} />
              </div>

              <h4 className="font-semibold text-sm  mt-3 2xl:text-md">
                {name}
              </h4>
              <p className="text-sm underline text-neutral-950">
                Propietario: <span className="font-semibold">{propietor}</span>
              </p>
            </div>
          </div>

          <div className=" px-2 bg-white border rounded-2xl py-3 shadow-lg shadow-zinc-300 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-normal">Información del paciente</h2>

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => {
                    setUpdatePatient(true);
                  }}
                  className="border transition-all hover:bg-blue-50 border-blue-400 bg-white p-2 rounded-full"
                >
                  <img src={edit} width={20} alt="editar" />
                </button>

                <button
                  type="button"
                  onClick={async () => await deletePatient(_id)}
                  className="border transition-all hover:bg-red-50 border-red-400 bg-white p-2 rounded-full"
                >
                  <img src={imgDelete} width={20} alt="delete" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={person}
                alt="person"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Nombre del propietario</p>
                <p className="font-semibold text-[13.5px]">{propietor}</p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={imgDocument}
                alt="documento"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">
                  Documento del propietario
                </p>
                <p className="font-semibold text-[13.5px]">{docPropietor}</p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={imgTelephone}
                alt="telefono"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Teléfono</p>
                <p className="font-semibold text-[13.5px]">{telephone}</p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={imgDate}
                alt="fecha"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Fecha de alta</p>
                <p className="font-semibold text-[13.5px]">
                  {formatDate(date)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={imgSymptoms}
                alt="sintomas"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Síntomas</p>
                <p className="font-semibold text-[13.5px]">{symptoms}</p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className={`${
                  state ? "bg-green-100" : "bg-red-100"
                } rounded-full  size-9 border p-2`}
                src={imgState}
                alt="estado"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Estado</p>
                <p
                  className={`${
                    state
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  } font-normal rounded-lg px-5 text-[13.5px] py-[2px]`}
                >
                  {state ? "Paciente activo" : "Paciente inactivo"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-b ">
              <img
                className={`${
                  hasVaccine ? "bg-green-100" : "bg-red-100"
                } rounded-full  size-9 border p-2`}
                src={imgState}
                alt="permiso-vacunarse"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">
                  ¿Permitido para vacunarse?
                </p>
                <p
                  className={`${
                    hasVaccine
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  } font-normal rounded-lg px-5 text-[13.5px] text-center py-[2px]`}
                >
                  {hasVaccine ? "Permitido" : "No permitido"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={imgPet}
                alt="tipo-mascota"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Tipo de mascota</p>
                <p className="font-semibold text-[13.5px]">{typePet}</p>
              </div>
            </div>

            <div className="flex gap-3 border-b">
              <img
                className="rounded-full bg-zinc-50 size-9 border p-2"
                src={imgSize}
                alt="tamaño"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Tamaño</p>
                <p className="font-semibold text-[13.5px]">{size}</p>
              </div>
            </div>

            <div className="flex gap-3 border-b ">
              <img
                className={` rounded-full  size-9 border p-2`}
                src={imgDate}
                alt="permiso-vacunarse"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">
                  Fecha de registro del paciente
                </p>
                <p
                  className={`font-semibold rounded-lg  text-[13.5px] py-[2px]`}
                >
                  {formatDate(createdAt)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 ">
              <img
                className={` rounded-full  size-9 border p-2`}
                src={imgDate}
                alt="permiso-vacunarse"
                width={17}
              />
              <div>
                <p className="text-sm  text-zinc-600">Última actualización</p>
                <p
                  className={`font-semibold rounded-lg text-[13.5px] py-[2px]`}
                >
                  {formatDate(updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
