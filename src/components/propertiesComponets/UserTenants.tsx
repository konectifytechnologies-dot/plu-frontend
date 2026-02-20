import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../ui/skeleton";
import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { InputGroup,
  InputGroupAddon,
  InputGroupInput } from "../ui/input-group";
import { useState } from "react";
import { Search } from "lucide-react"
import type { Tenant } from "./types/PropertyTypes";
import ListPagination from "../ui/list-pagination";
import TenantCard from "./TenantCard";
import { Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,  } from "../ui/empty";
import Addnew from "../ui/add-new";
import AddTenant from "./AddTenant";
import { IconFolderCode } from "@tabler/icons-react"



export default function UserTenants(){
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('')

    const {data:tenants, isLoading} = useQuery({
        queryKey:['USER_TENANTS', {page, query}],
        queryFn:async()=> {
            const {data} = await axios.get(`/api/tenants?query=${query}&page=${page}`);
            return data;
        }
    })
    
    const hasPagination = tenants?.meta.last_page > 1;
    const isEmpty = tenants?.data.length < 1;

    return( 
        <>
            <Card className="@container/card">
                <CardHeader>
                    <InputGroup className="max-w-xs">
                        <InputGroupInput placeholder="Search Properties" value={query} onChange={(e)=> setQuery(e.target.value)} />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">{tenants?.meta.total} Results</InputGroupAddon>
                    </InputGroup>
                </CardHeader>
                <CardContent>
                        {isLoading && (
                            <>
                                {Array(3)
                                    .fill(0)
                                    .map((_, index) => (
                                    <div key={index} className="flex w-fit items-center gap-4">
                                        <Skeleton className="size-10 shrink-0 rounded-full" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-37.5" />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {tenants && (
                           <>
                            {isEmpty ? 
                                <>
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                        <IconFolderCode />
                                        </EmptyMedia>
                                        <EmptyTitle>No Tenants Yet</EmptyTitle>
                                        <EmptyDescription>
                                        You haven&apos;t added any tenants to this property. Get started by creating
                                        your first tenant.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent className="flex-row justify-center gap-2">
                                        <Addnew 
                                            label="Add Tenant"
                                            title="Add new Tenant"
                                            description="Add a new Tenant to this property"
                                            fullwidth={false}
                                        >
                                            <AddTenant initialData={null} />
                                        </Addnew>
                                    </EmptyContent>
                                </Empty>
                                </> 
                                : 
                                <div className="grid grid-cols-1 gap-2">
                                    {tenants.data.map((tenant:Tenant)=> (<TenantCard key={tenant.id} tenant={tenant} />))}
                                </div>
                            }
                           </>
                        )}
                {tenants && hasPagination && <ListPagination value={page} totalPages={tenants.meta.last_page} onChange={setPage} />}
                </CardContent>
        </Card>
        </> 
    )
}