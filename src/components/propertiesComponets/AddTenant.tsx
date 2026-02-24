import type { Tenant } from "./types/PropertyTypes"
import { useForm } from "@tanstack/react-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { useStore } from "@tanstack/react-form"
import axios from "@/lib/axios"
import Dropdown from "../ui/dropdown"
import { Separator } from "../ui/separator"
import Submitbtn from "../ui/submitbtn"
import { useParams } from "@tanstack/react-router"
import { apiRequest } from "@/lib/apirequest"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query"


interface UnitProps {
    initialData: Tenant | null
}

export default function AddTenant({ initialData }: UnitProps) {
    const queryClient = useQueryClient();
    const isEditMode = Boolean(initialData);
    const { id } = useParams({ strict: false });
    const isPropertyIdPresent = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null >(null)

    const { data: properties } = useQuery({
        queryKey: ['PROPERTIES'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/properties`)
            return data
        },
       
    });

    const form = useForm({
        defaultValues: {
            name: '',
            number: '',
            email: '',
            property_id: id || '',
            unit_id:  '',
            house: '',
            house_number:'',
        },

        onSubmit: async ({ value }) => {
            await handleAddTenant(value)
        },
    })

    const property = useStore(
        form.store,
        (state) => state.values.property_id
    )

    useEffect(() => {
        if (id && isPropertyIdPresent) {
            form.setFieldValue('property_id', id)
        }
    }, [id, isPropertyIdPresent])

    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                name: initialData.name,
                number: initialData.number,
                email: initialData.email || '',
                property_id: initialData.property_id || '',
                unit_id: initialData.unit_id,
                house: initialData.house,
                house_number: initialData.house_number
            })
        }
    }, [isEditMode, initialData])


    const { data: units } = useQuery({
        queryKey: ['PROPERTY_UNITS', { id: property }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/units/${property}`)
            return data
        },
        enabled: !!property
    });
    const propItems = properties && properties.data.map((prop) => {
        return { name: prop.name, id: prop.id }
    })

    const unitItems = units && units.map((unit) => {
        return { name: unit.name, id: unit.id }
    });
    console.log(property);
    const handleAddTenant = async (value) => {
        setLoading(true)
        const url = isEditMode ? `/api/user/${initialData?.user_id}` : '/api/tenant';

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
            console.log(data);
            setLoading(false);
            setError(null)
            !isEditMode && form.reset()
            toast(data.message, { position: 'top-center' })
            const query = id ? ['PROPERTY_TENANTS', { id }] : ['USER_TENANTS', { page: 1, query: '' }]
            queryClient.invalidateQueries({queryKey:query})

        }
    }
    return (
        <>
            {error && (
                <Alert variant="destructive" className="max-w-md my-2">
                    <AlertCircleIcon />
                    <AlertTitle>Failed</AlertTitle>
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
                    name="name"
                    children={(field) => {
                        return (
                            <Field className="gap-2">
                                <FieldLabel htmlFor="first-name">Tenant name<span className="text-red-500">*</span></FieldLabel>
                                <Input
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="bg-white"

                                />
                            </Field>
                        )
                    }}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 py-4">
                    <div className="col-span-full sm:col-span-3">
                        <form.Field
                            name="number"
                            children={(field) => {
                                return (
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="first-name">Tenant Phone Number<span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value as string)}
                                            className="bg-white"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <form.Field
                            name="email"
                            children={(field) => {
                                return (
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="first-name">Tenant Email Address<span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-white"
                                        />

                                    </Field>
                                )
                            }}
                        />
                    </div>
                </div>
                {properties && !isPropertyIdPresent && !isEditMode &&
                    <form.Field
                        name="house"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field>
                                    <FieldLabel>Select Property</FieldLabel>
                                    <Dropdown
                                        items={propItems}
                                        placeholder="Select Property"
                                        value={field.state.value}
                                        handleChange={(item) => {
                                            field.handleChange(item.name)
                                            form.setFieldValue("property_id", item.id)
                                        }}
                                    />
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    />
                }
                <br />
                {units && !isEditMode && <form.Field
                    name="house_number"
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field>
                                <FieldLabel>Select Unit</FieldLabel>
                                <Dropdown
                                    items={unitItems}
                                    placeholder="Select Property"
                                    value={field.state.value}
                                    handleChange={(item) => {
                                        field.handleChange(item.name)
                                        form.setFieldValue("unit_id", item.id)
                                    }}
                                />
                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                            </Field>
                        )
                    }}
                />}
                <Separator className="my-4" />
                <Submitbtn text="Add Tenant" type="submit" loading={loading} fullwidth={true} />
            </form>
        </>
    )
}