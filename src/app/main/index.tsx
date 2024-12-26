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
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useSendMessages } from "./hooks/useSendMessages";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Messages } from "./components/messages";
import { useCurrentUser } from "./hooks/useCurrentUer";
import { useChatScroll } from "./hooks/useChatScroll";

export default function Page() {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { data: alluserData } = useAllUsers();
  const { data: profileData } = useCurrentUser();
  const ref = useChatScroll();

  const clearInput = () => {
    setMessage("");
  };
  const mutation = useSendMessages(clearInput);

  const currentPageUserData = (alluserData ?? [])
    .filter((item) => item.id === id)
    .at(0);

  const handleSubmit = () => {
    if (!message) return toast.error("Can't send an empty message");
    if (!id) return;
    mutation.mutate({ id, message });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <section
          className="relative min-h-screen overflow-y-auto"
          //@ts-ignore
          ref={ref} //not working
        >
          <header className="sticky left-0 right-0 top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
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
          {id ? (
            <>
              <div className="flex min-h-screen flex-1 flex-col gap-4 p-4">
                <Messages />
              </div>

              <div className="sticky bottom-0 left-0 right-0 z-10 flex items-center space-x-2 bg-background px-2 py-4">
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
            </>
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-justify">
              <p className="text-xl font-semibold text-stone-500">
                Hello {profileData?.fullname || "Mysterious Stranger"} 👋.
                Welcome to Chattr Inc. 🎉 The ultimate hangout spot for
                connecting with fellow humans (or bots 🤖, we don't judge🤭).
                Click on someone in the sidebar and start chatting 💬—don't
                worry, they're friendly... probably 😅.
              </p>
            </div>
          )}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
