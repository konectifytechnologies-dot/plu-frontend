import { getProperty } from '@/queries/fetchQueries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from '@/components/ui/card'
import { IconHomeCheck, IconHomeDollar, IconHomeX } from '@tabler/icons-react';
import Addnew from '@/components/ui/add-new';
import AddUnit from '@/components/propertiesComponets/AddUnit';
import AddTenant from '@/components/propertiesComponets/AddTenant';
import { Tabs,TabsContent,TabsList,TabsTrigger, } from '@/components/ui/tabs';
import { useState } from 'react';
import UnitsList from '@/components/propertiesComponets/UnitList';
import TenantList from '@/components/propertiesComponets/TenantList';
import AddWaterReading from '@/components/utilitiescomponents/AddWaterReading';
import ReadingsList from '@/components/utilitiescomponents/ReadingsTable';
import AddCost from '@/components/propertiesComponets/AddCost';
import PropertyCosts from '@/components/propertiesComponets/PropertyCosts';

type PropertyRouteParams = {
  role: string
  id: string
}

export const Route = createFileRoute('/account/$role/property/$id')({
  pendingComponent:()=> (<div>Loading...</div>),
  loader: ({ params, context } :{params:PropertyRouteParams; context:any}) => {
    const {id } = params
    return context.queryClient.ensureQueryData(
      getProperty(id)
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()
  const {data} =  useSuspenseQuery(getProperty(id));
  const [activeTab, setActiveTab] = useState('units');
  const cards = [
    {
      title:'Total Number of Units',
      value:data.units,
      icon:IconHomeCheck
    },
    {
      title:'Occupied Units',
      value:data.occupied_units,
      icon:IconHomeDollar
    },
    {
      title:'Vacant Units',
      value:data.vacant_units,
      icon:IconHomeX
    },
    
  ]
  return (
    <>
    <div className='flex flex-col justify-between md:flex-row border-b md:space-x-10 py-6 items-center'>
      <div className='space-y-0.5'>
        <h2 className='font-medium'>{data.name}</h2>
        <p className='text-muted-foreground'>Owned By {data.landlord} : Managed By {data.agent}</p>
      </div>
      <div className='flex flex-col md:flex-row md:items-center gap-2'>
        <Addnew 
          label='Add Unit'
          title='Add Unit'
          description='Add a New Unit'
          fullwidth={false}
        >
            <AddUnit initialData={null} />
        </Addnew>
        <Addnew 
          label='Add Tenant'
          title='Add Tenant'
          description='Add a New Tenant'
          fullwidth={false}
        >
            <AddTenant initialData={null} />
        </Addnew>
        <Addnew 
          label="Add Water Reading"
          title='Add Water Reading'
          description='Add Water reading for a unit'
          fullwidth={false}
        >
          <AddWaterReading />
        </Addnew>
        <Addnew  
          label="Add Costs"
          title="Add Costs"
          description='Add additional cost payable monthly e.g Service charge, garbage collection cost etc'
          fullwidth={false}
        >
          <AddCost initialData={null}/>
        </Addnew>
      </div>
    </div>
      <div className="flex items-center justify-center  w-full pt-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {cards.map((card)=> (
                <Card key={card.title} className="p-0 gap-0">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className='bg-purple-100 rounded-2xl w-16 h-16 grid place-items-center'>
                      <card.icon />
                    </div>
                    <div>
                      <dd className="flex items-start justify-between space-x-2">
                        <span className="truncate text-sm text-muted-foreground">
                          {card.title}
                        </span>
                      </dd>
                      <dd className="tabular-nums mt-1 text-3xl font-semibold text-foreground">
                        {card.value} <small>Units</small>
                      </dd>
                    </div>
                  </CardContent>
                </Card>

              ))}
          </dl>
      </div>
      <br />
      <Card>
          <CardHeader>
            <CardTitle className="font-sans font-medium">{data.name} Tenants</CardTitle>
            <CardDescription className="font-sans">All Listed tenants</CardDescription>
          </CardHeader>
          <CardContent>
              <Tabs value={activeTab} onValueChange={(value)=> setActiveTab(value)}>
                <TabsList className='py-6 px-4'>
                  <TabsTrigger value="units" className='cursor-pointer py-4'>Units</TabsTrigger>
                  <TabsTrigger value="tenants" className='cursor-pointer py-4'>Tenants</TabsTrigger>
                  <TabsTrigger value="readings" className='cursor-pointer py-4'>Water Usage</TabsTrigger>
                  <TabsTrigger value="costs" className='cursor-pointer py-4'>Additional Costs</TabsTrigger>
                </TabsList>
                <TabsContent value="units">
                  <UnitsList />
                </TabsContent>
                <TabsContent value="tenants">
                  <TenantList />
                </TabsContent>
                <TabsContent value="readings">
                  <ReadingsList />
                </TabsContent>
                 <TabsContent value="costs">
                  <PropertyCosts />
                </TabsContent>
              </Tabs>         
          </CardContent> 
      </Card> 
    </>
  )
}
