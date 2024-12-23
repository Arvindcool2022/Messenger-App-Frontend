import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useParams } from "react-router";
import { AppSidebar } from "./components/appSidebar";
import { useAllUsers } from "./hooks/useAllUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useGetCurrentConv } from "./hooks/useGetCurrentConv";

export default function Page() {
  const { id } = useParams();
  const { data: alluserData } = useAllUsers();
  const currentPageUserData = (alluserData ?? [])
    .filter((item) => item.id === id)
    .at(0);
  const { data, error, isPending } = useGetCurrentConv(id);
  console.log(data);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 h-16 w-16 [&_svg]:size-8" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {currentPageUserData && (
            <>
              <Avatar className="me-4 h-10 w-10">
                <AvatarImage src={currentPageUserData?.profilepic} />
                <AvatarFallback>[pic]</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-semibold">
                {currentPageUserData?.fullname}
              </h1>
            </>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <Skeleton
                key={i}
                className={cn("h-10 w-52 rounded-3xl", {
                  "h-20 w-80": !(i % 5),
                  "self-end": i & 1,
                })}
              />
            );
          })}
        </div>
        <div className="flex w-full items-center space-x-2 px-2 py-4">
          <Input className="w-full" type="text" placeholder="send message..." />
          <Button variant="outline">
            <Send />
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
