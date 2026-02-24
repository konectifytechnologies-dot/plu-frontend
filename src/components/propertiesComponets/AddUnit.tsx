import { useForm } from "@tanstack/react-form"
import type { Property, UnitFormValues, UnitType } from "./types/PropertyTypes"
import { useQuery } from "@tanstack/react-query"
import Dropdown from "../ui/dropdown"
import { Field, FieldLabel, FieldError } from "../ui/field"
import { unitSchema } from "@/schemas"
import { Input } from "../ui/input"
import axios from "@/lib/axios"
import Submitbtn from "../ui/submitbtn"
import { Separator } from "../ui/separator"
import { useParams } from "@tanstack/react-router"
import { apiRequest } from "@/lib/apirequest"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner"


interface UnitProps {
    initialData: UnitType | null
}
export default function AddUnit({ initialData }: UnitProps) {
    const isEditMode = Boolean(initialData)
    const { id } = useParams({ strict: false });
    const propertyIdIsPresent = Boolean(id);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null >(null);
    const btn_text = isEditMode ? 'Save Changes' : 'Add Unit';

    const { data: properties } = useQuery({
        queryKey: ['USER_PROPERTIES'],
        queryFn: async () => {
            const { data } = await axios.get('/api/properties')
            return data;
        }
    })

    const items = properties && properties.data.map((prop: Property) => {
        return { name: prop.name, id: prop.id }
    })

    const form = useForm({
        defaultValues: {
            name: '',
            bedrooms: 0,
            rent: 0,
            property_id: id || '',
            property: ''
        },
        validators: {
            onSubmit: unitSchema
        },
        onSubmit: async ({ value }) => {
            await handleAddUnit(value)
        }

    })

    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                name: initialData.name,
                bedrooms: initialData.bedrooms || 0,
                rent: initialData.rent || 0,
                property_id: initialData.property_id,
                property: initialData.property
            })
        }
    }, [isEditMode, initialData])

    const handleAddUnit = async (value: UnitFormValues) => {
        setLoading(true)
        const url = isEditMode ? `/api/unit/${initialData?.id}` : '/api/unit';
        const method = isEditMode ? 'patch' : 'post';
        const { data, error } = await apiRequest(() =>
            axios[method](url, value)
        )
        console.log(data, error);
        if (error) {
            setLoading(false)
            setError(error)
            console.log(error)
        }
        if (data) {
            setLoading(false);
            !isEditMode && form.reset()
            toast(data.message, { position: 'top-center' })
        }

    }
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
                {!isEditMode && <form.Field
                    name="name"
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field >
                                <FieldLabel>Unit Name</FieldLabel>
                                <Input
                                    name={field.name}
                                    id={field.name}
                                    value={field.state.value as string}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="e.g F1, B1 etc"
                                    className="bg-white"
                                />
                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                            </Field>
                        )
                    }}
                />}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 py-4">
                    <div className="col-span-full sm:col-span-3">
                        <form.Field
                            name="bedrooms"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel>Number of Bedrooms</FieldLabel>
                                        <Input
                                            type="number"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                            className="bg-white"
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <form.Field
                            name="rent"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel>Rent</FieldLabel>
                                        <Input
                                            type="number"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                            className="bg-white"
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}

                        />
                    </div>
                </div>
                {properties && !propertyIdIsPresent && (
                    <form.Field
                        name="property"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field>
                                    <FieldLabel>Select Unit Property</FieldLabel>
                                    <Dropdown
                                        items={items}
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
                )}
                <Separator className="my-3" />
                <Submitbtn text={btn_text} type="submit" loading={loading} fullwidth={true} />
            </form>
        </>
    )
}