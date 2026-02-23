import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import RegisterForm from '@/components/authcomponents/RegisterForm';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/register')({
    component: RouteComponent,
});
function RouteComponent() {
    return (_jsx(_Fragment, { children: _jsx("div", { className: "flex items-center bg-gray-50 justify-center min-h-screen", children: _jsxs("div", { className: "mx-auto w-full max-w-xs space-y-6", children: [_jsxs("div", { className: "space-y-2 text-center", children: [_jsx("h1", { className: "text-3xl font-semibold font-sans", children: "Welcome" }), _jsx("p", { className: "text-muted-foreground font-sans", children: "Create your agent account" })] }), _jsx("div", { className: "space-y-5", children: _jsx("div", { className: "space-y-6", children: _jsx(RegisterForm, {}) }) })] }) }) }));
}
