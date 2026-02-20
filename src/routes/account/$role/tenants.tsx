import UserTenants from '@/components/propertiesComponets/UserTenants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/$role/tenants')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <UserTenants />
    </>
  )
}
