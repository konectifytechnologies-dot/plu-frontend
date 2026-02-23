import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { SidebarInset, SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/appsidebar';
import { getLoggedInUser } from '@/lib/auth';
export const Route = createFileRoute('/account')({
    beforeLoad: async () => {
        const user = await getLoggedInUser();
        if (!user) {
            throw redirect({ to: '/login' });
        }
        return { user };
    },
    component: AccountLayout,
});
function AccountLayout() {
    const { user } = Route.useRouteContext();
    return (_jsx(_Fragment, { children: _jsxs(SidebarProvider, { children: [_jsx(AppSidebar, {}), _jsxs(SidebarInset, { children: [_jsx("header", { className: "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12", children: _jsx("div", { className: "flex items-center gap-2 px-4", children: _jsx(SidebarTrigger, { className: "sm:hidden" }) }) }), _jsx("div", { className: "container mx-auto md:px-8", children: _jsx(Outlet, {}) })] })] }) }));
}
