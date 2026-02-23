import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";
export default function PropertyCard({ property }) {
    const { role } = useParams({ strict: false });
    const { id, name, picture, landlord, agent } = property;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "w-full justify-between flex items-center gap-3 rounded-2xl border p-2 text-left ", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: picture, alt: name + 'Picture', className: "h-18 w-18 object-cover rounded-2xl bg-muted/30" }), _jsxs("div", { className: "flex-1 min-w-0 space-y-0.5", children: [_jsx("p", { className: "text-sm font-medium truncate", children: name }), _jsxs("span", { className: "text-sm block", children: ["Owned By: ", landlord] }), _jsxs("span", { className: "text-sm", children: ["Managed By: ", agent] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { asChild: true, children: _jsxs(Link, { to: `/account/${role}/property/${id}`, children: [_jsx(IconEye, {}), "View Property"] }) }), _jsx(Button, { asChild: true, children: _jsxs(Link, { to: `/account/$role/add_property?property_id=${id}`, children: [_jsx(IconEdit, {}), "Edit Property"] }) })] })] }) }));
}
