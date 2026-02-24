import { FieldGroup, FieldError, FieldLabel, Field } from "../ui/field"
import { Input } from "../ui/input"
import { useForm } from "@tanstack/react-form"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { ImageSelect } from "../ui/image-select"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Dropdown from "../ui/dropdown"
import Submitbtn from "../ui/submitbtn"
import { Separator } from "../ui/separator"
import { apiRequest } from "@/lib/apirequest"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { IconCalendar } from "@tabler/icons-react"
import { useSearch } from "@tanstack/react-router"
import { Checkbox } from "../ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";


export default function AddProperty(){
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null >(null);
  const selected = useSearch({
    from: '/account/$role/add_property',
    select: (search) => search.property_id,
  })
  const id  = selected === undefined ? null : selected;
  const btntext = id ? 'Save Changes' : 'Add Property';

    const { data: landlords } = useQuery({
        queryKey: ['AGENT_LANDLORDS'],
        queryFn: async () => {
            const { data } = await axios.get('/api/landlords');
            return data;
        }
    });

    const { data: property } = useQuery({
        queryKey: ['PROPERTY', { id }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/${id}`);
            return data;
        },
        enabled: !!id
    })

    const items = landlords && landlords.data.map((item) => {
        return { name: item.name, id: item.id }
    })
    const propertyTypes = [
        {
            id: 1,
            title: "residential",
        },
        {
            id: 2,
            title: "commercial",
        },
        {
            id: 3,
            title: "industrial",
        },
    ];

    const form = useForm({
        defaultValues:{
            picture:'',
            pictureUrl:'',
            name: '',
            units: 0,
            location: '',
            landlord_id: '',
            landlord: '',
            water_cost: 0,
            rent_due_date: 0,
            deposit_required: true,
            property_type: 'residential'
        },

        onSubmit: async ({ value }) => {
            await handleAddProperty(value)

        }
    })

    useEffect(() => {
        if (id && property) {
            form.reset({
                picture: '',
                pictureUrl:property.picture,
                name: property.name,
                units: property.units,
                location: property.location,
                landlord_id: property.landlord_id,
                landlord: property.landlord,
                water_cost: property.water_cost,
                rent_due_date: property.rent_due_date,
                deposit_required: property.deposit_required,
                property_type: property.property_type,
            })
        }
    }, [id, property])


  
    const handleAddProperty = async(value)=> {
        setLoading(true);
        const formData = new FormData()
        for (const key in value) {
            const field = value[key]

            if (field instanceof File) {
            formData.append(key, field)
            } else if (field !== null && field !== undefined) {
            formData.append(key, String(field))
            }
        }
        const url =  id ? `/api/property/${id}` : '/api/property';
        const {data,error} = await apiRequest(()=> 
            axios.post(url, formData)
        )  
        if(error){
            setLoading(false)
            setError(error)
            console.log(error)
        }
        if (data) {
            setLoading(false);
            !id && form.reset()
            id && queryClient.invalidateQueries({queryKey:['PROPERTY', {id}]})
            toast(data.message, {position:'top-center'})
        }       
    }

    return (
        <>
            <form
                //action="" 
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}

            >
                 {error && (
                    <Alert variant="destructive" className="max-w-md">
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <FieldGroup>
                    <Field>
                        <FieldLabel>Property Picture</FieldLabel>
                        <form.Field
                            name="pictureUrl"
                            children={(field)=> {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return(
                                    <>
                                    <ImageSelect 
                                        value={field.state.value}
                                        handleChange={(file)=> form.setFieldValue('picture', file)}
                                        onUpload={(value)=> field.handleChange(value)}
                                    />
                                     {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </>
                                )
                            }}
                        />
                    </Field>
                    <div>

                        <form.Field
                            name="name"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel>Property Name</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value as string}
                                            onBlur={field.handleBlur}
                                            className="bg-white"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 ">
                        <div className="col-span-full sm:col-span-3">
                            <form.Field
                                name="units"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel>Number of Units</FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                className="bg-white"
                                                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <form.Field
                                name="water_cost"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field>
                                            <FieldLabel>Water Unit Cost</FieldLabel>
                                            <Input
                                                type="number"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                className="bg-white"
                                                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <form.Field
                            name="location"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel>Location</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value as string}
                                            onBlur={field.handleBlur}
                                            className="bg-white"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 ">
                        <div className="col-span-full sm:col-span-3">
                            {landlords &&
                                <Field>
                                    <FieldLabel>Select Property Landlord</FieldLabel>
                                    <form.Field
                                        name="landlord"
                                        children={(field) => {
                                            return (
                                                <>
                                                    <Dropdown
                                                        items={items}
                                                        value={field.state.value}
                                                        placeholder="Select Landlord"
                                                        handleChange={(item) => {
                                                            field.handleChange(item.name)
                                                            form.setFieldValue("landlord_id", item.id)
                                                        }}
                                                    />
                                                   
                                                </>
                                            )
                                        }}
                                    />

                                </Field>
                            }
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <form.Field
                                name="rent_due_date"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel>Rent Due Date (When is rent due every month)</FieldLabel>
                                            <InputGroup>
                                                <InputGroupInput
                                                    type="number"
                                                    name={field.name}
                                                    id={field.name}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                                    placeholder="e.g 5"
                                                />
                                                <InputGroupAddon>
                                                    <IconCalendar />
                                                </InputGroupAddon>
                                                <InputGroupAddon align="inline-end">{field.state.value}th Of Every Month</InputGroupAddon>
                                            </InputGroup>
                                        </Field>
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <form.Field
                            name="deposit_required"
                            children={(field) => {
                                return (
                                    <label className={cn('flex items-start border rounded-md p-2 gap-4', field.state.value && 'border-blue-600 bg-blue-50')}>
                                        <Checkbox
                                            id="deposit_required"
                                            name={field.name}
                                            checked={field.state.value}
                                            onCheckedChange={(checked) =>
                                                field.handleChange(checked === true)
                                            }
                                        />
                                        <div>
                                            <h6>Deposit Required</h6>
                                            <p>Is a 1 Month deposit required when tenants are moving in</p>
                                        </div>
                                    </label>
                                )
                            }}
                        />

                    </div>
                    <div>
                        <form.Field
                            name="property_type"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field >
                                        <FieldLabel>Property Type</FieldLabel>
                                        <RadioGroup
                                            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
                                            value={field.state.value}
                                            onValueChange={(value) =>
                                                field.handleChange(value)
                                            }
                                        >
                                            {propertyTypes.map((item) => {
                                                const isSelected = item.title === field.state.value
                                                return (
                                                    <div
                                                        key={item.title}
                                                        className={cn("border-input cursor-pointer relative flex flex-col gap-2 rounded-md border p-4 shadow-xs outline-none", isSelected && 'border-blue-600 bg-blue-50')}
                                                    >
                                                        <div className="flex justify-between">
                                                            <RadioGroupItem
                                                                id={item.id.toString()}
                                                                value={item.title}
                                                                className="order-1 after:absolute after:inset-0"
                                                            />

                                                            <FieldLabel
                                                                htmlFor={item.id.toString()}
                                                                className={cn("block text-sm font-medium text-muted-foreground", isSelected && 'text-primary')}
                                                            >
                                                                {item.title}
                                                            </FieldLabel>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </RadioGroup>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        />
                    </div>
                </FieldGroup>
                <Separator className="my-3" />
                <Submitbtn text={btntext} type="submit" fullwidth={true} loading={loading} />
            </form>
        </>
    )
}