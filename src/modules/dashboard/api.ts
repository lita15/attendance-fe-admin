import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useDashboard(params: any) {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:4000/api/dashboard`, {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data.data;
    },
  });
}
