"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { FormDialog } from "./dialog";
import { Sport } from "@/types/sport";
import { useToast } from "@/components/ui/use-toast";
import { useSportsStore } from "@/store/qs-admin";
import { AlertModal } from "@/components/quinisports/general/AlertModal";
import { ActionDropdown } from "@/components/quinisports/general/ActionDropdown";

interface Props {
  data: Sport;
}

export const CellAction: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { sports, setData } = useSportsStore();

  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`sport/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(sports.filter((sport) => sport.id !== id));
    }

    toast({
      duration: 5000,
      variant: "success",
      title: response.isError ? "Deporte no eliminado!" : "Deporte eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el deporte ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <FormDialog data={data} open={openShow} isShowing={true} isEdition={false} setOpen={setOpenShow} />

      <FormDialog isEdition data={data} open={openEdit} isShowing={false} setOpen={setOpenEdit} />

      <AlertModal
        text="Eliminar"
        loading={loading}
        isOpen={openRemove}
        textLoading="Eliminando.."
        onClose={() => setOpenRemove(false)}
        onConfirm={() => onConfirmRemove(data.id)}
        title={`Estas seguro de remove a ${data.name}?`}
        description="Esta acción no se puede deshacer!"
      />

      <ActionDropdown setOpenShow={setOpenShow} setOpenEdit={setOpenEdit} setOpenRemove={setOpenRemove} />
    </>
  );
};
