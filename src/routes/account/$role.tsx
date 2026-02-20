import { Outlet, createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils';
import { getUserData } from '@/queries/fetchQueries';
import { useSuspenseQuery } from '@tanstack/react-query';

//const allowedRoles = ['admin', 'agent', 'landlord'] as const

export const Route = createFileRoute('/account/$role')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getUserData),
  component: RoleLayout,
});

function RoleLayout() {
  const { role } = Route.useParams()
  return (
      <div>
        <Outlet />
      </div>
  )
}