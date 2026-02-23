import axios from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { YearSelector } from "../ui/year-selector"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import ListPagination from "../ui/list-pagination";
import Addnew from "../ui/add-new";
import EditPayment from "./EditPayment";
import { Button } from "../ui/button";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/apirequest";

export default function PaymentList(){
    const [page, setPage] = useState(1)
    const [month, setMonth] = useState('')
    const [query, setQuery] = useState('');
    const [year, setYear] = useState(new Date().getFullYear())
    const MONTHS = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ]

    const {data:payments, isLoading} = useQuery({
        queryKey:['PAYMENTS', {page, month, year, query}],
        queryFn: async()=> {
            const {data} = await axios.get(`/api/payments?page=${page}&query=${query}&year=${year}&month=${month}`)
            return data
        }
    })
    const hasPagination = payments?.meta.last_page > 1;

    return(
        <>
            <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 py-4">
                        <div>
                            <YearSelector 
                                value={year}
                                onChange={setYear}
                            />
                        </div>
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger id="sort" className="">
                                Sort by: <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {MONTHS.map((month)=> (
                                    <SelectItem value={month}>{month}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
       
                        <Input
                            placeholder="Tenant Phone number"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-8 w-full sm:w-64"
                        />
                    </div>
                </div>
                 <div className="rounded-lg border my-4">
                        <Table>
                            <TableHeader>
                                 <TableRow>
                                    <TableHead>Paid By</TableHead>
                                    <TableHead>Paid For</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Payment Reference Code</TableHead>
                                    <TableHead>Payment Type</TableHead>
                                    <TableHead>Amount Due</TableHead>
                                    <TableHead>Amount Paid</TableHead>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Action</TableHead>
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
                            {payments && <TableBody>
                                {payments.data.map((item)=> (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.user}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.payment_method}</TableCell>
                                        <TableCell>{item.reference_code}</TableCell>
                                        <TableCell className="uppercase">{item.payment_type}</TableCell>
                                        <TableCell>Kes {item.amount_due}</TableCell>
                                        <TableCell>Kes {item.amount_paid}</TableCell>
                                        <TableCell>{item.property}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Addnew
                                                    label="Edit Payment"
                                                    title="Edit Payment"
                                                    description="Edit this payment"
                                                    fullwidth={false} 
                                                >
                                                    <EditPayment payment={item} />
                                                </Addnew>
                                                <DeletePayment id={payments.id} month={month} page={page} year={year} query={query} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}
                        </Table>    
                     {payments && hasPagination && <ListPagination value={page} totalPages={payments.meta.last_page} onChange={setPage} />}           
                 </div>
            </div>
        </>
    )
}

const DeletePayment = ({id,month, page, year, query})=> {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient();
    const handleDelete = async()=> {
        setLoading(true)
        const url = `/api/payment/${id}`
        const {data,error} = await apiRequest(()=> 
            axios.delete(url)
        )  
        if(error){
            setLoading(false)
            console.log(error)
        }
        if(data){
            console.log(data);
            setLoading(false);
            toast(data.message,{position:'top-center'})
            queryClient.invalidateQueries(['PAYMENTS', {page, month, year, query}])
            
        } 
    }
    return(
        <Button type="button" variant="destructive" onClick={handleDelete}><IconTrash />Delete</Button>
    )
}