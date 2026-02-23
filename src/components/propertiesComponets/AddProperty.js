import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldGroup, FieldError, FieldLabel, Field } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { ImageSelect } from "../ui/image-select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Dropdown from "../ui/dropdown";
import Submitbtn from "../ui/submitbtn";
import { Separator } from "../ui/separator";
import { apiRequest } from "@/lib/apirequest";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconCalendar } from "@tabler/icons-react";
import { useSearch } from "@tanstack/react-router";
import { Checkbox } from "../ui/checkbox";
export default function AddProperty() {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { property_id } = useSearch({ strict: false });
    const id = property_id === undefined || property_id === null ? null : property_id;
    const btntext = id ? 'Save Changes' : 'Add Property';
    const { data: landlords, isLoading } = useQuery({
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
    });
    const items = landlords && landlords.data.map((item) => {
        return { name: item.name, id: item.id };
    });
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
        defaultValues: {
            picture: '',
            pictureUrl: '',
            name: '',
            units: null,
            location: '',
            landlord_id: '',
            landlord: '',
            water_cost: null,
            rent_due_date: null,
            deposit_required: true,
            property_type: 'residential'
        },
        onSubmit: async ({ value }) => {
            await handleAddProperty(value);
        }
    });
    useEffect(() => {
        if (id && property) {
            form.reset({
                picture: null,
                pictureUrl: property.picture,
                name: property.name,
                units: property.units,
                location: property.location,
                landlord_id: property.landlord_id,
                landlord: property.landlord,
                water_cost: property.water_cost,
                rent_due_date: property.rent_due_date,
                deposit_required: property.deposit_required,
                property_type: property.property_type,
            });
        }
    }, [id, property]);
    console.log(property);
    const handleAddProperty = async (value) => {
        setLoading(true);
        const url = id ? `/api/property/${id}` : '/api/property';
        const { data, error } = await apiRequest(() => axios.post(url, value));
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            !id && form.reset();
            id && queryClient.invalidateQueries({ queryKey: ['PROPERTY', { id }] });
            toast(data.message, { position: 'top-center' });
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { 
            //action="" 
            onSubmit: (e) => {
                e.preventDefault();
                form.handleSubmit();
            }, children: [_jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Property Picture" }), _jsx(form.Field, { name: "pictureUrl", children: (field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (_jsxs(_Fragment, { children: [_jsx(ImageSelect, { value: field.state.value ?? null, handleChange: (file) => form.setFieldValue('picture', file), onUpload: (value) => field.handleChange(value) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                    } })] }), _jsx("div", { children: _jsx(form.Field, { name: "name", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Property Name" }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, className: "bg-white", onChange: (e) => field.handleChange(e.target.value) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } }) }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 ", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "units", children: (field) => {
                                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Number of Units" }), _jsx(Input, { type: "number", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, className: "bg-white", onChange: (e) => field.handleChange(e.target.valueAsNumber) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                        } }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "water_cost", children: (field) => {
                                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Water Unit Cost" }), _jsx(Input, { type: "number", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, className: "bg-white", onChange: (e) => field.handleChange(e.target.valueAsNumber) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                        } }) })] }), _jsx("div", { children: _jsx(form.Field, { name: "location", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Location" }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, className: "bg-white", onChange: (e) => field.handleChange(e.target.value) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } }) }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 ", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: landlords &&
                                        _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Property Landlord" }), _jsx(form.Field, { name: "landlord", children: (field) => {
                                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                                        return (_jsxs(_Fragment, { children: [_jsx(Dropdown, { items: items, value: field.state.value, placeholder: "Select Landlord", handleChange: (item) => {
                                                                        field.handleChange(item.name);
                                                                        form.setFieldValue("landlord_id", item.id);
                                                                    } }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                                    } })] }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "rent_due_date", children: (field) => {
                                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Rent Due Date (When is rent due every month)" }), _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { type: "number", name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.valueAsNumber), placeholder: "e.g 5" }), _jsx(InputGroupAddon, { children: _jsx(IconCalendar, {}) }), _jsxs(InputGroupAddon, { align: "inline-end", children: [field.state.value, "th Of Every Month"] })] })] }));
                                        } }) })] }), _jsx("div", { children: _jsx(form.Field, { name: "deposit_required", children: (field) => {
                                    return (_jsxs("label", { className: cn('flex items-start border rounded-md p-2 gap-4', field.state.value && 'border-blue-600 bg-blue-50'), children: [_jsx(Checkbox, { id: "deposit_required", name: field.name, checked: field.state.value, onCheckedChange: (checked) => field.handleChange(checked === true) }), _jsxs("div", { children: [_jsx("h6", { children: "Deposit Required" }), _jsx("p", { children: "Is a 1 Month deposit required when tenants are moving in" })] })] }));
                                } }) }), _jsx("div", { children: _jsx(form.Field, { name: "property_type", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Property Type" }), _jsx(RadioGroup, { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", value: field.state.value, onValueChange: (value) => field.handleChange(value), children: propertyTypes.map((item) => {
                                                    const isSelected = item.title === field.state.value;
                                                    return (_jsx("div", { className: cn("border-input cursor-pointer relative flex flex-col gap-2 rounded-md border p-4 shadow-xs outline-none", isSelected && 'border-blue-600 bg-blue-50'), children: _jsxs("div", { className: "flex justify-between", children: [_jsx(RadioGroupItem, { id: item.id.toString(), value: item.title, className: "order-1 after:absolute after:inset-0" }), _jsx(FieldLabel, { htmlFor: item.id.toString(), className: cn("block text-sm font-medium text-muted-foreground", isSelected && 'text-primary'), children: item.title })] }) }, item.title));
                                                }) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } }) })] }), _jsx(Separator, { className: "my-3" }), _jsx(Submitbtn, { text: btntext, type: "submit", fullwidth: true, loading: loading })] }) }));
}
