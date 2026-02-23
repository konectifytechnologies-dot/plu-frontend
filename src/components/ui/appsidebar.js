import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "./sidebar-nav";
import { NavFooter } from "./nav-footer";
import { cn } from "@/lib/utils";
export function AppSidebar({ ...props }) {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    return (_jsxs(Sidebar, { variant: "inset", collapsible: "icon", children: [_jsx(SidebarHeader, { children: _jsx("h6", { children: "PLU Developers" }) }), _jsx(SidebarContent, { className: "gap-4 px-2 py-4", children: _jsx(NavMain, {}) }), _jsx(NavFooter, {})] }));
}
