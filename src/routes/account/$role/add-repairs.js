import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetProperties } from '@/hooks/useGetProperties';
import { Separator } from '@/components/ui/separator';
import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import Dropdown from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import { useSetState } from '@mantine/hooks';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import Submitbtn from '@/components/ui/submitbtn';
import { apiRequest } from '@/lib/apirequest';
import { toast } from 'sonner';
export const Route = createFileRoute('/account/$role/add-repairs')({
    component: RouteComponent,
});
function RouteComponent() {
    const defaultItems = [
        {
            id: useId(),
            title: '',
            price: 0
        },
        {
            id: useId(),
            title: '',
            price: 0
        },
        {
            id: useId(),
            title: '',
            price: 0
        },
    ];
    const [repairItems, setRepairItems] = useState(defaultItems);
    const [repair, setRepair] = useSetState({
        description: '',
        property_id: null,
        house: '',
        unit_id: null,
        unit: '',
        cost: null,
    });
    const { properties, isLoading } = useGetProperties();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const items = properties && properties.data.map((item) => {
        return { name: item.name, id: item.id };
    });
    const { data: units } = useQuery({
        queryKey: ['PROPERTY_UNITS', { id: repair.property_id }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/units/${repair.property_id}`);
            return data;
        },
        enabled: !!repair.property_id
    });
    const unitItems = units && units.map((item) => {
        return { name: item.name, id: item.id };
    });
    const addrepairs = async () => {
        setLoading(true);
        const params = {
            description: repair.description,
            property_id: repair.property_id,
            unit_id: repair.unit_id,
            cost: repair.cost,
            items: repairItems
        };
        const { data, error } = await apiRequest(() => axios.post('/api/repair', params));
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            setLoading(false);
            setRepair({
                description: '',
                property_id: null,
                house: '',
                unit_id: null,
                unit: '',
                cost: 0,
            });
            toast(data.message, { position: 'top-center' });
        }
        console.log(data);
    };
    return (_jsx(_Fragment, { children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Add a Repair" }), _jsx(CardDescription, { children: "Add a new repair or maintenance job" })] }), _jsx(CardContent, { children: _jsxs("form", { action: "#", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { children: "Description" }), _jsx(Textarea, { value: repair.description, onChange: (e) => setRepair({ description: e.target.value }) })] }), _jsxs("div", { className: "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 py-4", children: [_jsx("div", { className: "col-span-full sm:col-span-3", children: properties && _jsxs(Field, { className: "gap-2", children: [_jsx(FieldLabel, { htmlFor: "first-name", children: " Select Property" }), _jsx(Dropdown, { items: items, value: repair.house, placeholder: "Select Property", handleChange: (item => {
                                                        setRepair({ house: item.name, property_id: item.id });
                                                    }) })] }) }), _jsx("div", { className: "col-span-full sm:col-span-3", children: units && _jsxs(Field, { className: "gap-2", children: [_jsx(FieldLabel, { htmlFor: "first-name", children: " Select House" }), _jsx(Dropdown, { items: unitItems, value: repair.unit, placeholder: "Select Property", handleChange: (item => {
                                                        setRepair({ unit: item.name, unit_id: item.id });
                                                    }) })] }) })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Estimated Repair Cost" }), _jsx(Input, { type: 'number', value: repair.cost, onChange: (e) => setRepair({ cost: e.target.valueAsNumber }) })] }), _jsx(Separator, { className: "my-6" }), _jsx(RepairItems, { setRepairItems: setRepairItems, repairItems: repairItems }), _jsx(Separator, { className: 'my-4' }), _jsx(Submitbtn, { text: "Add Repair", type: "button", fullwidth: true, btnfn: addrepairs, loading: loading })] }) })] }) }));
}
export const RepairItems = ({ repairItems, setRepairItems }) => {
    const item = { id: useId(), title: '', price: 0 };
    const addRepairItem = () => {
        setRepairItems((prev) => [...prev, item]);
    };
    function updateRepairItem(id, field, value) {
        setRepairItems((prev) => prev.map((item) => item.id === id
            ? {
                ...item,
                [field]: field === "price" ? Number(value) || 0 : value,
            }
            : item));
    }
    const removeRepairItem = (id) => {
        setRepairItems((prev) => prev.filter((item) => item.id !== id));
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "", children: [_jsxs("div", { className: "py-2", children: [_jsx("h3", { className: "text-2xl font-sans font-semibold text-foreground dark:text-foreground", children: "Add a Repair Items" }), _jsx("p", { className: "font-sans text-sm text-muted-foreground dark:text-muted-foreground", children: "Add a new repair items" })] }), repairItems.map((item) => {
                        return (_jsxs("div", { className: "grid grid-cols-3 gap-2 items-center py-2", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { className: "text-sm", children: "Item name" }), _jsx(Input, { type: "text", value: item.title, onChange: (e) => updateRepairItem(item.id, "title", e.target.value) })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { className: "text-sm", children: "Item Cost" }), _jsx(Input, { type: "number", value: item.price, onChange: (e) => updateRepairItem(item.id, "price", e.target.value) })] }), _jsxs("div", { children: [_jsx(Label, { children: _jsx("span", { className: "text-white", children: "btn" }) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => removeRepairItem(item.id), children: _jsx(IconTrash, { className: "text-destructive" }) })] })] }));
                    })] }), _jsx("br", {}), _jsxs(Button, { type: "button", onClick: addRepairItem, children: [_jsx(IconPlus, {}), "Add repair Item"] }), _jsx("br", {})] }));
};
