import FormData from "./form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prize } from "@/types/prize";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  data?: Prize;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  idBusiness: string | undefined;
  setOpen: (open: boolean) => void;
}

export const FormDialog = ({ open, setOpen, data, isEdition, idBusiness, isShowing = false }: Props) => {
  if (isShowing) {
    const { name, image } = data || ({} as Prize);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Premio</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
            <Avatar
              className={` w-20 h-20 border-neutral-300 rounded-full border overflow-hidden ${
                image ? "" : " text-3xl"
              }`}
            >
              <AvatarImage width={80} height={80} alt={name || ""} src={image ?? ""} className="h-full object-cover" />
              <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
                {(name || "").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
              <span>
                <strong>Nombre:</strong> {name}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEdition && (
        <DialogTrigger asChild>
          <Button className="text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEdition ? "Edición de Premio" : "Nuevo Premio"}</DialogTitle>
        </DialogHeader>
        <FormData setOpen={setOpen} isEdition={isEdition} data={data} />
      </DialogContent>
    </Dialog>
  );
};
