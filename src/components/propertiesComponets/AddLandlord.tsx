import { FieldGroup, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";
import Submitbtn from "../ui/submitbtn";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import type { LandlordFormValues, LandlordType } from "./types/PropertyTypes";
import axios from "@/lib/axios";
import { apiRequest } from "@/lib/apirequest";
import { toast } from "sonner";


interface AddLandLordProps {
    initialData?: LandlordType | null
}


export default function AddLandlord({ initialData }: AddLandLordProps) {
    const isEditMode = Boolean(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            name: isEditMode ? initialData?.name : "",
            email: isEditMode ? initialData?.email : "",
            number: isEditMode ? initialData?.number : "",
            additional_data: isEditMode ? initialData?.additional_data : { landlord_type: '' as string }
        },

        onSubmit: async ({ value }) => {
            await handleAddLandlord(value)

        }

    })

<<<<<<< HEAD
    const handleAddLandlord = async(value:LandlordFormValues)=> {
            setLoading(true)
            const url = isEditMode ? `/api/user/${initialData.id}` : '/api/landlord';
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
                toast(data.message,{position:'top-center'})
                form.reset()
                console.log(data);
            }            
=======
    const handleAddLandlord = async (value: LandlordFormValues) => {
        setLoading(true)
        const url = isEditMode ? `/api/user/${initialData.id}` : '/api/landlord';
        const method = isEditMode ? 'patch' : 'post';
        const { data, error } = await apiRequest(() =>
            axios[method](url, value)
        )
        if (error) {
            setLoading(false)
            setError(error)
            console.log(error)
        }
        if (data) {
            setLoading(false);
            form.reset()
            toast(data.message, { position: 'top-center' });
            console.log(data);
        }
>>>>>>> cbcf0d100ff5eac7836dedc6cb445c55d3235576
    }

    const types: Array<string> = ["individual", "company"]
    return (
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

                <FieldGroup>
                    <form.Field
                        name="additional_data.landlord_type"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <>
                                    <RadioGroup
                                        value={field.state.value as string}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                                        onValueChange={(value) => {
                                            field.handleChange(value)
                                            console.log(value)
                                        }}
                                    >
                                        {types.map((item) => {
                                            const isSelected = item === field.state.value
                                            return (
                                                <div
                                                    key={item}
                                                    className={cn("border-input relative bg-white flex flex-col gap-2 rounded-md border p-4 shadow-xs outline-none", isSelected && 'border-blue-600 bg-blue-50')}
                                                >
                                                    <div className="flex justify-between">
                                                        <RadioGroupItem
                                                            id={item}
                                                            value={item}
                                                            className="order-1 after:absolute after:inset-0"
                                                        />
                                                        <FieldLabel
                                                            htmlFor={item}
                                                            className="block text-sm font-medium text-foreground"
                                                        >
                                                            {item}
                                                        </FieldLabel>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </RadioGroup>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </>
                            )
                        }}

                    />


                    <form.Field
                        name="name"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <div>
                                    <FieldLabel htmlFor={field.name}>Landlord Name</FieldLabel>
                                    <Input
                                        type="text"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        className="bg-white"
                                        placeholder="e.g John Doe"
                                    />
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </div>
                            )
                        }}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 py-4">
                        <div className="col-span-full sm:col-span-3">
                            <form.Field
                                name="number"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <div>
                                            <FieldLabel htmlFor={field.name}>Landlord Phone Number</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                className="bg-white"
                                                placeholder="e.g 070000"
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <form.Field
                                name="email"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <div>
                                            <FieldLabel htmlFor={field.name}>Landlord Email Address</FieldLabel>
                                            <Input
                                                type="email"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                className="bg-white"
                                                placeholder="e.g johndoe@gmail.com"
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </FieldGroup>
                <br />
                <Submitbtn text="Add Landlord" fullwidth={true} type="submit" loading={loading} />
            </form>
        </>
    )
}