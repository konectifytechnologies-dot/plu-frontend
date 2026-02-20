import { createFileRoute, Link } from '@tanstack/react-router'
import PropertiesList from '@/components/propertiesComponets/PropertiesList'
import Addnew from '@/components/ui/add-new'
import AddProperty from '@/components/propertiesComponets/AddProperty'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'

export const Route = createFileRoute('/account/$role/properties')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <>
      <div>
        <div className='border-b flex items-center justify-between py-4'>
          <h2 className='font-semibold text-xl'>My Properties</h2>
          <Button asChild>
            <Link to="/account/$role/add_property" ><IconPlus /> Add Property</Link>
          </Button>
        </div>
        <br />
        <PropertiesList />
      </div>
    </>
  )
}
