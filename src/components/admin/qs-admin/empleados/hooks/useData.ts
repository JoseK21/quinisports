import { USER_STATUS } from "@/app/constants";
import { useFetchData } from "@/hooks/useFetchData";
import { getApi } from "@/lib/api";
import { useAdminsStore } from "@/store/adminsStore";
import { User } from "@/types/user";
import { useState } from "react";

const useData = () => {
  const { setData, setError } = useAdminsStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const newData = await getApi("api/employee");
      const data: User[] = newData?.data || [];

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { isLoaded };
};

export default useData;