import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
  TableHead,
  TableHeader, } from "../ui/table"
import { useParams } from "@tanstack/react-router"
import { Skeleton } from "../ui/skeleton"
import Addnew from "../ui/add-new"
import AddCost from "./AddCost"

export default function PropertyCosts(){
    const {id} = useParams({strict:false})
    const {data:costs, isLoading} = useQuery({
        queryKey: ['PROPERTY_COSTS', {id}],
        queryFn: async()=> {
            const {data} = await axios.get(`/api/property/costs/${id}`)
            return data;
        }
    })
    console.log(costs);
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Edit</TableHead>
                    </TableRow>
                </TableHeader>
                {isLoading && (
                    <TableBody>
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                            <TableRow key={index}> 
                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                )}
                {costs && (
                    <TableBody>
                        {costs.map((cost)=> (
                            <TableRow key={cost.id}>
                                <TableCell>{cost.title}</TableCell>
                                <TableCell>Kes {cost.cost} <small>Per Month</small></TableCell>
                                <TableCell>
                                    <Addnew 
                                        label="Edit Cost"
                                        title="Edit Cost"
                                        description="Edit this additional cost"
                                        fullwidth={false}
                                    >
                                        <AddCost initialData={cost} />
                                    </Addnew>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>

        </>
    )
}