import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FieldGroup, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";
import Submitbtn from "../ui/submitbtn";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import axios from "@/lib/axios";
import { apiRequest } from "@/lib/apirequest";
import { toast } from "sonner";
export default function AddLandlord({ initialData }) {
    const isEditMode = Boolean(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const form = useForm({
        defaultValues: {
            name: isEditMode ? initialData?.name : "",
            email: isEditMode ? initialData?.email : "",
            number: isEditMode ? initialData?.number : "",
            additional_data: isEditMode ? initialData?.additional_data : { landlord_type: '' }
        },
        onSubmit: async ({ value }) => {
            await handleAddLandlord(value);
        }
    });
    const handleAddLandlord = async (value) => {
        setLoading(true);
        const url = isEditMode ? `/api/user/${initialData.id}` : '/api/landlord';
        const method = isEditMode ? 'patch' : 'post';
        const { data, error } = await apiRequest(() => axios[method](url, value));
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            toast(data.message, { position: 'top-center' });
            form.reset();
            console.log(data);
        }
    };
    const types = ["individual", "company"];
    return (_jsxs(_Fragment, { children: [error && (_jsxs(Alert, { variant: "destructive", className: "max-w-md", children: [_jsx(AlertCircleIcon, {}), _jsx(AlertTitle, { children: "Login failed" }), _jsx(AlertDescription, { children: error })] })), _jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }, children: [_jsxs(FieldGroup, { children: [_jsx(form.Field, { name: "additional_data.landlord_type", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs(_Fragment, { children: [_jsx(RadioGroup, { value: field.state.value, className: "grid grid-cols-1 sm:grid-cols-2 gap-5", onValueChange: (value) => {
                                                    field.handleChange(value);
                                                    console.log(value);
                                                }, children: types.map((item) => {
                                                    const isSelected = item === field.state.value;
                                                    return (_jsx("div", { className: cn("border-input relative bg-white flex flex-col gap-2 rounded-md border p-4 shadow-xs outline-none", isSelected && 'border-blue-600 bg-blue-50'), children: _jsxs("div", { className: "flex justify-between", children: [_jsx(RadioGroupItem, { id: item, value: item, className: "order-1 after:absolute after:inset-0" }), _jsx(FieldLabel, { htmlFor: item, className: "block text-sm font-medium text-foreground", children: item })] }) }, item));
                                                }) }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } }), _jsx(form.Field, { name: "name", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs("div", { children: [_jsx(FieldLabel, { htmlFor: field.name, children: "Landlord Name" }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, className: "bg-white", placeholder: "e.g John Doe" }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 py-4", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "number", children: (field) => {
                                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                                return (_jsxs("div", { children: [_jsx(FieldLabel, { htmlFor: field.name, children: "Landlord Phone Number" }), _jsx(Input, { type: "text", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, className: "bg-white", placeholder: "e.g 070000" }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                            } }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "email", children: (field) => {
                                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                                return (_jsxs("div", { children: [_jsx(FieldLabel, { htmlFor: field.name, children: "Landlord Email Address" }), _jsx(Input, { type: "email", id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, className: "bg-white", placeholder: "e.g johndoe@gmail.com" }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                            } }) })] })] }), _jsx("br", {}), _jsx(Submitbtn, { text: "Add Landlord", fullwidth: true, type: "submit", loading: loading })] })] }));
}
