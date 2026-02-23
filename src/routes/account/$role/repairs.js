import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import RepairsList from '@/components/utilitiescomponents/RepairList';
export const Route = createFileRoute('/account/$role/repairs')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsxs("div", { className: 'border-b flex items-center justify-between py-4', children: [_jsx("h2", { className: 'font-semibold text-xl', children: "Repairs" }), _jsx(Button, { asChild: true, children: _jsxs(Link, { to: "/account/$role/add-repairs", children: [_jsx(IconPlus, {}), " Add Repairs"] }) })] }), _jsx("br", {}), _jsx(RepairsList, {})] }) }));
}
