import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getProperty } from '@/queries/fetchQueries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { IconHomeCheck, IconHomeDollar, IconHomeX } from '@tabler/icons-react';
import Addnew from '@/components/ui/add-new';
import AddUnit from '@/components/propertiesComponets/AddUnit';
import AddTenant from '@/components/propertiesComponets/AddTenant';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { useState } from 'react';
import UnitsList from '@/components/propertiesComponets/UnitList';
import TenantList from '@/components/propertiesComponets/TenantList';
import AddWaterReading from '@/components/utilitiescomponents/AddWaterReading';
import ReadingsList from '@/components/utilitiescomponents/ReadingsTable';
import AddCost from '@/components/propertiesComponets/AddCost';
import PropertyCosts from '@/components/propertiesComponets/PropertyCosts';
export const Route = createFileRoute('/account/$role/property/$id')({
    pendingComponent: () => (_jsx("div", { children: "Loading..." })),
    loader: ({ params, context }) => {
        const { role, id } = params;
        return context.queryClient.ensureQueryData(getProperty(id));
    },
    component: RouteComponent,
});
function RouteComponent() {
    const { id } = Route.useParams();
    const { data } = useSuspenseQuery(getProperty(id));
    const [activeTab, setActiveTab] = useState('units');
    const cards = [
        {
            title: 'Total Number of Units',
            value: data.units,
            icon: IconHomeCheck
        },
        {
            title: 'Occupied Units',
            value: data.occupied_units,
            icon: IconHomeDollar
        },
        {
            title: 'Vacant Units',
            value: data.vacant_units,
            icon: IconHomeX
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'flex flex-col justify-between md:flex-row border-b md:space-x-10 py-6 items-center', children: [_jsxs("div", { className: 'space-y-0.5', children: [_jsx("h2", { className: 'font-medium', children: data.name }), _jsxs("p", { className: 'text-muted-foreground', children: ["Owned By ", data.landlord, " : Managed By ", data.agent] })] }), _jsxs("div", { className: 'flex flex-col md:flex-row md:items-center gap-2', children: [_jsx(Addnew, { label: 'Add Unit', title: 'Add Unit', description: 'Add a New Unit', fullwidth: false, children: _jsx(AddUnit, { initialData: null }) }), _jsx(Addnew, { label: 'Add Tenant', title: 'Add Tenant', description: 'Add a New Tenant', fullwidth: false, children: _jsx(AddTenant, { initialData: null }) }), _jsx(Addnew, { label: "Add Water Reading", title: 'Add Water Reading', description: 'Add Water reading for a unit', fullwidth: false, children: _jsx(AddWaterReading, {}) }), _jsx(Addnew, { label: "Add Costs", title: "Add Costs", description: 'Add additional cost payable monthly e.g Service charge, garbage collection cost etc', fullwidth: false, children: _jsx(AddCost, { initialData: null }) })] })] }), _jsx("div", { className: "flex items-center justify-center  w-full pt-6", children: _jsx("dl", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full", children: cards.map((card) => (_jsx(Card, { className: "p-0 gap-0", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: 'bg-purple-100 rounded-2xl w-16 h-16 grid place-items-center', children: _jsx(card.icon, {}) }), _jsxs("div", { children: [_jsx("dd", { className: "flex items-start justify-between space-x-2", children: _jsx("span", { className: "truncate text-sm text-muted-foreground", children: card.title }) }), _jsxs("dd", { className: "tabular-nums mt-1 text-3xl font-semibold text-foreground", children: [card.value, " ", _jsx("small", { children: "Units" })] })] })] }) }, card.title))) }) }), _jsx("br", {}), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "font-sans font-medium", children: [data.name, " Tenants"] }), _jsx(CardDescription, { className: "font-sans", children: "All Listed tenants" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), children: [_jsxs(TabsList, { className: 'py-6 px-4', children: [_jsx(TabsTrigger, { value: "units", className: 'cursor-pointer py-4', children: "Units" }), _jsx(TabsTrigger, { value: "tenants", className: 'cursor-pointer py-4', children: "Tenants" }), _jsx(TabsTrigger, { value: "readings", className: 'cursor-pointer py-4', children: "Water Usage" }), _jsx(TabsTrigger, { value: "costs", className: 'cursor-pointer py-4', children: "Additional Costs" })] }), _jsx(TabsContent, { value: "units", children: _jsx(UnitsList, {}) }), _jsx(TabsContent, { value: "tenants", children: _jsx(TenantList, {}) }), _jsx(TabsContent, { value: "readings", children: _jsx(ReadingsList, {}) }), _jsx(TabsContent, { value: "costs", children: _jsx(PropertyCosts, {}) })] }) })] })] }));
}
