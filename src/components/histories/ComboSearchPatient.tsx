import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useVeterinarieStore } from "@/stores/useVeterinarieStore"


export default function ComboSearchPatient() {
  const [open, setOpen] = React.useState(false)
  const patients = useVeterinarieStore((state) => state.patients);
  const setIdPatient = useVeterinarieStore((state) => state.setIdPatient);
  const idPatient = useVeterinarieStore((state) => state.idPatient);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {idPatient
            ? patients.find((patient) => patient._id === idPatient)?.name
            : "Selecciona un paciente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Busca un paciente por el ID" />
          <CommandList>
            <CommandEmpty>No se encontró el paciente.</CommandEmpty>
            <CommandGroup>
              {patients.map((patient) => (
                <CommandItem
                  key={patient._id}
                  value={patient._id}
                  onSelect={(currentValue) => {
                    setIdPatient(currentValue === idPatient ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      idPatient === patient._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {patient.name + " - " + patient.propietor + " - " + patient.telephone}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
