import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from "@/lib/axios";
import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-form";
import { Field, FieldLabel } from "../ui/field";
import Dropdown from "../ui/dropdown";
import { useGetProperties } from "@/hooks/useGetProperties";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TenantsDropdown from "../propertiesComponets/TenantsDropdown";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MonthPicker } from "../ui/month-picker";
import Submitbtn from "../ui/submitbtn";
import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/apirequest";
export default function EditPayment({ payment }) {
    const { properties } = useGetProperties();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const form = useForm({
        defaultValues: {
            user_id: payment.user_id,
            user: payment.user,
            tenancy_id: payment.tenancy_id,
            property_id: payment.property_id,
            property: payment.property,
            amount_due: payment.amount_due,
            amount_paid: payment.amount_paid,
            payment_method: payment.payment_method,
            reference_code: payment.reference_code,
            description: payment.description,
            date: payment.date
        },
        onSubmit: async ({ value }) => {
            await handleEditPayment(value);
        }
    });
    const propItems = properties && properties.data.map((prop) => {
        return { name: prop.name, id: prop.id };
    });
    const property = useStore(form.store, (state) => state.values.property_id);
    const { data: tenants, isLoading } = useQuery({
        queryKey: ['PROPERTY_TENANTS', { id: property ? property.id : null }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/tenants/${property ? property.id : null}`);
            return data;
        },
        enabled: !!property
    });
    const handleEditPayment = async (value) => {
        setLoading(true);
        const url = `/api/payment/${payment.id}`;
        const { data, error } = await apiRequest(() => axios.patch(url, value));
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            console.log(data);
            setLoading(false);
            setError(null);
            toast(data.message, { position: 'top-center' });
            const query = ['PAYMENTS', { page: 1, month: payment.date, year: payment.year, query: null }];
            queryClient.invalidateQueries(query);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: (e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }, children: [_jsx(form.Field, { name: "property", children: (field) => {
                        return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Property" }), _jsx(Dropdown, { items: propItems, placeholder: "Select Property", value: field.state.value, handleChange: (item) => {
                                        field.handleChange(item.name);
                                        form.setFieldValue("property_id", item.id);
                                    } })] }));
                    } }), _jsx("br", {}), tenants && (_jsx(form.Field, { name: "user", children: (field) => {
                        return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Tenant" }), _jsx(TenantsDropdown, { items: tenants, placeholder: "Select Tenants", value: field.state.value, handleChange: (item) => {
                                        field.handleChange(item.name);
                                        form.setFieldValue('tenancy_id', item.id);
                                        form.setFieldValue('user_id', item.user_id);
                                    } })] }));
                    } })), _jsx("br", {}), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 py-4", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "amount_due", children: (field) => {
                                    return (_jsxs(InputGroup, { className: "max-w-xs", children: [_jsx(InputGroupInput, { type: "number", value: field.state.value, readOnly: true }), _jsx(InputGroupAddon, { children: "Kes" })] }));
                                } }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "amount_paid", children: (field) => {
                                    return (_jsxs(InputGroup, { className: "max-w-xs", children: [_jsx(InputGroupInput, { type: "number", value: field.state.value, onChange: (e) => field.handleChange(e.target.valueAsNumber) }), _jsx(InputGroupAddon, { children: "Kes" })] }));
                                } }) })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 py-4", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "payment_method", children: (field) => {
                                    return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Payment Method" }), _jsx(Input, { id: field.name, name: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value) })] }));
                                } }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: _jsx(form.Field, { name: "reference_code", children: (field) => {
                                    return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Payment Reference Code" }), _jsx(Input, { id: field.name, name: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value) })] }));
                                } }) })] }), _jsx("br", {}), _jsx(form.Field, { name: "description", children: (field) => {
                        return (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Paid For" }), _jsx(Textarea, { name: field.name, id: field.name, value: field.state.value, onChange: (e) => field.handleChange(e.target.value) })] }));
                    } }), _jsx(form.Field, { name: "date", children: (field) => {
                        return (_jsxs("div", { className: "py-2", children: [_jsx("label", { children: "Select Payment Month" }), _jsx(MonthPicker, { value: field.state.value, onChange: (value) => field.handleChange(value) })] }));
                    } }), _jsx("br", {}), _jsx(Submitbtn, { text: "Save Changes", type: "submit", fullwidth: true, loading: loading })] }) }));
}
