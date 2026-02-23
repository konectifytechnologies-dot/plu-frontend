import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useGetProperties } from "@/hooks/useGetProperties";
import axios from "@/lib/axios";
import Dropdown from "../ui/dropdown";
import { Field, FieldLabel } from "../ui/field";
import TenantsDropdown from "../propertiesComponets/TenantsDropdown";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Submitbtn from "../ui/submitbtn";
import { apiRequest } from "@/lib/apirequest";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { randomId } from "@mantine/hooks";
import { MonthPicker } from "../ui/month-picker";
export default function AddPayment() {
    const { properties } = useGetProperties();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [property, setProperty] = useState(null);
    const [tenancy, setTenancy] = useState(null);
    const [costs, setCosts] = useState(null);
    const [payment_method, setPaymentMethod] = useState('');
    const [month, setMonth] = useState('');
    const propItems = properties && properties.data.map((prop) => {
        return { name: prop.name, id: prop.id };
    });
    const { data: tenants, isLoading } = useQuery({
        queryKey: ['PROPERTY_TENANTS', { id: property ? property.id : null }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/tenants/${property ? property.id : null}`);
            return data;
        },
        enabled: !!property
    });
    useEffect(() => {
        if (tenancy) {
            const items = tenancy.costs.map((cost) => {
                return {
                    cost: cost.cost,
                    id: cost.id,
                    title: cost.title,
                    property_id: cost.property_id,
                    amount_paid: '',
                    description: '',
                    reference_code: '',
                };
            });
            const rent = {
                id: randomId(),
                cost: tenancy.rent,
                title: 'rent',
                property_id: property.id || null,
                amount_paid: '',
                description: '',
                reference_code: '',
            };
            const allCosts = [rent, ...items];
            setCosts(allCosts);
        }
    }, [tenancy]);
    function updateCost(id, field, value) {
        setCosts((prev) => prev.map((item) => item.id === id
            ? {
                ...item,
                [field]: value,
            }
            : item));
    }
    const handleAddPayment = async () => {
        setLoading(true);
        const params = {
            property_id: property.id,
            user_id: tenancy.user_id,
            tenancy_id: tenancy.id,
            payment_method,
            date: month,
            costs,
        };
        const url = `/api/payment`;
        const { data, error } = await apiRequest(() => axios.post(url, params));
        console.log(data, error);
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            setProperty(null);
            setTenancy(null);
            setCosts(null);
            setPaymentMethod(null);
            setMonth(null);
            //!isEditMode && form.reset()
            toast(data.message, { position: 'top-center' });
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Property" }), _jsx(Dropdown, { items: propItems, placeholder: "Select Property", value: property ? property.name : '', handleChange: (item) => setProperty(item) })] }), _jsx("br", {}), tenants && (_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Select Tenant" }), _jsx(TenantsDropdown, { items: tenants, placeholder: "Select Tenants", value: tenancy ? tenancy.name : '', handleChange: (item) => setTenancy(item) })] })), _jsxs("div", { children: [_jsx("label", { children: "Payment Method" }), _jsx(Input, { type: "text", value: payment_method, onChange: (e) => setPaymentMethod(e.target.value) })] }), _jsxs("div", { className: "py-2", children: [_jsx("label", { children: "Select Payment Month" }), _jsx(MonthPicker, { value: month, onChange: (value) => setMonth(value) })] }), _jsx("br", {}), costs && (_jsx("div", { className: "gird grid-cols-1 gap-2", children: costs.map((cost) => (_jsxs("div", { className: "border-b py-2", children: [_jsx("h6", { className: "uppercase", children: cost.title }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-6 py-4", children: [_jsxs("div", { className: "col-span-full sm:col-span-3", children: [_jsx("label", { children: "Payment For" }), _jsx(Input, { type: "text", readOnly: true, value: cost.title })] }), _jsxs("div", { className: "col-span-full sm:col-span-3", children: [_jsx("label", { children: "Amount Paid" }), _jsx(Input, { type: "number", value: cost.amount_paid, onChange: (e) => updateCost(cost.id, 'amount_paid', e.target.valueAsNumber) })] })] }), _jsxs("div", { children: [_jsx("label", { children: "Reference Code" }), _jsx(Input, { type: "text", value: cost.reference_code, onChange: (e) => updateCost(cost.id, 'reference_code', e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { children: "Description" }), _jsx(Textarea, { value: cost.description, onChange: (e) => updateCost(cost.id, 'description', e.target.value) })] })] }, cost.id))) })), _jsx("br", {}), _jsx(Submitbtn, { text: "Add Payment", type: "button", btnfn: handleAddPayment, fullwidth: true, loading: loading })] }) }));
}
