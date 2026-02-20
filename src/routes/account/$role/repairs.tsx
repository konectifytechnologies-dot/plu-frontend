import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import RepairsList from '@/components/utilitiescomponents/RepairList'

export const Route = createFileRoute('/account/$role/repairs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <div className='border-b flex items-center justify-between py-4'>
          <h2 className='font-semibold text-xl'>Repairs</h2>
          <Button asChild>
            <Link to="/account/$role/add-repairs" ><IconPlus /> Add Repairs</Link>
          </Button>
        </div>
        <br />
        <RepairsList />
      </div>
    </>
  )
} 
