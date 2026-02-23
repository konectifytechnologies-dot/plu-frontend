import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { abbreviateNameInitials } from "@/lib/utilFunctions";
import Addnew from "../ui/add-new";
import AddTenant from "./AddTenant";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "@/lib/axios";
import { apiRequest } from "@/lib/apirequest";
import { toast } from "sonner";
import { Item, ItemContent, ItemMedia, ItemTitle, } from "../ui/item";
import { Spinner } from "../ui/spinner";
export default function TenantCard({ tenant }) {
    const { name, user_id, house, house_number, number } = tenant;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white border rounded-2xl py-2 px-4 flex flex-col md:flex-row items-center justify-between", children: [_jsxs("button", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-purple-200 font-medium text-slate-900 rounded-full w-18 h-18 grid place-items-center ", children: _jsx("span", { className: "font-semibold", children: abbreviateNameInitials(name) }) }), _jsxs("div", { className: "flex-1 text-left min-w-0 space-y-0.5", children: [_jsx("p", { className: "text-sm font-medium truncate", children: name }), _jsxs("p", { className: "text-sm font-medium", children: ["Property: ", house] }), _jsxs("span", { className: "text-sm font-semibold", children: ["House: ", house_number, " "] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Addnew, { label: "Edit Tenant", title: "Edit Tenant", description: "Edit This Tenant", fullwidth: false, children: _jsx(AddTenant, { initialData: tenant }) }), _jsx(VacateTenant, { id: user_id })] })] }) }));
}
const VacateTenant = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleVacate = async () => {
        setLoading(true);
        const url = `/api/vacate/tenant/${id}`;
        const { data, error } = await apiRequest(() => axios.delete(url));
        console.log(data, error);
        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
        if (data) {
            console.log(data);
            setLoading(false);
            setError(null);
            toast(data.message, { position: 'top-center' });
        }
    };
    return (_jsxs(_Fragment, { children: [loading && (_jsx("div", { className: "flex w-full max-w-xs flex-col gap-4 [--radius:1rem]", children: _jsxs(Item, { variant: "muted", children: [_jsx(ItemMedia, { children: _jsx(Spinner, {}) }), _jsx(ItemContent, { children: _jsx(ItemTitle, { className: "line-clamp-1", children: "Loading..." }) })] }) })), !loading && _jsxs(Button, { className: "cursor-pointer", onClick: handleVacate, children: [_jsx(IconTrash, {}), " Vacate Tenant"] })] }));
};
