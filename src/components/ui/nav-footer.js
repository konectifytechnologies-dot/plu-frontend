import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "./sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./dropdown-menu";
import { Avatar, AvatarFallback } from "./avatar";
import { useQuery } from "@tanstack/react-query";
import { LogOut, User, } from "lucide-react";
import { logOut } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { abbreviateNameInitials } from "@/lib/utilFunctions";
import { getLoggedInUser } from "@/lib/auth";
export function NavFooter() {
    const navigate = useNavigate();
    const logout = async () => {
        const data = await logOut();
        console.log(data);
        navigate({ to: '/login', replace: true });
    };
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['USER_DATA'],
        queryFn: getLoggedInUser
    });
    return (_jsx(SidebarFooter, { className: "p-4", children: _jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsx("div", { className: "flex items-center gap-2 justify-between", children: _jsx("div", { className: "flex items-center gap-2", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { size: "lg", className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground", children: [_jsx("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-foreground", children: _jsx("h6", { className: "text-slate-900 bg-white ", children: user && abbreviateNameInitials(user?.name) }) }), _jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [_jsx("span", { className: "truncate font-semibold", children: user?.name }), _jsx("span", { className: "truncate text-xs", children: user?.role })] })] }) }), _jsxs(DropdownMenuContent, { className: "m-2", children: [_jsxs(DropdownMenuItem, { children: [_jsx(User, { size: 16, className: "opacity-80", "aria-hidden": "true" }), "Profile"] }), _jsxs(DropdownMenuItem, { onClick: logout, children: [_jsx(LogOut, { size: 16, className: "opacity-80", "aria-hidden": "true" }), "Logout"] })] })] }) }) }) }) }) }));
}
