import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetAllHistoryTable(params: any) {
  return useQuery({
    queryKey: ["get-all-table-history", params],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/attendance/`,
        {
          params,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    },
  });
}

export function useGetByIdHistoryTable(id: any) {
  return useQuery({
    queryKey: ["get-by-id-table-history", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/attendance/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.data);
      return data.data;
    },
  });
}

export const useUpdateCheckOut = () => {
  return useMutation({
    mutationKey: ["update-checkout-attendance"],
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await axios.put(
        `http://localhost:4000/api/attendance/${id}/checkout`,
        payload
      );
      return data;
    },
  });
};
