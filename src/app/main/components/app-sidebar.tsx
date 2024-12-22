import * as React from "react";
import { Mail } from "lucide-react";

import { SearchForm } from "@/app/main/components/search-form";
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
import { NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Arvind",
      url: String(Math.round(Math.random() * 100000000)),
    },
    {
      title: "Nandini",
      url: String(Math.round(Math.random() * 100000000)),
    },
    {
      title: "Akaash",
      url: String(Math.round(Math.random() * 100000000)),
    },
    {
      title: "john",
      url: String(Math.round(Math.random() * 100000000)),
    },
    {
      title: "jane",
      url: String(Math.round(Math.random() * 100000000)),
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-teal-800 text-primary-foreground dark:bg-teal-300">
                  <Mail className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold"> Chattr Inc.</span>
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
            {data.navMain.map((item, index) => (
              <div key={index + item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton className="py-6 text-xl capitalize">
                    <Avatar className="me-4 h-6 w-6">
                      <AvatarImage src="https://avatar.iran.liara.run/public" />
                      <AvatarFallback>[pic]</AvatarFallback>
                    </Avatar>

                    <NavLink to={`/app/${item.url}`}>{item.title}</NavLink>
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