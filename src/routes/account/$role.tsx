import { Outlet, createFileRoute } from '@tanstack/react-router'
import { getUserData } from '@/queries/fetchQueries';

//const allowedRoles = ['admin', 'agent', 'landlord'] as const
type ParamsType = {
  role: string
}
export const Route = createFileRoute('/account/$role')({
  loader: ({context }:{params:ParamsType, context:any}) => context.queryClient.ensureQueryData(getUserData),
  component: RoleLayout,
});

function RoleLayout() { 

  return (
      <div>
        <Outlet />
      </div>
  )
}