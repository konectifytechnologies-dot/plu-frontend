import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createFileRoute } from '@tanstack/react-router';
import LoginForm from '@/components/authcomponents/LoginForm';
import { redirect } from '@tanstack/react-router';
import { getLoggedInUser } from '@/lib/auth';
export const Route = createFileRoute('/login')({
    beforeLoad: async () => {
        const user = await getLoggedInUser();
        console.log(user);
        if (user) {
            throw redirect({
                to: "/account/$role/home",
                params: { role: user.role }
            });
        }
        return {};
    },
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsx("div", { className: "flex items-center bg-gray-50 justify-center min-h-screen", children: _jsxs("div", { className: "mx-auto w-full max-w-xs space-y-6", children: [_jsxs("div", { className: "space-y-2 text-center", children: [_jsx("h1", { className: "text-3xl font-semibold font-sans", children: "Welcome back" }), _jsx("p", { className: "text-muted-foreground font-sans", children: "Sign in to access to your dashboard, settings and properties etc." })] }), _jsx("div", { className: "space-y-5", children: _jsx("div", { className: "space-y-6", children: _jsx(LoginForm, {}) }) })] }) }) }));
}
