import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useStore } from "@tanstack/react-form";
import axios from "@/lib/axios";
import Dropdown from "../ui/dropdown";
import { Separator } from "../ui/separator";
import Submitbtn from "../ui/submitbtn";
import { useParams } from "@tanstack/react-router";
import { useGetProperties } from "@/hooks/useGetProperties";
import { apiRequest } from "@/lib/apirequest";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export default function AddTenant({ initialData }) {
    const queryClient = useQueryClient();
    const isEditMode = Boolean(initialData);
    const { id } = useParams({ strict: false });
    const isPropertyIdPresent = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const form = useForm({
        defaultValues: {
            name: isEditMode ? initialData.name : '',
            number: isEditMode ? initialData.number : '',
            email: isEditMode ? initialData.email : null,
            property_id: isEditMode ? initialData.property_id : (isPropertyIdPresent ? id : ''),
            unit_id: isEditMode ? initialData.unit_id : '',
            house: isEditMode ? initialData.house : '',
            house_number: isEditMode ? initialData.house_number : '',
        },
        onSubmit: async ({ value }) => {
            await handleAddTenant(value);
        },
    });
    const property = useStore(form.store, (state) => state.values.property_id);
    useEffect(() => {
        if (id && isPropertyIdPresent) {
            form.setFieldValue('property_id', id);
        }
    }, [id, isPropertyIdPresent]);
    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                name: initialData.name,
                number: initialData.number,
                email: initialData.email,
                property_id: initialData.property_id,
                unit_id: initialData.unit_id,
                house: initialData.house,
                house_number: initialData.house_number
            });
        }
    }, [isEditMode, initialData]);
    const { properties, isLoading, isError } = useGetProperties();
    const { data: units } = useQuery({
        queryKey: ['PROPERTY_UNITS', { id: property }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/units/${property}`);
            return data;
        },
        enabled: !!property
    });
    const propItems = properties && properties.data.map((prop) => {
        return { name: prop.name, id: prop.id };
    });
    const unitItems = units && units.map((unit) => {
        return { name: unit.name, id: unit.id };
    });
    console.log(property);
    const handleAddTenant = async (value) => {
        setLoading(true);
        const url = isEditMode ? `/api/user/${initialData.user_id}` : '/api/tenant';
        const method = isEditMode ? 'patch' : 'post';
        const { data, error } = await apiRequest(() => axios[method](url, value));
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            console.log(data);
            setLoading(false);
            setError(null);
            !isEditMode && form.reset();
            toast(data.message, { position: 'top-center' });
            const query = id ? ['PROPERTY_TENANTS', { id }] : ['USER_TENANTS', { page: 1, query: '' }];
            queryClient.invalidateQueries({ queryKey: query });
        }
    };
    return (_jsxs(_Fragment, { children: [error && (_jsxs(Alert, { variant: "destructive", className: "max-w-md my-2", children: [_jsx(AlertCircleIcon, {}), _jsx(AlertTitle, { children: "Failed" }), _jsx(AlertDescription, { children: error })] })), _jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }, children: [_jsx(form.Field, { name: "name", children: (field) => {
                            return (_jsxs(Field, { className: "gap-2", children: [_jsxs(FieldLabel, { htmlFor: "first-name", children: ["Tenant name", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value), className: "bg-white" })] }));
                        } }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 py-4", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "number", children: (field) => {
                                        return (_jsxs(Field, { className: "gap-2", children: [_jsxs(FieldLabel, { htmlFor: "first-name", children: ["Tenant Phone Number", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value), className: "bg-white" })] }));
                                    } }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "email", children: (field) => {
                                        return (_jsxs(Field, { className: "gap-2", children: [_jsxs(FieldLabel, { htmlFor: "first-name", children: ["Tenant Email Address", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value), className: "bg-white" })] }));
                                    } }) })] }), properties && !isPropertyIdPresent && !isEditMode &&
                        _jsx(form.Field, { name: "house", children: (field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Property" }), _jsx(Dropdown, { items: propItems, placeholder: "Select Property", value: field.state.value, handleChange: (item) => {
                                                field.handleChange(item.name);
                                                form.setFieldValue("property_id", item.id);
                                            } }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                            } }), _jsx("br", {}), units && !isEditMode && _jsx(form.Field, { name: "house_number", children: (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Unit" }), _jsx(Dropdown, { items: unitItems, placeholder: "Select Property", value: field.state.value, handleChange: (item) => {
                                            field.handleChange(item.name);
                                            form.setFieldValue("unit_id", item.id);
                                        } }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                        } }), _jsx(Separator, { className: "my-4" }), _jsx(Submitbtn, { text: "Add Tenant", type: "submit", loading: loading, fullwidth: true })] })] }));
}
