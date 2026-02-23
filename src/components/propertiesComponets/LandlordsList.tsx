import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from "../ui/table"
import { useState } from "react"
import { abbreviateNameInitials } from "@/lib/utilFunctions"
import { Skeleton } from "../ui/skeleton"
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { InputGroup,
  InputGroupAddon,
  InputGroupInput, } from "../ui/input-group"
import { Search } from "lucide-react"
import ListPagination from "../ui/list-pagination"


export default function LandlordList(){
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const is_active = false;

    const {data:users, isLoading} = useQuery({
        queryKey:['AGENT_LANDLORDS', {query, page, is_active}],
        queryFn:async()=> {
            const {data} = await axios.get(`/api/landlords?page=${page}&query=${query}&is_active=${is_active}`)
            return data;
        }
    });
    const hasPagination = users?.meta.last_page > 1;
    return(
        <>
            <Card>
                <CardHeader>
                    <InputGroup className="max-w-xs">
                        <InputGroupInput placeholder="Search Landlords" value={query} onChange={(e)=> setQuery(e.target.value)} />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">{users?.meta.total} Results</InputGroupAddon>
                    </InputGroup>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Number</TableHead>
                                <TableHead>Properties</TableHead>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                        {users && (
                            <TableBody>
                                {users.data.map((user)=> (
                                    <TableRow key={user.id} >
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <h6 className="rounded-full bg-purple-100 w-14 h-14 grid place-items-center">
                                                    <span>{abbreviateNameInitials(user.name)}</span>
                                                </h6>
                                                <p>{user.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.number}</TableCell>
                                        <TableCell>{user.properties} Properties Owned</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                    {users && hasPagination && <ListPagination value={page} totalPages={users.last_page} onChange={setPage} />}
                </CardContent>
            </Card>
        </>
    )
}