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
import { ComponentProps, useEffect, useState } from "react";
import { useOnlineUser } from "../../hooks/useOnlineusers";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const { data: alluserData, isLoading: alluserIsLoading } = useAllUsers();
  const { data: userData } = useCurrentUser();
  const onlineUsers = useOnlineUser();
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };

  useEffect(() => {
    if (!alluserIsLoading && alluserData) {
      alluserData.forEach((user) => {
        user.isOnline = onlineUsers.includes(user.id);
      });
    }
  }, [alluserIsLoading, alluserData, onlineUsers]);

  const filteredUserData = alluserData?.filter((item) => {
    if (!search) return item;
    return item.fullname.includes(search);
  });
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
            {filteredUserData?.map((item) => (
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
                      {item.isOnline && (
                        <div className="right-0 top-0 z-20 ms-auto h-2 w-2 rounded-full bg-green-500" />
                      )}
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
