import { IconPlus } from '@tabler/icons-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import PaymentList from '@/components/utilitiescomponents/PaymentsList'


export const Route = createFileRoute('/account/$role/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <div className='border-b flex items-center justify-between py-4'>
          <h2 className='font-semibold text-xl'>Payments</h2>
          <Button asChild>
            <Link to="/account/$role/add-payment"><IconPlus />Add Payment</Link>
          </Button>
        </div>
        <br />
        <PaymentList />
      </div>
    </>
  )
}
