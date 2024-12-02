import PatientDetails from "@/components/PatientDetails";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import add from "/add.svg";
import PatientSelectedView from "@/components/PatientSelectedView";
import { useEffect } from "react";
import ModalAddPatient from "@/components/ModalAddPatient";
import ModalUpdatePatient from "@/components/ModalUpdatePatient";

export default function ViewPatients() {
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);
  const patients = useVeterinarieStore((state) => state.patients);
  const patientSelected = useVeterinarieStore((state) => state.patientSelected);
  const filterPatients = useVeterinarieStore((state) => state.filterPatients);
  const setPatientFilter = useVeterinarieStore((state) => state.setPatientFilter);
  const searchPatientByPropietor = useVeterinarieStore((state) => state.searchPatientByPropietor);

  const activateModalAddPatient = useVeterinarieStore(
    (state) => state.activateModalAddPatient
  );
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div>
      <ModalAddPatient />
      <ModalUpdatePatient />
      <div className=" flex flex-wrap justify-center md:justify-normal items-center gap-10 text-sm">
        <h1 className="px-3 text-md 2xl:text-lg underline">
          Se encontraron <strong>{patients.length}</strong> pacientes
        </h1>

        <div className="flex rounded-lg text-md gap-2 items-center">
          <p>Filtrar los pacientes</p>
          <select onChange={async(e) => {setPatientFilter(e.target.value); await filterPatients(); }} className="outline-none border p-1  rounded-lg w-[200px]" name="" id="">
            <option value="">Ninguno</option>
            <option value="name">Nombre</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="hamster">Hamster</option>
          </select>
        </div>

        <div className="flex gap-2 flex-col items-center justify-center md:flex-row">
          <label htmlFor="propietor">Busca el paciente por su propietario </label>
          <input type="text" onChange={(e) => {
            searchPatientByPropietor(e.target.value);
          }} id="propietor" placeholder="nombre del propietario" className="border rounded-lg ml-1 p-1 outline-none focus:border-zinc-400" />
        </div>
      </div>

      <div className="p-3 gap-3 grid md:grid-cols-12">
        <div
          className={`grid ${
            patientSelected.propietor
              ? "2xl:col-span-9 lg:grid-cols-2 lg:col-span-8 2xl:grid-cols-3"
              : "2xl:col-span-12 lg:col-span-12 lg:grid-cols-3 2xl:grid-cols-4"
          } max-h-[400px] lg:max-h-[535px] 2xl:max-h-[930px] bg-slate-50 overflow-y-auto scr p-2 rounded-lg  gap-5 transition-all`}
        >
          <button
            type="button"
            onClick={() => {
              activateModalAddPatient(true);
            }}
            className="bg-white shadow-lg shadow-green-50 border border-green-300 flex items-center transition-all justify-center w-full h-full lg:h-56 2xl:h-56 flex-col rounded-xl hover:bg-green-100"
          >
            <div className=" size-11 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-400 animate-pulse hover:animate-none border-dashed">
              <img width={20} src={add} alt="btn-agregar-paciente" />
            </div>

            <p className="text-[14px]  text-green-400 mt-1">Nuevo paciente</p>
          </button>
          
          {patients.map((patient) => (
            <PatientDetails key={patient._id} patientInfo={patient} />
          ))}
        </div>

        <PatientSelectedView />
      </div>
    </div>
  );
}
