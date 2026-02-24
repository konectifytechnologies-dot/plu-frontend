import { useQuery, queryOptions} from "@tanstack/react-query";
import axios from "@/lib/axios";

export function useGetProperties(){
    const propertiesQueryOptions = queryOptions({
        queryKey: ["USER_PROPERTIES"],
        queryFn: async() => {
            const {data} = await axios.get('/api/properties') 
            return data;
        }
    })

    const query = useQuery(propertiesQueryOptions)

    return{
        properties:query.data,
        isLoading:query.isLoading,
        isError: query.isError,
        error:query.error
    }
}