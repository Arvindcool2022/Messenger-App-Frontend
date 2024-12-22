import { Mail } from "lucide-react";

import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-800 text-primary-foreground dark:bg-teal-300">
            <Mail className="size-4" />
          </div>
          Chattr Inc.
        </a>
        {children}
      </div>
    </div>
  );
}
