import {Sidebar,SidebarContent, SidebarHeader} from "@/components/ui/sidebar"
import { NavMain } from "./sidebar-nav"
import { NavFooter } from "./nav-footer";



export function AppSidebar() {

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader >
        <h6>PLU Developers</h6>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <NavMain  />
      </SidebarContent>
      <NavFooter />
    </Sidebar>
  );
} 