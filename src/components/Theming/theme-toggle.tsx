import { Moon, Sun } from "lucide-react";
import lightOff from "../../assets/light_off.mp3";
import lightOn from "../../assets/light_on.mp3";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/Theming/theme-provider";
import { useRef } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className={className}>
      <audio ref={audioRef} className="hidden" />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setTimeout(() => {
            setTheme();
          }, 500);
          if (!audioRef.current) return;

          audioRef.current.src = theme === "dark" ? lightOn : lightOff;
          audioRef.current.volume = 0.5;
          audioRef.current.play().catch((err) => {
            console.error("Audio playback failed:", err);
          });
        }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
