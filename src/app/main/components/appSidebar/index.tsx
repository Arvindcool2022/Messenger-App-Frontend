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
import { Button } from "@/components/ui/button";
import { useLogout } from "../../hooks/useLogout";
import { ComponentProps, useState } from "react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const { data: alluserData } = useAllUsers();
  const filteredUserData = alluserData?.filter((item) => {
    if (!search) return item;
    return item.fullname.includes(search);
  });
  const { data: userData } = useCurrentUser();
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };
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
                <Button
                  onClick={handleLogout}
                  size="sm"
                  variant="destructive"
                  className="ms-auto h-6 rounded-sm px-1"
                >
                  logout
                </Button>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm setSearch={setSearch} search={search} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredUserData?.map((item: any) => (
              <div key={item.id}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="py-6 text-xl capitalize"
                    isActive={item.id === id}
                    asChild
                  >
                    <NavLink to={`/app/${item.id}`}>
                      <Avatar className="me-4 h-6 w-6">
                        <AvatarImage src={item.profilepic} />
                        <AvatarFallback>[pic]</AvatarFallback>
                      </Avatar>
                      <span>{item.fullname}</span>
                    </NavLink>
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
