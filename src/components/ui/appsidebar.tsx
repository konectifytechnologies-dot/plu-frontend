import {Sidebar,SidebarContent, SidebarHeader, useSidebar} from "@/components/ui/sidebar"
import { NavMain } from "./sidebar-nav"
import { NavFooter } from "./nav-footer";
import { cn } from "@/lib/utils";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
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