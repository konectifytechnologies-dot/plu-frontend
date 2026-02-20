import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import type { Tenant } from "./types/PropertyTypes"
import { Skeleton } from "../ui/skeleton";
import axios from "@/lib/axios";
import TenantCard from "./TenantCard";
import AddTenant from "./AddTenant";
import Addnew from "../ui/add-new";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle, 
} from "@/components/ui/empty"
import { IconFolderCode } from "@tabler/icons-react"

export default function TenantList(){
    const {id} = useParams({strict:false});
    const {data:tenants, isLoading} = useQuery({
        queryKey: ['PROPERTY_TENANTS', {id}],
        queryFn: async()=> {
            const {data} = await axios.get(`/api/property/tenants/${id}`)
            return data;
        }
    })
    console.log(tenants)
    const isEmpty = tenants?.length < 1;
    return( 
        <>
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
                        {tenants.map((tenant:Tenant)=> (<TenantCard key={tenant.id} tenant={tenant} />))}
                    </div>
                }
                </>
            )}
        </>
    )
}