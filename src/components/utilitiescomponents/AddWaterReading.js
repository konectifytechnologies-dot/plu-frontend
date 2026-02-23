import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "@tanstack/react-form";
import { waterReadingSchema } from "@/schemas/water-reading.schema";
import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useGetPropertyUnits } from "@/hooks/useGetPropertyUnits";
import { Field, FieldLabel, FieldContent, FieldTitle, FieldDescription, FieldError } from "../ui/field";
import Dropdown from "../ui/dropdown";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@mantine/hooks";
import Submitbtn from "../ui/submitbtn";
import { Separator } from "../ui/separator";
import axios from "@/lib/axios";
import { apiRequest } from "@/lib/apirequest";
export default function AddWaterReading() {
    const [hasPreviousReading, handlers] = useDisclosure(false);
    const { id } = useParams({ strict: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { units, isLoading } = useGetPropertyUnits(id ? id : null);
    const items = units && units.map((unit) => {
        return { name: unit.name, id: unit.id };
    });
    const form = useForm({
        defaultValues: {
            property_id: id,
            unit_id: '',
            house: '',
            current_reading: null,
            previous_reading: null,
        },
        validators: {
            onSubmit: waterReadingSchema
        },
        onSubmit: async ({ value }) => {
            await handleAddUtility(value);
        }
    });
    const handleAddUtility = async (value) => {
        //const {data} = await axios.post('/api/utility', value)
        const url = '/api/utility';
        const { data, error } = await apiRequest(() => axios.post(url, value));
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            form.reset();
            console.log(data);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: (e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }, children: [_jsx("div", { children: units && _jsx(form.Field, { name: "house", children: (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Unit" }), _jsx(Dropdown, { items: items, placeholder: "Select Property", value: field.state.value, handleChange: (item) => {
                                            field.handleChange(item.name);
                                            form.setFieldValue("unit_id", item.id);
                                        } }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                        } }) }), _jsx("div", { className: "py-2", children: _jsx(form.Field, { name: "current_reading", children: (field) => {
                            return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Current Reading" }), _jsx(Input, { type: "number", inputMode: "numeric", name: field.name, id: field.name, value: field.state.value, onChange: (e) => { field.handleChange(e.target.valueAsNumber); }, className: "bg-white" })] }));
                        } }) }), _jsx("br", {}), _jsxs("label", { htmlFor: "hasPreviousReading", className: cn('border my-4 cursor-pointer flex items-center gap-2 rounded-md py-2 px-2', hasPreviousReading && 'border-blue-600 bg-blue-50'), children: [_jsx(Checkbox, { id: "hasPreviousReading", checked: hasPreviousReading, onCheckedChange: () => handlers.toggle(), name: "toggle-checkbox-2" }), _jsxs("div", { children: [_jsx("h6", { children: "Add Previous Reading" }), _jsx("p", { children: "Add a Previous Reading if this is the first reading" })] })] }), hasPreviousReading && (_jsx(form.Field, { name: "previous_reading", children: (field) => {
                        return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Previous Reading" }), _jsx(Input, { type: "number", name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.valueAsNumber), className: "bg-white" })] }));
                    } })), _jsx(Separator, { className: "my-4" }), _jsx(Submitbtn, { text: "Add Reading", type: "submit", fullwidth: true, loading: loading })] }) }));
}
