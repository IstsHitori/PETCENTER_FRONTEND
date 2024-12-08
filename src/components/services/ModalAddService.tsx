import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { AddService } from "@/types/ServiceTypes";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { formatMoney } from "@/helpers";

export default function ModalAddService() {
  const isActiveModalAddService = useVeterinarieStore(
    (state) => state.isActiveModalAddService
  );
  const setModalAddService = useVeterinarieStore(
    (state) => state.setModalAddService
  );
  const createService = useVeterinarieStore((state) => state.createService);
  const patients = useVeterinarieStore((state) => state.patients);
  const fetchPatients = useVeterinarieStore((state) => state.fetchPatients);
  const products = useVeterinarieStore((state) => state.products);
  const fetchProducts = useVeterinarieStore((state) => state.fetchProducts);
  const [newService, setNewService] = useState<AddService>({
    patient: "",
    type: undefined,
    name: "",
    days: undefined,
    product: undefined,
    price: 0,
    state: "pagado",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      await fetchPatients();
      await fetchProducts();
    };
    fetch();
  }, [fetchPatients, fetchProducts]);
  const resetForm = () => {
    setNewService({
      patient: "",
      type: undefined,
      name: "",
      days: undefined,
      product: undefined,
      price: 0,
      state: "pendiente",
    });
  };

  const handleSelectChange = (value: string) => {
    setNewService({ ...newService, name: value });
  };
  function removeUndefined(
    obj: Record<string, unknown>
  ): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasValuesEmptys = Object.values(newService)
      .filter((value) => value !== undefined)
      .includes("");
    if (hasValuesEmptys) {
      toast.error("Error, hay campos vacíos");
      return;
    }
    resetForm();
    const service = removeUndefined(newService);
    await createService(newService.patient, service as AddService);
  };

  return (
    <Dialog
      open={isActiveModalAddService}
      onOpenChange={(e) => {
        setModalAddService(e);
        resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Servicio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">
                Paciente
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between"
                  >
                    {newService.patient
                      ? patients.find(
                          (patient) => patient._id === newService.patient
                        )?.name
                      : "Selecciona un paciente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[440px] p-0">
                  <Command>
                    <CommandInput placeholder="" />
                    <CommandList>
                      <CommandEmpty>No se encontró el paciente.</CommandEmpty>
                      <CommandGroup>
                        {patients.map((patient) => (
                          <CommandItem
                            key={patient._id}
                            value={patient._id}
                            onSelect={(currentValue) => {
                              setNewService({
                                ...newService,
                                patient:
                                  patient._id === newService.patient
                                    ? ""
                                    : currentValue,
                              });
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                newService.patient === patient._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {patient.name +
                              " - " +
                              patient.propietor +
                              " - " +
                              patient.size +
                              " - "}
                            {patient.hasVaccine
                              ? "Permitido vacunarse"
                              : "No permitido vacunarse"}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Resto de los campos del formulario */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange(value)}
                value={newService.name}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peluqueria">Peluquería mascota</SelectItem>
                  <SelectItem value="baño">Baño mascota</SelectItem>
                  <SelectItem value="hospitalizacion">
                    Hospitalización
                  </SelectItem>
                  <SelectItem value="vacunacion">Vacunación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newService.name === "hospitalizacion" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="days" className="text-right">
                    Días
                  </Label>
                  <Input
                    id="days"
                    name="days"
                    type="number"
                    min={0}
                    value={newService.days}
                    placeholder="Días que estará hospitalizado"
                    onChange={(e) =>
                      setNewService({ ...newService, days: +e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo de hospitalización
                  </Label>
                  <Select
                    onValueChange={(value) => setNewService({...newService,type:value})}
                    value={newService.type}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grave">Grave</SelectItem>
                      <SelectItem value="cronica">Crónica</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="observacion">Observación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            {newService.name === "vacunacion" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Vacuna
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewService({ ...newService, product: value })
                  }
                  value={newService.product}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona una vacuna" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) =>
                      product.category.name.toLocaleLowerCase() ===
                      "vacunas" ? (
                        <SelectItem key={product._id} value={product._id}>
                          {product.name + " " + formatMoney(product.price)}
                        </SelectItem>
                      ) : null
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step={1000}
                min={0}
                value={newService.price}
                placeholder="Precio del servicio"
                onChange={(e) =>
                  setNewService({ ...newService, price: +e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                Estado
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewService({ ...newService, state: value })
                }
                value={newService.state}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no pagado">Pendiente</SelectItem>
                  <SelectItem value="pagado">Pagado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Añadir Servicio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
