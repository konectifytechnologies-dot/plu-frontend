import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import axios from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";
import type { UnitType } from "./types/PropertyTypes";
import { useState } from "react";
import UnitCard from "./UnitCard";
import Addnew from "../ui/add-new";
import AddUnit from "./AddUnit";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle, 
} from "@/components/ui/empty"
import { IconFolderCode } from "@tabler/icons-react"


export default function UnitsList(){
    const {id} = useParams({strict:false});
    const [ids, setIds] = useState([])
    const {data:units, isLoading} = useQuery({
        queryKey: ['PROPERTY_UNITS', {id}],
        queryFn: async()=> {
            const {data} = await axios.get(`/api/property/units/${id}`)
            return data;
        }
    })
   const isEmpty = units?.length < 1;
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
            {units && (
                <>
                    {isEmpty ? 
                        <>
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                    <IconFolderCode />
                                    </EmptyMedia>
                                    <EmptyTitle>No Units Yet</EmptyTitle>
                                    <EmptyDescription>
                                    You haven&apos;t added any units to this property. Get started by creating
                                    your first unit.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent className="flex-row justify-center gap-2">
                                    <Addnew 
                                        label="Add Unit"
                                        title="Add new Unit"
                                        description="Add a new unit to this property"
                                        fullwidth={false}
                                    >
                                        <AddUnit initialData={null} />
                                    </Addnew>
                                </EmptyContent>
                        </Empty>
                        </>
                        :
                        <div className="grid grid-cols-1 gap-2">
                            {units.map((unit:UnitType)=> {
                                return(<UnitCard key={unit.id} unit={unit}  />)
                            })}
                        </div>
                    }
                </>
            )}
        </>
    )
}