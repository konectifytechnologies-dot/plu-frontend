import type { Tenant } from "./types/PropertyTypes"
import { abbreviateNameInitials } from "@/lib/utilFunctions"
import Addnew from "../ui/add-new"
import AddTenant from "./AddTenant"
import { IconTrash } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "@/lib/axios"
import { apiRequest } from "@/lib/apirequest"
import { toast } from "sonner"
import { Item,
  ItemContent,
  ItemMedia,
  ItemTitle, } from "../ui/item"
import { Spinner } from "../ui/spinner"

interface TenantProps {
    tenant:Tenant
}
export default function TenantCard({tenant}){
    const {name, user_id, house, house_number,number} = tenant
    return(
        <>
            <div className="bg-white border rounded-2xl py-2 px-4 flex flex-col md:flex-row items-center justify-between">
                <button className="flex items-center gap-2">
                    <div className="bg-purple-200 font-medium text-slate-900 rounded-full w-18 h-18 grid place-items-center ">
                        <span className="font-semibold">{abbreviateNameInitials(name)}</span>
                    </div>
                    <div className="flex-1 text-left min-w-0 space-y-0.5">
                        <p className="text-sm font-medium truncate">{name}</p>
                        <p className="text-sm font-medium">Property: {house}</p>
                        <span className="text-sm font-semibold">House: {house_number} </span>
                    </div> 
                </button>
                <div className="flex items-center gap-2">
                    <Addnew 
                        label="Edit Tenant"
                        title="Edit Tenant"
                        description="Edit This Tenant"
                        fullwidth={false}
                    >
                        <AddTenant initialData={tenant} />
                    </Addnew>
                   <VacateTenant id={user_id} />
                </div>
            </div>
        </>
    )
}

const VacateTenant = ({id})=> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleVacate = async()=> {
        setLoading(true)
        const url = `/api/vacate/tenant/${id}`
        const {data,error} = await apiRequest(()=> 
            axios.delete(url)
        )  
        console.log(data,error)
        if(error){
            setLoading(false)
            setError(error)
            console.log(error)
        }
        if(data){
            console.log(data);
            setLoading(false);
            setError(null)
            toast(data.message,{position:'top-center'})
        }         
    }

    return(
        <>
            {loading && (
                <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
                    <Item variant="muted">
                        <ItemMedia><Spinner /></ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">Loading...</ItemTitle>
                        </ItemContent>
                    </Item>
                </div>
            )}
            {!loading && <Button className="cursor-pointer" onClick={handleVacate}><IconTrash /> Vacate Tenant</Button>}
        </>
    )
}