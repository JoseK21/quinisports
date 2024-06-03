import { useFetchData } from "@/hooks/useFetchData";
import { getApi } from "@/lib/api";
import { useBusinessStore } from "@/store/qs-admin";
import { Business } from "@/types/business";
import { useState } from "react";

const useBusinessInfoData = (slug: string) => {
  const { business, setData, setError } = useBusinessStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useFetchData(async () => {
    setIsLoaded(false);

    try {
      const id = slug.split("-").pop()
      const newData = await getApi(`api/business/full-info/${id}`);
      const data: Business = newData?.data || {};

      console.log("🚀 >>  useFetchData >>  data:", data);

      setData(data);
    } catch (error: any) {
      setError(error);
    }

    setIsLoaded(true);
  });

  return { business, isLoaded };
};

export default useBusinessInfoData;
