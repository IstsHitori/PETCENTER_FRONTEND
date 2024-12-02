import { Patient } from "@/types/PatientTypes";
import InfoPatient from "./InfoPatient";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
interface IShowPatientHistory {
  patient: Patient;
}
export default function ShowPatientHistory({ patient }: IShowPatientHistory) {
  const setIdPatient = useVeterinarieStore((state) => state.setIdPatient);
  const setModalAddHistorie = useVeterinarieStore(
    (state) => state.setModalAddHistorie
  );
  //--
  const handleClick = () => {
    setIdPatient(patient._id);
    setModalAddHistorie(true);
  };

  return (
    <article
      className="cursor-pointer transition-all px-2 hover:bg-zinc-50 rounded-lg"
      onClick={handleClick}
    >
      <InfoPatient patient={patient} />
    </article>
  );
}
