import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createFileRoute, Link } from '@tanstack/react-router';
import PropertiesList from '@/components/propertiesComponets/PropertiesList';
import Addnew from '@/components/ui/add-new';
import AddProperty from '@/components/propertiesComponets/AddProperty';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
export const Route = createFileRoute('/account/$role/properties')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsxs("div", { className: 'border-b flex items-center justify-between py-4', children: [_jsx("h2", { className: 'font-semibold text-xl', children: "My Properties" }), _jsx(Button, { asChild: true, children: _jsxs(Link, { to: "/account/$role/add_property", children: [_jsx(IconPlus, {}), " Add Property"] }) })] }), _jsx("br", {}), _jsx(PropertiesList, {})] }) }));
}
