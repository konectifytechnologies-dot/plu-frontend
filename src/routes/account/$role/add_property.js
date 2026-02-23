import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AddProperty from '@/components/propertiesComponets/AddProperty';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/account/$role/add_property')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsxs("div", { className: 'border-b py-3 flex items-center justify-between gap-2', children: [_jsx("h2", { children: "Add or Edit a Property" }), _jsx(Button, { variant: "outline", asChild: true, children: _jsxs(Link, { to: "/account/$role/properties", children: [_jsx(MoveLeft, {}), " Back To Properties"] }) })] }), _jsx("div", { className: 'py-4', children: _jsx(AddProperty, {}) })] }) }));
}
