import {Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { SidebarInset, SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/appsidebar'
import { getLoggedInUser } from '@/lib/auth'

export const Route = createFileRoute('/account')({
  beforeLoad: async()=> {
      const user = await getLoggedInUser()
      if(!user){
        throw redirect({to:'/login'})
      }
      return {user}
  },
  component: AccountLayout,
})

function AccountLayout() {

  
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="sm:hidden" />
            </div>
          </header>
            <div className="container mx-auto md:px-8">    
                 <Outlet />
            </div>
          
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
