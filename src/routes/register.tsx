import RegisterForm from '@/components/authcomponents/RegisterForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
         <div className="flex items-center bg-gray-50 justify-center min-h-screen">
                <div className="mx-auto w-full max-w-xs space-y-6">
                    <div className="space-y-2 text-center">
                      <h1 className="text-3xl font-semibold font-sans">Welcome</h1>
                      <p className="text-muted-foreground font-sans">
                        Create your agent account
                      </p>
                    </div>
                    <div className="space-y-5">
                        <div className="space-y-6">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}
