import { createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'
import { getLoggedInUser } from '@/lib/auth'


export const Route = createFileRoute('/')({
  beforeLoad: async()=> {
        const user = await getLoggedInUser()
        console.log(user);
        if(!user){
          throw redirect({to:'/login'})
        }else{
          throw redirect({
            to:'/account/$role/home',
            params:{role:user.role}
          })
        }
        
        
    },
 //component: App,
})

function App() {
  return (
    <section>
        <h2>welcome</h2>
    </section>
  )
}
