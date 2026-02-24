import axios from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import ListPagination from "../ui/list-pagination";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { apiRequest } from "@/lib/apirequest";
import {   Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from "../ui/select";
import { Item,
  ItemContent,
  ItemMedia,
  ItemTitle, } from "../ui/item";
import { Spinner } from "../ui/spinner";

type UpdateStatusProps = {
  id: string
  page:number
}
export default function RepairsList(){
const [page, setPage] = useState(1);
const [status, setStatus] = useState('')
const {data:repairs, isLoading} = useQuery({
    queryKey:['REPAIRS', {page, status}],
    queryFn: async()=> {
        const {data}= await axios.get(`/api/repairs?page=${page}&status=${status}`)
        return data
    }
  })
  
  const hasPagination = repairs?.meta.last_page > 1;

    return(
        <>
            <div className="rounded-lg border my-4">
                        <div className="p-4">
                            <Select onValueChange={(value)=> setStatus(value)}>
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Sort by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Sorty By Status</SelectLabel>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Table>
                            <TableHeader>
                                 <TableRow>
                                    <TableHead>Property</TableHead>
                                    <TableHead>House</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Labor Cost</TableHead>
                                    <TableHead>Total Repair Cost</TableHead>
                                    <TableHead>Created Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                 </TableRow>
                            </TableHeader>
                            {isLoading && (
                                <TableBody>
                                     {Array(6)
                                        .fill(0)
                                        .map((_, index) => (
                                            <TableRow key={index}> 
                                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-37.5" /></TableCell>
                                            </TableRow>

                                     ))}
                                </TableBody>
                            )}
                            {repairs && <TableBody>
                                {repairs.data.map((item)=> (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.property}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                                        <TableCell>Kes {item.repair_cost}</TableCell>
                                        <TableCell>Kes {item.total_cost}</TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell><UpdateStatus id={item.id}  page={page} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}
                        </Table>    
                     {repairs && hasPagination && <ListPagination value={page} totalPages={repairs.meta.last_page} onChange={setPage} />}           
                 </div>
        </>
    )
}

function getStatusBadge(status) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20">
          Pending
        </Badge>
      );
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20">
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="border-0 bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

const UpdateStatus = ({id, page}:UpdateStatusProps) => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false);

    const handleAddUnit = async(status) => {
        setLoading(true)
        const url = `/api/repair/status/${id}`
        const {data,error} = await apiRequest(()=> 
            axios.patch(url, {status})
        )  
        console.log(data, error);
        if(error){
            setLoading(false)
            console.log(error)
        }
        if(data){
            setLoading(false);
            toast(data.message,{position:'top-center'})
            queryClient.invalidateQueries({queryKey:['REPAIRS', {page, status:''}]})
        } 
    }
    return(
        <>
        {loading && (
            <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
                <Item variant="muted">
                    <ItemMedia><Spinner /></ItemMedia>
                    <ItemContent>
                    <ItemTitle className="line-clamp-1">Updating...</ItemTitle>
                    </ItemContent>
                </Item>
            </div>
        )}
        {!loading && <Select onValueChange={(value:string) => handleAddUnit(value)}>
            <SelectTrigger className="w-full max-w-48 cursor-pointer">
                <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>}
        </>
    )
}