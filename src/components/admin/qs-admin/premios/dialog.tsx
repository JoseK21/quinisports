import FormData from "./form";
import { Plus } from "lucide-react";
import { Prize } from "@/types/prize";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";

interface Props {
  data?: Prize;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  products: Product[];
  idBusiness: string;
  setOpen: (open: boolean) => void;
}

export const FormDialog = ({ open, setOpen, data, isEdition, products, idBusiness, isShowing = false }: Props) => {
  if (isShowing) {
    const { name } = data || ({} as Prize);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Premio</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
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
        <FormData setOpen={setOpen} isEdition={isEdition} data={data} products={products} idBusiness={idBusiness} />
      </DialogContent>
    </Dialog>
  );
};
