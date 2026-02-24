import AddProperty from '@/components/propertiesComponets/AddProperty'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';


export const Route = createFileRoute('/account/$role/add_property')({
  validateSearch: (search) => ({
    property_id: search.property_id as string | undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
    const {role} = Route.useParams()
    
  return (
    <>
        <div>
            <div className='border-b py-3 flex items-center justify-between gap-2'>
                <h2>Add or Edit a Property</h2>
                <Button variant="outline" asChild>
                    <Link 
                        to="/account/$role/properties" 
                        params={{role}}
                    >
                        <MoveLeft /> Back To Properties
                    </Link>
                </Button>
            </div>
            <div className='py-4'>
                <AddProperty />
            </div>
        </div>
    </> 
  )
}
