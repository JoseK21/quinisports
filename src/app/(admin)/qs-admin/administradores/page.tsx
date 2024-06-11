import { AdminsHeader } from "@/components/admin/qs-admin/administradores/header/header";
import AdminsTable from "@/components/admin/qs-admin/administradores/table/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <AdminsHeader />
      <Separator />
      <AdminsTable />
    </>
  );
}
