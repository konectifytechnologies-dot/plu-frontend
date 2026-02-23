import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconPlus } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import PaymentList from '@/components/utilitiescomponents/PaymentsList';
export const Route = createFileRoute('/account/$role/payments')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsxs("div", { className: 'border-b flex items-center justify-between py-4', children: [_jsx("h2", { className: 'font-semibold text-xl', children: "Payments" }), _jsx(Button, { asChild: true, children: _jsxs(Link, { to: "/account/$role/add-payment", children: [_jsx(IconPlus, {}), "Add Payment"] }) })] }), _jsx("br", {}), _jsx(PaymentList, {})] }) }));
}
