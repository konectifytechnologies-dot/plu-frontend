import { useParams } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Skeleton } from "../ui/skeleton"
import axios from "@/lib/axios";
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
import { YearSelector } from "../ui/year-selector";
import ListPagination from "../ui/list-pagination";



export default function ReadingsList(){
  const {id} = useParams({strict:false})
  const [page, setPage] = useState(1)
  const [month, setMonth] = useState( new Date().toLocaleString("en-US", {month: "long"}))
  const [query, setQuery] = useState('');
  const [year, setYear] = useState(new Date().getFullYear())
  const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

  const {data:readings, isLoading} = useQuery({
    queryKey:['PROPERTY_METER_READINGS', {id, year, page, query, month}],
    queryFn: async()=> {
        const {data}= await axios.get(`/api/property/readings/${id}?year=${year}&month=${month}&page=${page}&query=${query}`)
        return data
    }
  })
  
  const hasPagination = readings?.meta.last_page > 1;

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
                                    <TableHead>House</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Last Month Reading</TableHead>
                                    <TableHead>Current Reading For {`${month}-${year}`}</TableHead>
                                    <TableHead>Units Consumed</TableHead>
                                    <TableHead>Cost</TableHead>
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
                            {readings && <TableBody>
                                {readings.data.map((item)=> (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <h6 className="w-14 h-14 bg-purple-100 rounded-full border grid place-items-center">{item.house}</h6>
                                                <div>
                                                    <p className="font-medium">Current Tenant</p>
                                                    <p className="text-sm">{item.tenant}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.previous_reading}</TableCell>
                                        <TableCell>{item.current_reading}</TableCell>
                                        <TableCell>{item.units_consumed}</TableCell>
                                        <TableCell>Kes {item.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}
                        </Table>    
                     {readings && hasPagination && <ListPagination value={page} totalPages={readings.meta.last_page} onChange={setPage} />}           
                 </div>
            </div>
        </>
    )
}