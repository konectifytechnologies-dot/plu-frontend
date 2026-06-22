import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query';
import { getInvoice } from '@/queries/fetchQueries';

type PropertyRouteParams = {
  id: string
}

export const Route = createFileRoute('/invoice/$id')({
  pendingComponent:()=> (<div>Loading...</div>),
    loader: ({ params, context } :{params:PropertyRouteParams; context:any}) => {
      const {id } = params
      return context.queryClient.ensureQueryData(
        getInvoice(id)
      )
    },
  component: RouteComponent,
})

function RouteComponent() {
    const {id} = Route.useParams()
    const {data} =  useSuspenseQuery(getInvoice(id));
  return (
    <>
        <section className='bg-gray-50'>
             <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen flex flex-col justify-center rounded shadow-sm my-6" id="invoice">
                <div className="grid grid-cols-2 items-center">
                    <div>
                       <h2 className='uppercase'>{data.agent.name}</h2>
                    </div>
                    <div className="text-right">
                        <p>{data.agent.name}</p>
                        <p className="text-gray-500 text-sm">{data.agent.email}</p>
                        <p className="text-gray-500 text-sm mt-1">{data.agent.number}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center mt-8">
                     <div>
                        <p className="font-bold text-gray-800">Bill To:</p>
                        <p className="text-gray-500">{data.invoice_data.name}<br />{data.invoice_data.number}</p>
                    </div>
                    <div className="text-right">
                            <p className="">Invoice number:<span className="text-gray-500 font-semibold">{data.invoice_number}</span></p>
                            
                            <p>
                                Invoice date: <span className="text-gray-500 font-semibold">{data.created_at}</span>
                                <br />
                                Due date:<span className="text-gray-500 font-semibold">{data.due_date}</span>
                            </p>
                    </div>

                </div>
                <div className="-mx-4 mt-8 flow-root sm:mx-0">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-300 text-gray-900">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Description</th> 
                                   
                                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                                </tr>
                            </thead>  
                            <tbody>
                                {data.items.map((item)=>(
                                    <tr key={item.id} className="border-b border-gray-200">
                                        <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="font-medium text-gray-900">{item.description}</div>
                                        </td>
                                        
                                        <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">KES {item.total}</td>
                                    </tr>
                                ))}
                            </tbody> 
                            <tfoot>
                                <tr>
                                    
                                    <th scope="row" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Total</th>
                                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">KES {data.total_amount}</td>
                                </tr>
                               
                            </tfoot>
                        </table>                    
                </div>
             </div>
        </section>
    </>
  )
}
