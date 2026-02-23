import { Outlet, createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils';
import { getUserData } from '@/queries/fetchQueries';
import { useSuspenseQuery } from '@tanstack/react-query';

//const allowedRoles = ['admin', 'agent', 'landlord'] as const
type ParamsType = {
  role: string
}
export const Route = createFileRoute('/account/$role')({
  loader: ({params, context }:{params:ParamsType, context:any}) => context.queryClient.ensureQueryData(getUserData),
  component: RoleLayout,
});

function RoleLayout() { 

  return (
      <div>
        <Outlet />
      </div>
  )
}