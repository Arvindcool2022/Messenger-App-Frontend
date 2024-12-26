import { cn } from "@/lib/utils";
import { useCurrentUser } from "../../hooks/useCurrentUer";
import { TMessages, useGetCurrentConv } from "../../hooks/useGetCurrentConv";
import { Skeleton } from "@/components/ui/skeleton";

export const Messages = () => {
  const { data, isLoading } = useGetCurrentConv();

  if (!data?.messages && !isLoading) return <h1>no converstation</h1>;

  if (!data?.messages && isLoading) return <MessageSkeleton />;

  if (data?.messages)
    return (
      <>
        {data.messages?.map((item) => (
          <MessageBubble item={item} key={item.id} />
        ))}
      </>
    );
};

const MessageSkeleton = () => (
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

type MessageBubbleProps = {
  item: TMessages;
};

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
} as const;

const MessageBubble = ({ item }: MessageBubbleProps) => {
  const { data: profileData } = useCurrentUser();

  return (
    <div className="relative p-4" key={item.id}>
      <div
        className={cn(
          "w-fit max-w-3xl rounded-md border bg-chat-secondary p-4 pb-2",
          {
            "ms-auto bg-chat-primary": item.senderId === profileData?.id,
          },
        )}
      >
        {item.body
          ?.split("\n")
          .map((sentence, i) => <p key={sentence + i}>{sentence}</p>)}
      </div>
      <span
        key={item.id}
        className={cn(
          "text-p absolute bottom-0 mt-4 text-xs font-extralight text-muted-foreground",
          {
            "left-2": item.senderId !== profileData?.id,
            "right-2": item.senderId === profileData?.id,
          },
        )}
      >
        {new Date(item.createdAt).toLocaleDateString(
          navigator.language,
          options,
        )}
      </span>
    </div>
  );
};
