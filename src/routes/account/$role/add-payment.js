import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AddPayment from '@/components/utilitiescomponents/AddPayment';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/account/$role/add-payment')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsx("h2", { children: "Add a New Payment" }), _jsx(AddPayment, {})] }) }));
}
