import { useForm } from "@tanstack/react-form"
import axios from "@/lib/axios"
import { apiRequest } from "@/lib/apirequest"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import Submitbtn from "../ui/submitbtn"
import { useParams } from "@tanstack/react-router"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

type Cost = {
    id:string,
    title:string,
    cost:number,
    property_id:string
}

interface CostProps {
    initialData:Cost | null
}
export default function AddCost({initialData}:CostProps){
    const isEditMode = Boolean(initialData)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const btntext = isEditMode ? 'Save Changes' : 'Add Cost'

    const {id} = useParams({strict:false})
    const form = useForm({
        defaultValues: {
            title:'',
            cost:null,
        },

        onSubmit: async({value})=> {
            await handleAddCost(value)
        }
    })

    useEffect(()=> {
        if(isEditMode && initialData){
            form.reset({
                title:initialData.title,
                cost:initialData.cost
            })
        }
    },[isEditMode, initialData])

    const handleAddCost = async(value) => {
        setLoading(true)
        const url = isEditMode ? `/api/property/cost/${initialData.id}` : `/api/property/cost/${id}`;
            const method = isEditMode ? 'patch' : 'post';
            const {data,error} = await apiRequest(()=> 
                axios[method](url, value)
            )  
            if(error){
                setLoading(false)
                setError(error)
                console.log(error)
            }
            if(data){
                setLoading(false);
                !isEditMode && form.reset()
                toast(data.message,{position:'top-center'})
            } 
        
    }
    return(
        <>
            {error && (
                <Alert variant="destructive" className="max-w-md">
                    <AlertCircleIcon />
                    <AlertTitle>Login failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <form.Field 
                    name="title"
                    children={(field)=> {
                        return(
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input 
                                    name={field.name}
                                    id={field.name}
                                    className="bg-white"
                                    placeholder="E.g Service Charge, Garbage collection etc"
                                    value={field.state.value}
                                    onChange={(e)=> field.handleChange(e.target.value)}
                                />
                            </Field>
                        )
                    }}
                />
                <br />
                <form.Field 
                 name="cost"
                 children={(field)=> {
                    return(
                        <InputGroup className="bg-white">
                            <InputGroupInput 
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value}
                                onChange={(e)=> field.handleChange(e.target.valueAsNumber)}
                             />
                            <InputGroupAddon>
                                <span>Kes</span>
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">Per Month</InputGroupAddon>
                        </InputGroup>
                    )
                 }}     
                />
                <br />
                <Submitbtn text={btntext} type="submit" loading={loading} fullwidth={true} />
            </form>
        </>
    )
}