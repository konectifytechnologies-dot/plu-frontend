import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "./sidebar";
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
 } from "./dropdown-menu";
import {  Avatar, AvatarFallback } from "./avatar";
import { useQuery } from "@tanstack/react-query";
import {LogOut,User,} from "lucide-react";
import { logOut } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { abbreviateNameInitials } from "@/lib/utilFunctions";
import { getLoggedInUser } from "@/lib/auth";


export function NavFooter() {
    const navigate = useNavigate()
    const logout = async()=> {
        const data = await logOut();
        console.log(data);
        navigate({to:'/login', replace:true}) 
    } 
    const {data:user, isLoading, isError, error} = useQuery({
        queryKey:['USER_DATA'],
        queryFn: getLoggedInUser
    })
  return (
    <SidebarFooter className="p-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-foreground">
                            <h6 className="text-slate-900 bg-white ">
                                {user && abbreviateNameInitials(user?.name)}
                            </h6>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user?.name}</span>
                            <span className="truncate text-xs">{user?.role}</span>
                        </div>
                    </SidebarMenuButton>
                 
                </DropdownMenuTrigger>
                <DropdownMenuContent className="m-2">
                  <DropdownMenuItem>
                    <User
                      size={16}
                      className="opacity-80"
                      aria-hidden="true"
                    />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut
                      size={16}
                      className="opacity-80"
                      aria-hidden="true"
                    />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              
            </div>
            
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}