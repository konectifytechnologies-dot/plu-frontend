import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "../ui/dropdown";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { unitSchema } from "@/schemas";
import { Input } from "../ui/input";
import axios from "@/lib/axios";
import Submitbtn from "../ui/submitbtn";
import { Separator } from "../ui/separator";
import { useParams } from "@tanstack/react-router";
import { apiRequest } from "@/lib/apirequest";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
export default function AddUnit({ initialData }) {
    const isEditMode = Boolean(initialData);
    const { id } = useParams({ strict: false });
    const propertyIdIsPresent = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const btn_text = isEditMode ? 'Save Changes' : 'Add Unit';
    const { data: properties } = useQuery({
        queryKey: ['USER_PROPERTIES'],
        queryFn: async () => {
            const { data } = await axios.get('/api/properties');
            return data;
        }
    });
    const items = properties && properties.data.map((prop) => {
        return { name: prop.name, id: prop.id };
    });
    const form = useForm({
        defaultValues: {
            name: '',
            bedrooms: 0,
            rent: 0,
            property_id: (propertyIdIsPresent ? id : ''),
            property: ''
        },
        validators: {
            onSubmit: unitSchema
        },
        onSubmit: async ({ value }) => {
            await handleAddUnit(value);
        }
    });
    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                name: initialData.name,
                bedrooms: initialData.bedrooms,
                rent: initialData.rent,
                property_id: initialData.property_id,
                property: initialData.property
            });
        }
    }, [isEditMode, initialData]);
    const handleAddUnit = async (value) => {
        setLoading(true);
        const url = isEditMode ? `/api/unit/${initialData.id}` : '/api/unit';
        const method = isEditMode ? 'patch' : 'post';
        const { data, error } = await apiRequest(() => axios[method](url, value));
        console.log(data, error);
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            !isEditMode && form.reset();
            toast(data.message, { position: 'top-center' });
        }
    };
    return (_jsxs(_Fragment, { children: [error && (_jsxs(Alert, { variant: "destructive", className: "max-w-md", children: [_jsx(AlertCircleIcon, {}), _jsx(AlertTitle, { children: "Login failed" }), _jsx(AlertDescription, { children: error })] })), _jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }, children: [!isEditMode && _jsx(form.Field, { name: "name", children: (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Unit Name" }), _jsx(Input, { name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value), onBlur: field.handleBlur, placeholder: "e.g F1, B1 etc", className: "bg-white" }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                        } }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 py-4", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "bedrooms", children: (field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Number of Bedrooms" }), _jsx(Input, { type: "number", name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.valueAsNumber), className: "bg-white" }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                    } }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "rent", children: (field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Rent" }), _jsx(Input, { type: "number", name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.valueAsNumber), className: "bg-white" }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                    } }) })] }), properties && !propertyIdIsPresent && (_jsx(form.Field, { name: "property", children: (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Unit Property" }), _jsx(Dropdown, { items: items, placeholder: "Select Property", value: field.state.value, handleChange: (item) => {
                                            field.handleChange(item.name);
                                            form.setFieldValue("property_id", item.id);
                                        } }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                        } })), _jsx(Separator, { className: "my-3" }), _jsx(Submitbtn, { text: btn_text, type: "submit", loading: loading, fullwidth: true })] })] }));
}
