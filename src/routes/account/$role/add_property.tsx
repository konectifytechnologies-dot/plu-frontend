import AddProperty from '@/components/propertiesComponets/AddProperty'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/account/$role/add_property')({
  component: RouteComponent,
})

function RouteComponent() {
    
  return (
    <>
        <div>
            <div className='border-b py-3 flex items-center justify-between gap-2'>
                <h2>Add or Edit a Property</h2>
                <Button variant="outline" asChild>
                    <Link to="/account/$role/properties" >
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
