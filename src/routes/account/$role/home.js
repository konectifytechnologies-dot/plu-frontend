import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { IconHome, IconUser, IconBuilding } from '@tabler/icons-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAgent } from '@/queries/fetchQueries';
import PropertiesList from '@/components/propertiesComponets/PropertiesList';
import Addnew from '@/components/ui/add-new';
import AddLandlord from '@/components/propertiesComponets/AddLandlord';
import { Separator } from '@/components/ui/separator';
import AddUnit from '@/components/propertiesComponets/AddUnit';
import AddTenant from '@/components/propertiesComponets/AddTenant';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
export const Route = createFileRoute('/account/$role/home')({
    component: RouteComponent,
    pendingComponent: () => _jsx("div", { children: "Loading..." }),
    errorComponent: () => _jsx("div", { children: "Error" }),
    loader: async ({ context: { queryClient } }) => {
        await queryClient.prefetchQuery({
            queryKey: ['USER_STATS_DATA'],
            queryFn: () => getAgent()
        });
    },
});
function RouteComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['USER_STATS_DATA'],
        queryFn: getAgent,
    });
    const permittedRoles = ['agent', 'landlord'];
    const isPermitted = permittedRoles.includes(data.agent?.role);
    const isAgent = data.agent?.role === 'agent';
    return (_jsxs(_Fragment, { children: [isPermitted &&
                _jsxs("div", { className: cn("grid grid-cols-3 gap-2 py-2", isAgent && 'grid-cols-4'), children: [isAgent && (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx("div", { className: "bg-purple-100 h-12 w-12 rounded-full grid place-items-center", children: _jsx(IconUser, { className: "text-primary" }) }), _jsx("div", { className: "space-y-2 col-span-3", children: _jsx(CardDescription, { className: "font-sans", children: "Total Number of Landlords" }) })] }), _jsxs(CardTitle, { className: "text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl", children: [data.stats.total_landlords, "  ", _jsx("small", { className: "font-sans text-muted-foreground text-xs", children: "Landlords" })] })] }), _jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [_jsx(Separator, { className: "my-2" }), _jsx(Addnew, { label: "Add Landlord", title: "Add a new Landlord", fullwidth: true, description: "", children: _jsx(AddLandlord, {}) })] })] })), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx("div", { className: "bg-purple-100 h-12 w-12 rounded-full grid place-items-center", children: _jsx(IconBuilding, { className: "text-primary" }) }), _jsx("div", { className: "space-y-2 col-span-3", children: _jsx(CardDescription, { className: "font-sans", children: "Total Number of Properties " }) })] }), _jsxs(CardTitle, { className: "text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl", children: [data.stats.total_properties, "  ", _jsx("small", { className: "font-sans text-muted-foreground text-xs", children: "Properties" })] })] }), _jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [_jsx(Separator, { className: "my-2" }), _jsx(Button, { className: 'w-full', asChild: true, children: _jsxs(Link, { to: "/account/$role/add_property", children: [_jsx(IconPlus, {}), "Add Property"] }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx("div", { className: "bg-purple-100 h-12 w-12 rounded-full grid place-items-center", children: _jsx(IconHome, { className: "text-primary" }) }), _jsx("div", { className: "space-y-2 col-span-3", children: _jsx(CardDescription, { className: "font-sans", children: "Total Number of Units" }) })] }), _jsxs(CardTitle, { className: "text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl", children: [data.stats.total_units, "  ", _jsx("small", { className: "font-sans text-muted-foreground text-xs", children: "Units" })] })] }), _jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [_jsx(Separator, { className: "my-2" }), _jsx(Addnew, { label: "Add Property Unit", title: "Add a new Property Unit", fullwidth: true, description: "", children: _jsx(AddUnit, { initialData: null }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx("div", { className: "bg-purple-100 h-12 w-12 rounded-full grid place-items-center", children: _jsx(IconUser, { className: "text-primary" }) }), _jsx("div", { className: "space-y-2 col-span-3", children: _jsx(CardDescription, { className: "font-sans", children: "Total Number of Tenants" }) })] }), _jsxs(CardTitle, { className: "text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl", children: [data.stats.total_tenants, "  ", _jsx("small", { className: "font-sans text-muted-foreground text-xs", children: "Tenants" })] })] }), _jsxs(CardFooter, { className: "flex-col items-start gap-1.5 text-sm", children: [_jsx(Separator, { className: "my-2" }), _jsx(Addnew, { label: "Add Tenant", title: "Add a new Tenant", fullwidth: true, description: "", children: _jsx(AddTenant, { initialData: null }) })] })] })] }), _jsx(PropertiesList, {})] }));
}
