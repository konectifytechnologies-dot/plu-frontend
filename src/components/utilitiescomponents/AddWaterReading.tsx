import { useForm } from "@tanstack/react-form"
import { useState } from "react"
import { useParams } from "@tanstack/react-router"
import { useGetPropertyUnits } from "@/hooks/useGetPropertyUnits"
import { Field, FieldLabel, FieldError} from "../ui/field"
import Dropdown from "../ui/dropdown"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { cn } from "@/lib/utils"
import { useDisclosure } from "@mantine/hooks"
import Submitbtn from "../ui/submitbtn"
import { Separator } from "../ui/separator"
import axios from "@/lib/axios"
import { apiRequest } from "@/lib/apirequest"
import { toast } from "sonner"

export default function AddWaterReading(){
    const [hasPreviousReading, handlers] = useDisclosure(false)
    const {id} = useParams({strict:false})
    const [loading, setLoading] = useState(false);
    const {units} = useGetPropertyUnits(id ? id : null);
    const items = units && units.map((unit)=> {
        return {name:unit.name, id:unit.id}
    }) 

    const form = useForm({
        defaultValues:{
            property_id:id, 
            unit_id:'',
            house:'',
            current_reading:0,
            previous_reading:0,

        },
        onSubmit: async({value})=> {
            await handleAddUtility(value)
        }
    })

    
    const handleAddUtility = async(value)=> {
        setLoading(true);
        const url = '/api/utility';
        const {data,error} = await apiRequest(()=> 
            axios.post(url, value)
        )  
        console.log(data, error);
        if(error){
            setLoading(false)
            console.log(error)
        }
        if(data){
            setLoading(false);
            form.reset()
            toast(data.message, { position: 'top-center' })
            console.log(data);
        }
        
    }
    return(
        <>
            <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div>
                        {units && <form.Field
                            name="house"
                            children={(field)=> {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return(
                                    <Field>
                                        <FieldLabel>Select Unit</FieldLabel>
                                        <Dropdown
                                            items={items}
                                            placeholder="Select Property"
                                            value={field.state.value}
                                            handleChange={(item:any)=> {
                                                field.handleChange(item.name)
                                                form.setFieldValue("unit_id", item.id)
                                            }}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field> 
                                )
                            }}
                        />}
                </div>
                <div className="py-2">
                    <form.Field 
                        name="current_reading"
                        children={(field)=> {
                            return(
                                <Field>
                                    <FieldLabel>Current Reading</FieldLabel>
                                    <Input 
                                        type="number"
                                        inputMode="numeric"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e)=> {field.handleChange(e.target.valueAsNumber)}}
                                        className="bg-white"
                                    />
                                </Field>
                            )
                        }}
                    />
                </div>
                <br />
                <label htmlFor="hasPreviousReading" className={cn('border my-4 cursor-pointer flex items-center gap-2 rounded-md py-2 px-2', hasPreviousReading && 'border-blue-600 bg-blue-50')}>
                        <Checkbox id="hasPreviousReading" checked={hasPreviousReading} onCheckedChange={()=>handlers.toggle()} name="toggle-checkbox-2" />
                        <div>
                            <h6>Add Previous Reading</h6>
                            <p>
                              Add a Previous Reading if this is the first reading
                            </p>
                        </div>
                </label>
                
                {hasPreviousReading && (
                    <form.Field 
                        name="previous_reading"
                        children={(field)=> {
                            return(
                                <Field>
                                    <FieldLabel>Previous Reading</FieldLabel>
                                    <Input 
                                        type="number"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value as number}
                                        onChange={(e)=> field.handleChange(e.target.valueAsNumber)}
                                        className="bg-white"
                                    />
                                </Field>
                            )
                        }}
                    />
                )}
                <Separator className="my-4" />
                <Submitbtn text="Add Reading" type="submit" fullwidth={true} loading={loading} />
            </form>
        </> 
    )
}