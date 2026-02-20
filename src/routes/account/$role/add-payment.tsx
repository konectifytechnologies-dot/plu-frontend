import AddPayment from '@/components/utilitiescomponents/AddPayment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/$role/add-payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <div>
            <h2>Add a New Payment</h2>
            <AddPayment />
        </div>
    </>
  )
}
