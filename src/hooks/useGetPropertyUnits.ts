import type { Unit } from "@/schemas";
import { useQuery, queryOptions} from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { UnitType } from "@/components/propertiesComponets/types/PropertyTypes";

export function useGetPropertyUnits(id:string|null){
    if(!id){
        return {
            units:null,
            isLoading:false,
            isError:false
        }
    }
    const propertyUnitQueryOptions = queryOptions({
        queryKey: ["PROPERTY_UNITS", {id}],
        queryFn: async():Promise<UnitType[]> => {
            const {data} = await axios.get<UnitType[]>(`/api/property/units/${id}`) 
            return data;
        },
        enabled:!!id
    })

    const query = useQuery(propertyUnitQueryOptions)

    return{
        units:query.data,
        isLoading:query.isLoading,
        isError: query.isError,
        error:query.error
    } 
}