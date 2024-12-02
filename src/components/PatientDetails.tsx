import { Patient } from "@/types/PatientTypes";
import { useMemo } from "react";
import imgTelefono from "/telephone.svg";
import imgTypePet from "/typePet.svg";
import imgSizePet from "/sizePet.svg";
import imgPerson from "/person.svg";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { getImageByTypePet } from "@/helpers";
type PatientType = {
  patientInfo: Patient;
};

export default function PatientDetails({ patientInfo }: PatientType) {
  const selectPatient = useVeterinarieStore((state) => state.selectPatient);
  const patientSelected = useVeterinarieStore((state) => state.patientSelected);
  //---
  const { name, propietor, telephone, state, size, typePet } = patientInfo;

  const isSelected = useMemo(
    () => (patientSelected._id as string) === patientInfo._id,
    [patientSelected, patientInfo]
  );

  return (
    <div
      onClick={() => {
        selectPatient(isSelected ? ({} as Patient) : patientInfo);
      }}
      className={`${
        isSelected === true
          ? "border-violet-300 border-2"
          : "border-violet-200 shadow-md"
      } rounded-xl flex-col border  shadow-violet-100  flex p-4  bg-white cursor-pointer w-full h-56 overflow-hidden py-2`}
    >
      <div className="flex gap-5 border-b border-b-zinc-200 py-3 transition-all shadow-gray-200 rounded-md">
        <img
          className="p-3 size-20 border rounded-xl"
          src={`/${getImageByTypePet(typePet)}`}
          width={50}
          alt={`${typePet}-image`}
        />
        <div>
          <p className="text-[14.7px] font-semibold">{name}</p>
          <p className="text-zinc-500 text-[13px] flex gap-1 mb-1">
            <img src={imgPerson} width={18} alt="dueño-mascota" />
            {propietor}
          </p>
          <p
            className={`${
              state
                ? "bg-green-50 border border-green-400 text-green-500 shadow-md shadow-green-100"
                : "bg-red-50 border border-red-400 text-red-500 shadow-md shadow-red-100"
            } rounded-md inline-block text-[12.5px] px-5 py-1 text-center`}
          >
            {state ? "Activo" : "Inactivo"}
          </p>
        </div>
      </div>
      <div className="py-2 space-y-3">
        <p className="text-xs flex items-center gap-2 text-zinc-600">
          <img src={imgTelefono} width={18} alt="telefono" />
          {telephone}
        </p>

        <p className="text-xs flex items-center gap-2 text-zinc-600">
          <img src={imgTypePet} width={18} alt="tipo-mascota" />
          {typePet}
        </p>

        <p className="text-xs flex items-center gap-2 text-zinc-600">
          <img src={imgSizePet} width={18} alt="tamano-mascota" />
          {size}
        </p>
      </div>
    </div>
  );
}
