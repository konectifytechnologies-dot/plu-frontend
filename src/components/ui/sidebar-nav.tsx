import { IconHome, IconUsers,IconBuilding,IconWindow,
  IconMoneybag,
  IconSettings,
  IconPlus,
  IconSettings2
 } from '@tabler/icons-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuSub
} from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSidebar } from '@/components/ui/sidebar';
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '@/lib/auth';

export function NavMain() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const location = useLocation();
  const {data:user} = useQuery({
      queryKey:['USER_DATA'],
      queryFn: getLoggedInUser
  })
  const isAgent = user?.role === 'agent';
  const isTenant = user?.role === 'tenant';
 
 

  const items = [
      {
      name: "Home",
      slug: 'home',
      icon: IconHome,
      url:'/account/$role/home',
      display:true
    },
    {
      name: "Landlords",
      slug: "landlords",
      icon: IconUsers,
      url:'/account/$role/landlords',
      display:isAgent ,
    },
    {
      name: "Properties",
      slug: "properties",
      icon: IconBuilding,
      display: !isTenant,
      
      subs:[
        {
          name:'Add Property',
          slug:'add_property',
          icon:IconPlus,
          url:'/account/$role/add_property'
        },
        {
          name: 'Properties',
          slug:'properties',
          icon:IconBuilding,
          url: '/account/$role/properties'
        }
      ]
      //display:isAgent
    },
    {
      name: "Tenants",
      slug: "tenants",
      icon: IconWindow,
      url:'/account/$role/tenants',
      display:!isTenant,
    },
    {
      name: 'Payments',
      slug:'payments',
      icon:IconMoneybag,
      display:true,
      subs: [
        {
          name:'Add Payment',
          slug:'add_payment',
          icon:IconPlus,
          url: '/account/$role/add-payment'
        },
        {
          name:'Payments',
          slug:'payments',
          icon:IconMoneybag,
          url: '/account/$role/payments'
        },

      ]
    },
    {
      name:'Repairs',
      slug:'repairs',
      icon:IconSettings2,
      display:!isTenant,
      subs: [
        {
          name:'Add Repair',
          slug:'add_repair',
          icon:IconPlus,
          url: '/account/$role/add-repairs'
        },
        {
          name:'Repairs',
          slug:'repairs',
          icon:IconSettings,
          url:'/account/$role/repairs'
        }
      ]
    },
    
  ];
  return (
    <SidebarMenu >
      {items.map((item)=> {
          const isOpen = !isCollapsed && openCollapsible === item.slug;
          const hasSubRoutes = !!item.subs?.length;
          const isActive = location.href.includes(item.slug);
          if(!item.display){
            return<></>
          }
          return(
            <SidebarMenuItem key={item.slug}>
              {hasSubRoutes ? (
                  <Collapsible
                    open={isOpen}
                    onOpenChange={(open) =>
                      setOpenCollapsible(open ? item.slug : null)
                    }
                    className="w-full"
                >
                  <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={cn(
                          "flex w-full items-center rounded-lg px-2 transition-colors",
                          isOpen && "bg-sidebar-muted text-foreground",
                          isCollapsed && "justify-center",
                          isActive && 'bg-primary text-white'
                        )}
                      >
                        <item.icon />
                        {!isCollapsed && (
                            <span className="ml-2 flex-1 text-sm font-medium">
                              {item.name}
                            </span>
                        )}
                        {!isCollapsed && hasSubRoutes && (
                          <span className="ml-auto">
                            {isOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </span>
                        )}
                      </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!isCollapsed && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="my-1 ml-3.5 ">
                      {item.subs?.map((subRoute) => (
                        <SidebarMenuSubItem
                          key={`${item.slug}`}
                          className="h-auto"
                        >
                          <SidebarMenuSubButton asChild>
                            
                            <Link
                              to={subRoute.url}
                              className="flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-primary hover:bg-sidebar-muted hover:text-foreground"
                            >
                              <subRoute.icon />
                              {subRoute.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
                </Collapsible>
              ) : (
                <SidebarMenuButton tooltip={item.name} asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center rounded-lg px-2 transition-colors text-primary hover:bg-sidebar-muted hover:text-foreground",
                        isCollapsed && "justify-center",
                        isActive && 'bg-primary text-white'
                      )}
                    >
                      <item.icon />
                      {!isCollapsed && (
                        <span className="ml-2 text-sm font-medium">
                          {item.name}
                        </span>
                      )}
                    </Link>
                </SidebarMenuButton>
              )
            }
            </SidebarMenuItem>
          )
      })}
    </SidebarMenu>
  );
}
