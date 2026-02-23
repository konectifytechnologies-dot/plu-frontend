import { useQuery, queryOptions } from "@tanstack/react-query";
import axios from "@/lib/axios";
export function useGetPropertyUnits(id) {
    if (!id) {
        return {
            units: null,
            isLoading: false,
            isError: false
        };
    }
    const propertyUnitQueryOptions = queryOptions({
        queryKey: ["PROPERTY_UNITS", { id }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/units/${id}`);
            return data;
        },
        enabled: !!id
    });
    const query = useQuery(propertyUnitQueryOptions);
    return {
        units: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    };
}
