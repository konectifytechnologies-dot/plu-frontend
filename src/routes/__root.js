import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
export const Route = createRootRouteWithContext()({
    component: () => (_jsxs(_Fragment, { children: [_jsx(Outlet, {}), _jsx(TanStackDevtools, { config: {
                    position: 'bottom-right',
                }, plugins: [
                    {
                        name: 'Tanstack Router',
                        render: _jsx(TanStackRouterDevtoolsPanel, {}),
                    },
                ] })] })),
});
