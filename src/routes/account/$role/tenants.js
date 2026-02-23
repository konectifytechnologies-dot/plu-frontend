import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import UserTenants from '@/components/propertiesComponets/UserTenants';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/account/$role/tenants')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsx(UserTenants, {}) }));
}
