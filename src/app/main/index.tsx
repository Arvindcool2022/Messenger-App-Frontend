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

export default function Page() {
  const { id } = useParams();
  console.log(id);
  const { data: alluserData } = useAllUsers();
  const currentPageUserData = (alluserData ?? [])
    .filter((item) => item.id === id)
    .at(0);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 h-16 w-16 [&_svg]:size-8" />
          {/* ! why wont you grow */}
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Avatar className="me-4 h-10 w-10">
            <AvatarImage src={currentPageUserData?.profilepic} />
            <AvatarFallback>[pic]</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold">
            {currentPageUserData?.fullname}
          </h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Skeleton className="aspect-video rounded-xl bg-muted/50" />
            <Skeleton className="aspect-video rounded-xl bg-muted/50" />
            <Skeleton className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <Skeleton className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
