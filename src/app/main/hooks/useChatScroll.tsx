import { useEffect, useRef } from "react";
import { useGetCurrentConv } from "./useGetCurrentConv";

export const useChatScroll = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { data } = useGetCurrentConv();

  useEffect(() => {
    const scroll = () => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
        console.info({
          scrollTop: ref.current.scrollTop,
          scrollHeight: ref.current.scrollHeight,
        });
      }
    };

    requestAnimationFrame(scroll);
  }, [data]);

  return ref;
};
