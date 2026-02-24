import { createFileRoute, Link } from '@tanstack/react-router'
import PropertiesList from '@/components/propertiesComponets/PropertiesList'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'

export const Route = createFileRoute('/account/$role/properties')({
  component: RouteComponent,
})

function RouteComponent() {
  const {role} = Route.useParams();
  return(
    <>
      <div>
        <div className='border-b flex items-center justify-between py-4'>
          <h2 className='font-semibold text-xl'>My Properties</h2>
          <Button asChild>
            <Link 
              to="/account/$role/add_property" 
              params={{role}}
              search={{property_id:''}}
            >
              <IconPlus /> Add Property
            </Link>
          </Button>
        </div>
        <br />
        <PropertiesList />
      </div>
    </>
  )
}
