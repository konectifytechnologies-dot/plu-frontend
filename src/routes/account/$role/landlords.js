import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createFileRoute } from '@tanstack/react-router';
import Addnew from '@/components/ui/add-new';
import AddLandlord from '@/components/propertiesComponets/AddLandlord';
import LandlordList from '@/components/propertiesComponets/LandlordsList';
export const Route = createFileRoute('/account/$role/landlords')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsxs("div", { className: 'border-b flex items-center justify-between py-4', children: [_jsx("h2", { className: 'font-semibold text-xl', children: "My Landlords" }), _jsx(Addnew, { label: 'Add Landlord', title: "Add a new Landlord", description: 'Add a new Landlord', fullwidth: false, children: _jsx(AddLandlord, { initialData: null }) })] }), _jsx("br", {}), _jsx(LandlordList, {})] }) }));
}
