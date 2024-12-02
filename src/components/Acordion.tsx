import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export type AcordionTypes = {
  data: {
    text_header: string;
    img: string;
    item_1: {
      url: string;
      link_text: string;
    };
    item_2: {
      url: string;
      link_text: string;
    };
  };
};

export default function Acordion({ data }: AcordionTypes) {
  const { item_1, item_2, text_header, img } = data;
  const { pathname } = useLocation();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="" value="item-1">
        <AccordionTrigger className="font-normal text-sm hover:font-semibold flex justify-between px-2">
          <div className="flex gap-4">
            <img src={`/${img}`} width={20} alt="img" />
            {text_header}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <NavLink
            className={`text-[13px] ${
              pathname === item_1.url ? "bg-zinc-200" : "bg-white"
            } text-left block rounded-md hover:bg-zinc-200 hover:text-[13.8px] hover:underline p-2 transition-all px-12 hover:px-11`}
            to={item_1.url}
          >
            {item_1.link_text}
          </NavLink>
        </AccordionContent>
        <AccordionContent>
          <NavLink
            className={`text-[13px] ${
              pathname === item_2.url ? "bg-zinc-200" : "bg-white"
            } text-left block rounded-md hover:bg-zinc-200 hover:text-[13.8px] hover:underline p-2 transition-all px-12 hover:px-11`}
            to={item_2.url}
          >
            {item_2.link_text}
          </NavLink>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
