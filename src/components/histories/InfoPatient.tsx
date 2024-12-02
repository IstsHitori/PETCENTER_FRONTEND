import { Patient } from "@/types/PatientTypes";
import { getImageByTypePet } from "@/helpers";
import imgPerson from "/person.svg"

interface IInfoPatient {
  patient: Patient;
}
export default function InfoPatient({ patient }: IInfoPatient) {
    const {typePet,name,propietor,state} = patient;
  return (
    <div className="flex sticky gap-5 border-b border-b-zinc-200 py-3 w-full transition-all shadow-gray-200 rounded-md">
      <img
        className="p-3 size-16 border rounded-xl"
        src={`/${getImageByTypePet(typePet)}`}
        width={20}
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
  );
}
