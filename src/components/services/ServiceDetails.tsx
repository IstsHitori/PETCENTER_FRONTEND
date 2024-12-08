import { Service } from "@/types/ServiceTypes";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatMoney, formattedDate, formattedTime } from "@/helpers";
import { CalendarIcon, ClockIcon, PawPrintIcon } from "lucide-react";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";

export default function ServiceDetails({ service }: { service: Service }) {
  const { name, price, patient, state, date, product, days, type, _id } =
    service;
  const patchStateService = useVeterinarieStore(
    (state) => state.patchStateService
  );

  const handleChangeState = async (state: Service["state"]) => {
    await patchStateService(_id, state);
  };
  return (
    <Card className="w-[350px] overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {patient.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold">
                {patient.name}
              </CardTitle>
              <CardDescription className="text-sm">
                Dueño: {patient.propietor}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={state === "pagado" ? "outline" : "destructive"}
            className="capitalize cursor-pointer"
            onClick={() =>
              handleChangeState(state === "no pagado" ? "pagado" : "no pagado")
            }
          >
            {state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-6 pt-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate(date)}
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            {formattedTime(date)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Tipo de servicio</span>
            <span className="text-sm">{name}</span>
          </div>
          {name === "vacunacion" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Producto</span>
                <span className="text-sm">{product?.name}</span>
              </div>
            </>
          )}
          {name === "hospitalizacion" && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Días</span>
                <span className="text-sm">{days}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tipo</span>
                <span className="text-sm">{type}</span>
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Precio total del servicio</span>
            <span className="text-sm font-semibold text-primary">
              {formatMoney(price)}
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <PawPrintIcon className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
