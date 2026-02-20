import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Card,CardDescription,CardFooter,CardHeader,CardTitle,  } from '@/components/ui/card'
import { IconHome, IconUser,IconBuilding } from '@tabler/icons-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getAgent } from '@/queries/fetchQueries'
import PropertiesList from '@/components/propertiesComponets/PropertiesList'
import Addnew from '@/components/ui/add-new'
import AddLandlord from '@/components/propertiesComponets/AddLandlord'
import { Separator } from '@/components/ui/separator'
import AddUnit from '@/components/propertiesComponets/AddUnit'
import AddTenant from '@/components/propertiesComponets/AddTenant'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'


export const Route = createFileRoute('/account/$role/home')({
  component: RouteComponent,
  pendingComponent: ()=><div>Loading...</div>,
  errorComponent:()=><div>Error</div>,
  loader: async({context:{queryClient}})=> {
    await queryClient.prefetchQuery({
        queryKey:['USER_STATS_DATA'],
        queryFn:()=>getAgent()
    })
  },
  
})

function RouteComponent() {
  const {data} = useSuspenseQuery({
    queryKey:['USER_STATS_DATA'],
    queryFn: getAgent,
  });
  const permittedRoles:Array<string> = ['agent', 'landlord'];
  const isPermitted:Boolean = permittedRoles.includes(data.agent?.role);
  const isAgent = data.agent?.role === 'agent';
  return (
    <>
        {isPermitted && 
        <div className={cn("grid grid-cols-3 gap-2 py-2", isAgent && 'grid-cols-4')}>
            {isAgent && (
                <Card>
                    <CardHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="bg-purple-100 h-12 w-12 rounded-full grid place-items-center">
                                <IconUser className="text-primary" />
                            </div>
                            <div className="space-y-2 col-span-3">
                                <CardDescription className="font-sans">Total Number of Landlords</CardDescription>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl">
                           {data.stats.total_landlords}  <small className="font-sans text-muted-foreground text-xs">Landlords</small>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <Separator className="my-2" />
                        <Addnew
                            label="Add Landlord"
                            title="Add a new Landlord"
                            fullwidth={true}
                            description=""
                        >
                            <AddLandlord /> 
                        </Addnew>
                    </CardFooter>  

                </Card>
            )}  
            <Card>
                    <CardHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="bg-purple-100 h-12 w-12 rounded-full grid place-items-center">
                                <IconBuilding className="text-primary" />
                            </div>
                            <div className="space-y-2 col-span-3">
                                 <CardDescription className="font-sans">Total Number of Properties </CardDescription>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl">
                           {data.stats.total_properties}  <small className="font-sans text-muted-foreground text-xs">Properties</small>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <Separator className="my-2" />
                        <Button className='w-full' asChild>
                            <Link to="/account/$role/add_property" ><IconPlus />Add Property</Link>
                        </Button>
                    </CardFooter> 
            </Card>
            <Card>
                    <CardHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="bg-purple-100 h-12 w-12 rounded-full grid place-items-center">
                                <IconHome className="text-primary" />
                            </div>
                            <div className="space-y-2 col-span-3">
                                 <CardDescription className="font-sans">Total Number of Units</CardDescription>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl">
                           {data.stats.total_units}  <small className="font-sans text-muted-foreground text-xs">Units</small>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <Separator className="my-2" />
                        <Addnew
                            label="Add Property Unit"
                            title="Add a new Property Unit"
                            fullwidth={true}
                            description=""
                        >
                            <AddUnit initialData={null} />
                        </Addnew>
                    </CardFooter> 
            </Card>
            <Card>
                    <CardHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="bg-purple-100 h-12 w-12 rounded-full grid place-items-center">
                                <IconUser className="text-primary" />
                            </div>
                            <div className="space-y-2 col-span-3">
                                 <CardDescription className="font-sans">Total Number of Tenants</CardDescription>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-sans font-semibold tabular-nums @[250px]/card:text-3xl">
                           {data.stats.total_tenants}  <small className="font-sans text-muted-foreground text-xs">Tenants</small>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <Separator className="my-2" />
                        <Addnew
                            label="Add Tenant"
                            title="Add a new Tenant"
                            fullwidth={true}
                            description=""
                        >
                            <AddTenant initialData={null} />
                        </Addnew>
                    </CardFooter> 
            </Card>
        </div>}
        <PropertiesList />
    </>
  )
}
