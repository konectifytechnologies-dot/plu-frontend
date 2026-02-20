import { createFileRoute } from '@tanstack/react-router'
import Addnew from '@/components/ui/add-new'
import AddLandlord from '@/components/propertiesComponets/AddLandlord'
import LandlordList from '@/components/propertiesComponets/LandlordsList'


export const Route = createFileRoute('/account/$role/landlords')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>
        <div className='border-b flex items-center justify-between py-4'>
          <h2 className='font-semibold text-xl'>My Landlords</h2>
          <Addnew 
            label='Add Landlord'
            title="Add a new Landlord"
            description='Add a new Landlord'
            fullwidth={false}
          >
            <AddLandlord initialData={null} />
          </Addnew>
        </div>
        <br />
          <LandlordList />
      </div>
    </>
  )

}
