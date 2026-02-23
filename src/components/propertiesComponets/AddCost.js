import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "@tanstack/react-form";
import axios from "@/lib/axios";
import { apiRequest } from "@/lib/apirequest";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Submitbtn from "../ui/submitbtn";
import { useParams } from "@tanstack/react-router";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
export default function AddCost({ initialData }) {
    const isEditMode = Boolean(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const btntext = isEditMode ? 'Save Changes' : 'Add Cost';
    const { id } = useParams({ strict: false });
    const form = useForm({
        defaultValues: {
            title: '',
            cost: null,
        },
        onSubmit: async ({ value }) => {
            await handleAddCost(value);
        }
    });
    useEffect(() => {
        if (isEditMode && initialData) {
            form.reset({
                title: initialData.title,
                cost: initialData.cost
            });
        }
    }, [isEditMode, initialData]);
    const handleAddCost = async (value) => {
        setLoading(true);
        const url = isEditMode ? `/api/property/cost/${initialData.id}` : `/api/property/cost/${id}`;
        const method = isEditMode ? 'patch' : 'post';
        const { data, error } = await apiRequest(() => axios[method](url, value));
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
                }, children: [_jsx(form.Field, { name: "title", children: (field) => {
                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Title" }), _jsx(Input, { name: field.name, id: field.name, className: "bg-white", placeholder: "E.g Service Charge, Garbage collection etc", value: field.state.value, onChange: (e) => field.handleChange(e.target.value) })] }));
                        } }), _jsx("br", {}), _jsx(form.Field, { name: "cost", children: (field) => {
                            return (_jsxs(InputGroup, { className: "bg-white", children: [_jsx(InputGroupInput, { type: "number", name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.valueAsNumber) }), _jsx(InputGroupAddon, { children: _jsx("span", { children: "Kes" }) }), _jsx(InputGroupAddon, { align: "inline-end", children: "Per Month" })] }));
                        } }), _jsx("br", {}), _jsx(Submitbtn, { text: btntext, type: "submit", loading: loading, fullwidth: true })] })] }));
}
