import * as React from "react";
import { NavLink, useParams } from "react-router";
import { SearchForm } from "@/app/main/components/appSidebar/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useCurrentUser } from "../../hooks/useCurrentUer";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { id } = useParams();
  const { data: alluserData } = useAllUsers();
  const { data: userData } = useCurrentUser();
  //   <SidebarMenuSkeleton showIcon />
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Avatar className="me-4 h-8 w-8">
                  <AvatarImage src={userData?.profilepic} />
                  <AvatarFallback>[pic]</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{userData?.fullname}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {alluserData?.map((item: any) => (
              <div key={item.id}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="py-6 text-xl capitalize"
                    isActive={item.id === id}
                  >
                    <Avatar className="me-4 h-6 w-6">
                      <AvatarImage src={item.profilepic} />
                      <AvatarFallback>[pic]</AvatarFallback>
                    </Avatar>

                    <NavLink to={`/app/${item.id}`}>{item.fullname}</NavLink>
                  </SidebarMenuButton>
                  <Separator />
                </SidebarMenuItem>
              </div>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
