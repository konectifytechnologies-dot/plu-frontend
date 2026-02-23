import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconHome, IconUsers, IconBuilding, IconWindow, IconRippleDown, IconMoneybag, IconSettings, IconUser, IconLogout, IconPlus, IconSettings2 } from '@tabler/icons-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarMenuSubItem, SidebarMenuSub } from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { useSidebar } from '@/components/ui/sidebar';
import { Link } from "@tanstack/react-router";
import { logOut } from '@/lib/auth';
import { useNavigate } from '@tanstack/react-router';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '@/lib/auth';
export function NavMain() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const [openCollapsible, setOpenCollapsible] = useState(null);
    const location = useLocation();
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['USER_DATA'],
        queryFn: getLoggedInUser
    });
    const isAgent = user?.role === 'agent';
    const isTenant = user?.role === 'tenant';
    const items = [
        {
            name: "Home",
            slug: 'home',
            icon: IconHome,
            url: '/account/$role/home',
            display: true
        },
        {
            name: "Landlords",
            slug: "landlords",
            icon: IconUsers,
            url: '/account/$role/landlords',
            display: isAgent,
        },
        {
            name: "Properties",
            slug: "properties",
            icon: IconBuilding,
            display: !isTenant,
            subs: [
                {
                    name: 'Add Property',
                    slug: 'add_property',
                    icon: IconPlus,
                    url: '/account/$role/add_property'
                },
                {
                    name: 'Properties',
                    slug: 'properties',
                    icon: IconBuilding,
                    url: '/account/$role/properties'
                }
            ]
            //display:isAgent
        },
        {
            name: "Tenants",
            slug: "tenants",
            icon: IconWindow,
            url: '/account/$role/tenants',
            display: !isTenant,
        },
        {
            name: 'Payments',
            slug: 'payments',
            icon: IconMoneybag,
            display: true,
            subs: [
                {
                    name: 'Add Payment',
                    slug: 'add_payment',
                    icon: IconPlus,
                    url: '/account/$role/add-payment'
                },
                {
                    name: 'Payments',
                    slug: 'payments',
                    icon: IconMoneybag,
                    url: '/account/$role/payments'
                },
            ]
        },
        {
            name: 'Repairs',
            slug: 'repairs',
            icon: IconSettings2,
            display: !isTenant,
            subs: [
                {
                    name: 'Add Repair',
                    slug: 'add_repair',
                    icon: IconPlus,
                    url: '/account/$role/add-repairs'
                },
                {
                    name: 'Repairs',
                    slug: 'repairs',
                    icon: IconSettings,
                    url: '/account/$role/repairs'
                }
            ]
        },
    ];
    return (_jsx(SidebarMenu, { children: items.map((item) => {
            const isOpen = !isCollapsed && openCollapsible === item.slug;
            const hasSubRoutes = !!item.subs?.length;
            const isActive = location.href.includes(item.slug);
            if (!item.display) {
                return _jsx(_Fragment, {});
            }
            return (_jsx(SidebarMenuItem, { children: hasSubRoutes ? (_jsxs(Collapsible, { open: isOpen, onOpenChange: (open) => setOpenCollapsible(open ? item.slug : null), className: "w-full", children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { className: cn("flex w-full items-center rounded-lg px-2 transition-colors", isOpen && "bg-sidebar-muted text-foreground", isCollapsed && "justify-center", isActive && 'bg-primary text-white'), children: [_jsx(item.icon, {}), !isCollapsed && (_jsx("span", { className: "ml-2 flex-1 text-sm font-medium", children: item.name })), !isCollapsed && hasSubRoutes && (_jsx("span", { className: "ml-auto", children: isOpen ? (_jsx(ChevronUp, { className: "size-4" })) : (_jsx(ChevronDown, { className: "size-4" })) }))] }) }), !isCollapsed && (_jsx(CollapsibleContent, { children: _jsx(SidebarMenuSub, { className: "my-1 ml-3.5 ", children: item.subs?.map((subRoute) => (_jsx(SidebarMenuSubItem, { className: "h-auto", children: _jsx(SidebarMenuSubButton, { asChild: true, children: _jsxs(Link, { to: subRoute.url, className: "flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-primary hover:bg-sidebar-muted hover:text-foreground", children: [_jsx(subRoute.icon, {}), subRoute.name] }) }) }, `${item.slug}`))) }) }))] })) : (_jsx(SidebarMenuButton, { tooltip: item.name, asChild: true, children: _jsxs(Link, { to: item.url, className: cn("flex items-center rounded-lg px-2 transition-colors text-primary hover:bg-sidebar-muted hover:text-foreground", isCollapsed && "justify-center", isActive && 'bg-primary text-white'), children: [_jsx(item.icon, {}), !isCollapsed && (_jsx("span", { className: "ml-2 text-sm font-medium", children: item.name }))] }) })) }, item.slug));
        }) }));
}
const SecondaryNav = () => {
    const { state } = useSidebar();
    const [open, handlers] = useDisclosure(false);
    const links = [
        {
            name: "Payments",
            url: "/account/$role/payments",
            icon: IconMoneybag,
        },
        {
            name: 'Utilities',
            url: `/account/$role/utilities`,
            icon: IconRippleDown
        }
    ];
    return (_jsx(_Fragment, { children: _jsxs(SidebarMenu, { children: [links.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, tooltip: item.name, children: _jsxs(Link, { to: item.url, children: [_jsx(item.icon, {}), _jsx("span", { children: item.name })] }) }) }))), _jsx(SidebarMenuItem, { children: _jsxs(Collapsible, { open: open, onOpenChange: () => handlers.toggle(), children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { className: cn("flex w-full items-center rounded-lg transition-colors", open && "bg-sidebar-muted text-foreground"), children: [_jsxs("p", { className: "flex gap-2 items-center text-sm font-medium", children: [_jsx(IconSettings, {}), _jsx("span", { children: "Repairs" })] }), _jsx("span", { className: "ml-auto", children: open ? (_jsx(ChevronUp, { className: "size-4" })) : (_jsx(ChevronDown, { className: "size-4" })) })] }) }), _jsx(CollapsibleContent, { children: _jsxs(SidebarMenuSub, { className: "my-1 ml-3.5 ", children: [_jsx(SidebarMenuSubItem, { children: _jsx(SidebarMenuSubButton, { asChild: true, children: _jsx(Link, { to: "/account/$role/repairs", className: "flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-muted hover:text-foreground", children: "Repairs" }) }) }), _jsx(SidebarMenuSubItem, { children: _jsx(SidebarMenuSubButton, { asChild: true, children: _jsx(Link, { to: "/account/$role/add-repairs", className: "flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-muted hover:text-foreground", children: "Add Repair" }) }) })] }) })] }) })] }) }));
};
const AccountNav = () => {
    const navigate = useNavigate();
    const logout = async () => {
        const data = await logOut();
        console.log(data);
        navigate({ to: '/login', replace: true });
    };
    return (_jsxs(_Fragment, { children: [_jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, tooltip: "Profile", children: _jsxs(Link, { to: "/account/$role/profile", children: [_jsx(IconUser, {}), _jsx("span", { children: "My Profile" })] }) }) }) }), _jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsxs(SidebarMenuButton, { onClick: logout, className: 'cursor-pointer', tooltip: "Log-out", children: [_jsx(IconLogout, {}), _jsx("span", { children: "Log-Out" })] }) }) })] }));
};
