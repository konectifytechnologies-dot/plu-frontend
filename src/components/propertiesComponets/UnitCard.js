import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconTrash } from "@tabler/icons-react";
import Addnew from "../ui/add-new";
import AddUnit from "./AddUnit";
import { Button } from "../ui/button";
export default function UnitCard({ unit }) {
    const { name, tenant, bedrooms } = unit;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white border rounded-2xl py-2 px-4 flex flex-col md:flex-row items-center justify-between", children: [_jsxs("button", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-purple-100 font-medium text-slate-900 rounded-2xl w-16 h-16 grid place-items-center ", children: _jsx("span", { className: "font-semibold", children: name }) }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("p", { className: "text-sm font-medium text-left", children: ["Tenant: ", tenant] }), _jsxs("span", { className: "text-sm font-semibold", children: ["Number of Bedrooms: ", bedrooms] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Addnew, { label: "Edit Unit", title: "Edit Unit", description: "Edit This Unit", fullwidth: false, children: _jsx(AddUnit, { initialData: unit }) }), _jsxs(Button, { children: [_jsx(IconTrash, {}), " Delete"] })] })] }) }));
}
