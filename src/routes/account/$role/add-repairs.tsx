import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Field, FieldLabel} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useGetProperties } from '@/hooks/useGetProperties'
import { Separator } from '@/components/ui/separator'
import { useId } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'
import Dropdown from '@/components/ui/dropdown'
import { Input } from '@/components/ui/input'
import { useSetState } from '@mantine/hooks'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import Submitbtn from '@/components/ui/submitbtn'
import { apiRequest } from '@/lib/apirequest'
import { toast } from 'sonner'

export const Route = createFileRoute('/account/$role/add-repairs')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultItems = [
    {
        id:useId(),
        title:'',
        price:0
    },
    {
        id:useId(),
        title:'',
        price:0
    },
    {
        id:useId(),
        title:'',
        price:0
    },

]
 const [repairItems, setRepairItems] = useState(defaultItems);
 const [repair, setRepair] = useSetState({
  description:'',
  property_id:'',
  house:'',
  unit:'',
  unit_id:'',
  cost:0,

 })

  const {properties} = useGetProperties()
  const [loading, setLoading] = useState(false)
  const items = properties && properties.data.map((item)=> {
    return {name:item.name, id:item.id}
  })
  const {data:units} = useQuery({
          queryKey: ['PROPERTY_UNITS', {id:repair.property_id}],
          queryFn:async()=> {
              const {data} = await axios.get(`/api/property/units/${repair.property_id}`)
              return data
          },
          enabled:!!repair.property_id
  });

  const unitItems = units && units.map((item)=> {
    return {name:item.name, id:item.id}
  })

  const addrepairs = async()=> {
      setLoading(true)
      const params = {
        description:repair.description,
        property_id:repair.property_id,
        unit_id:repair.unit_id,
        cost:repair.cost,
        items:repairItems
      }

      const {data,error} = await apiRequest(()=> 
          axios.post('/api/repair', params)
      )  
      if(error){
        setLoading(false)
        console.log(error)
      }
      if(data){
        setLoading(false);
        setRepair({
            description:'',
            property_id:'',
            house:'',
            unit_id:'',
            unit:'',
            cost:0,
        })
        toast(data.message,{position:'top-center'})
      } 

      console.log(data);
  }
  return (
    <>
        <Card>
          <CardHeader>
            <CardTitle>Add a Repair</CardTitle>
            <CardDescription>
              Add a new repair or maintenance job
            </CardDescription>
          </CardHeader>
          <CardContent>
              <form action="#">
                 <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea value={repair.description} onChange={(e)=> setRepair({description:e.target.value})} />
                  </Field>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 py-4">
                    <div className="col-span-full sm:col-span-3">
                        {properties && <Field className="gap-2">
                          <FieldLabel htmlFor="first-name"> Select Property</FieldLabel>
                          <Dropdown 
                            items={items} 
                            value={repair.house}
                            placeholder="Select Property" 
                            handleChange={(item=> {
                              setRepair({house:item.name, property_id:item.id})
                            })} 
                          />
                        </Field>}
                      </div>
                      <div className="col-span-full sm:col-span-3">
                        {units && <Field className="gap-2">
                          <FieldLabel htmlFor="first-name"> Select House</FieldLabel>
                          <Dropdown 
                            items={unitItems} 
                            value={repair.unit}
                            placeholder="Select Property" 
                            handleChange={(item=> {
                              setRepair({unit:item.name, unit_id:item.id})
                            })} 
                          />
                        </Field>}
                      </div>
                  </div>
                   <Field>
                        <FieldLabel>Estimated Repair Cost</FieldLabel>
                        <Input type='number' value={repair.cost} onChange={(e)=>setRepair({cost:e.target.valueAsNumber})} />
                    </Field>  
                     <Separator className="my-6" />
                    <RepairItems setRepairItems={setRepairItems} repairItems={repairItems}/> 
                    <Separator className='my-4' />
                    <Submitbtn text="Add Repair" type="button" fullwidth={true} btnfn={addrepairs} loading={loading} />     
              </form>
          </CardContent>
        </Card>
      
    </>
  )
}

export const RepairItems = ({repairItems, setRepairItems})=> {
const item = {id:useId(), title:'', price:0}
const addRepairItem = () => {
  setRepairItems((prev) => [...prev, item]);
};

function updateRepairItem(id,field,value) {
  setRepairItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: field === "price" ? Number(value) || 0 : value,
          }
        : item
    )
  );
}


const removeRepairItem = (id) => {
  setRepairItems((prev) => prev.filter((item) => item.id !== id));
};
    return(
        <>
            <div className="">
                <div className="py-2">
                    <h3 className="text-2xl font-sans font-semibold text-foreground dark:text-foreground">
                        Add a Repair Items
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground dark:text-muted-foreground">
                        Add a new repair items
                    </p>
                </div>
                {repairItems.map((item)=> {
                    return(
                        <div className="grid grid-cols-3 gap-2 items-center py-2">
                            <Field>
                                <FieldLabel className="text-sm">Item name</FieldLabel>
                                <Input 
                                    type="text" 
                                    value={item.title}
                                    onChange={(e) =>
                                        updateRepairItem(item.id, "title", e.target.value)
                                    }
                                />
                            </Field>
                            <Field>
                                <FieldLabel className="text-sm">Item Cost</FieldLabel>
                                <Input 
                                    type="number"
                                    value={item.price}
                                    onChange={(e) =>
                                        updateRepairItem(item.id, "price", e.target.value)
                                    }
                                />
                            </Field>
                           <div>
                            <Label><span className="text-white">btn</span></Label>
                           
                            <Button type="button" variant="outline" onClick={()=>removeRepairItem(item.id)}><IconTrash className="text-destructive"/></Button>
                           </div>
                        </div>
                    )
                })}
            </div>
            <br />
            <Button type="button" onClick={addRepairItem}><IconPlus />Add repair Item</Button>
            <br />
        </>
    )
}
