import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddHistory } from "@/types/HistoryTypes";
import Error from "../Error";

export default function ModalAddHistorie() {
  const isModalAddHistorie = useVeterinarieStore(
    (state) => state.isModalAddHistorie
  );
  const setModalAddHistorie = useVeterinarieStore(
    (state) => state.setModalAddHistorie
  );
  const idPatient = useVeterinarieStore((state) => state.idPatient);
  const searchPatientById = useVeterinarieStore(
    (state) => state.searchPatientById
  );
  const createHistory = useVeterinarieStore((state) => state.createHistory);
  const patient = useVeterinarieStore((state) => state.patient);
  //--
  useEffect(() => {
    searchPatientById();
  }, [idPatient]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddHistory>();

  const { name, telephone, propietor, typePet } = patient;

  const handleHistory = async (data: AddHistory) => {
    const historyObject = { patient: patient._id, history: data.history };
    await createHistory(historyObject);
    reset();
  };
  return (
    <>
      <Dialog
        open={isModalAddHistorie}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {
          setModalAddHistorie(false);
          reset();
        }}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleHistory)}
            className=" flex min-h-full items-center justify-center p-4"
          >
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-xl  border p-6 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <section className="flex justify-between px-5 items-center gap-8">
                <article className="bg-violet-500 w-full  rounded-md p-2 px-6 bg-cover">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 text-center font-semibold text-white mb-9"
                  >
                    Agrega una historia clínica al paciente
                  </DialogTitle>

                  <div className="mb-4 rounded-lg bg-violet-400 p-1 px-3 flex items-center justify-between">
                    <div>
                      <p className=" text-zinc-300 font-medium text-xs">
                        Paciente
                      </p>
                      <p className="text-[15px] text-white">{name}</p>
                    </div>
                    <img src={"/typePet.svg"} width={16} />
                  </div>

                  <div className="mb-4 rounded-lg bg-violet-400 p-1 px-3 flex items-center justify-between">
                    <div>
                      <p className=" text-zinc-300 font-medium text-[12px]">
                        Propietario
                      </p>
                      <p className="text-[15px] text-white">{propietor}</p>
                    </div>
                    <img src={"/person.svg"} width={16} />
                  </div>

                  <div className="mb-4 rounded-lg bg-violet-400 p-1 px-3 flex items-center justify-between">
                    <div>
                      <p className=" text-zinc-300 font-medium text-[12px]">
                        Teléfono
                      </p>
                      <p className="text-[15px] text-white">{telephone}</p>
                    </div>
                    <img src={"/telephone.svg"} width={16} />
                  </div>

                  <div className="mb-4 rounded-lg bg-violet-400 p-1 px-3 flex items-center justify-between">
                    <div>
                      <p className=" text-zinc-300 font-medium text-[12px]">
                        Tipo de animal
                      </p>
                      <p className="text-[15px] text-white">{typePet}</p>
                    </div>
                    <img src={"/typePet.svg"} width={16} />
                  </div>

                </article>

                <article className=" flex flex-col items-center">
                  <p className="mb-2">Escribe la nueva historia clínica</p>
                  <textarea
                    className=" border rounded-md h-[150px] outline-none p-2 w-[380px]"
                    {...register("history", {
                      required: "Este campo no puede ir vacío",
                    })}
                  ></textarea>
                  {errors.history && (
                    <Error message={errors.history.message as string} />
                  )}
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      type="submit"
                      onClick={close}
                    >
                      Crear historia
                    </Button>
                  </div>
                </article>
              </section>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </>
  );
}
