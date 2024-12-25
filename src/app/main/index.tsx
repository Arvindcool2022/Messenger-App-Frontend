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
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useGetCurrentConv } from "./hooks/useGetCurrentConv";
import { useSendMessages } from "./hooks/useSendMessages";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "./hooks/useCurrentUer";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { data: profileData } = useCurrentUser();
  const { data: alluserData } = useAllUsers();
  const currentPageUserData = (alluserData ?? [])
    .filter((item) => item.id === id)
    .at(0);
  const { data, error, isPending } = useGetCurrentConv(id);
  const clearInput = () => {
    setMessage("");
  };

  const mutation = useSendMessages(clearInput);

  const handleSubmit = () => {
    if (!message) return toast.error("Can't send an empty message");
    if (!id) return;
    mutation.mutate({ id, message });
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <section className="relative bg-inherit">
          <header className="sticky left-0 right-0 top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-inherit px-4">
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
          <div className="flex min-h-screen flex-1 flex-col gap-4 p-4">
            {!data ? (
              <MessageSkeleton />
            ) : (
              data.messages.map((item) => {
                // if(item.senderId === id)
                return (
                  <div className="p-4" key={item.id}>
                    <div
                      className={cn(
                        "w-fit max-w-3xl rounded-md border bg-teal-900 p-4",
                        {
                          "ms-auto bg-emerald-900":
                            item.senderId === profileData?.id,
                        },
                      )}
                    >
                      {item.body.split("\n").map((sentence) => (
                        <p>{sentence}</p>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="sticky bottom-0 left-0 right-0 flex items-center space-x-2 bg-inherit px-2 py-4">
            <Textarea
              disabled={!id}
              rows={1}
              className="flex-grow"
              placeholder="send message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button
              variant="outline"
              disabled={!message || mutation.isPending || !id}
              onClick={handleSubmit}
            >
              <Send />
            </Button>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}

function MessageSkeleton() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => {
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
    </>
  );
}
