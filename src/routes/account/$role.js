import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { getUserData } from '@/queries/fetchQueries';
import { useSuspenseQuery } from '@tanstack/react-query';
export const Route = createFileRoute('/account/$role')({
    loader: ({ params, context }) => context.queryClient.ensureQueryData(getUserData),
    component: RoleLayout,
});
function RoleLayout() {
    return (_jsx("div", { children: _jsx(Outlet, {}) }));
}
