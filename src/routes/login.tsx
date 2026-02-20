import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import LoginForm from '@/components/authcomponents/LoginForm'
import { redirect } from '@tanstack/react-router'
import { getLoggedInUser } from '@/lib/auth'


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
                 <Button variant="outline" className="w-full justify-center gap-2 cursor-pointer">
                    <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                            </path>
                    </svg>
                    Sign in with Google
                  </Button>
                  <div className="flex items-center gap-2">
                    <Separator className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                        or sign in with email
                        </span>
                    <Separator className="flex-1" />
                  </div>
                  <div className="space-y-6">
                    <LoginForm />
                  </div>
            </div>
        </div>
      </div>
    </>
  )
}
