import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '@/components/authcomponents/LoginForm'
import { redirect } from '@tanstack/react-router'
import { getLoggedInUser } from '@/lib/auth'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/login')({
  beforeLoad: async()=> {
      const user = await getLoggedInUser()
      console.log(user);
      if(user){
        throw redirect({
          to:"/account/$role/home",
          params:{role:user.role}
        })
      }
      
      return {}
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="flex items-center bg-gray-50 justify-center min-h-screen">
        <div className="mx-auto w-full max-w-xs space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold font-sans">Welcome back</h1>
              <p className="text-muted-foreground font-sans">
                Sign in to access to your dashboard, settings and properties etc.
              </p>
            </div>
            <div className="space-y-5">
                  <div className="space-y-6">
                    <LoginForm />
                  </div>
            </div>
            <Button variant="outline" className='w-full' asChild><Link to="/register" >Create Account</Link></Button>
        </div>
      </div>
    </>
  )
}
