import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Patient } from "@/types/PatientTypes";
import InfoPatient from "./InfoPatient";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import { useState } from "react";
import { Histories } from "@/types/HistoryTypes";
import { formatDate } from "@/helpers";

type AccordionHistoriesTypes = {
  patient: Patient;
};
export default function AccordionHistories({
  patient,
}: AccordionHistoriesTypes) {
  const getHistorysByPatient = useVeterinarieStore(
    (state) => state.getHistorysByPatient
  );
  //---
  const [historiesPatient, setHistoriesPatient] = useState<Histories>([]);

  useEffect(() => {
    const fetchHistorysPatient = async () => {
      const historys = await getHistorysByPatient(patient._id);
      setHistoriesPatient(historys);
    };
    fetchHistorysPatient();
  }, []);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border max-h-[400px] overflow-auto rounded-md px-2">
        <AccordionTrigger className=" sticky hover:no-underline p-0 rounded-md">
          <InfoPatient patient={patient} />
        </AccordionTrigger>
        {
            historiesPatient.map(historie => <AccordionContent className="p-2 bg-white border-l-orange-500 shadow-md shadow-slate-100 border-l-4 rounded-md my-3 space-y-1 ml-2 py-3" key={historie._id}>
                <p className="text-orange-500 text-xs">{formatDate(historie.date)}</p>
                <textarea disabled className="resize-none w-full p-2 h-36">{historie.history}</textarea>
            </AccordionContent> )
        }
      </AccordionItem>
    </Accordion>
  );
}
