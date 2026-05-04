import { Globe } from "lucide-react";
import type { Platform } from "@/lib/platforms";

interface Props {
  platform: Platform;
  className?: string;
}

const PlatformLogo = ({ platform, className = "h-4 w-4" }: Props) => {
  switch (platform) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            fill="#FF0033"
            d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8Z"
          />
          <path fill="#fff" d="m9.6 15.6 6.3-3.6-6.3-3.6Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <defs>
            <linearGradient id="igGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FEDA75" />
              <stop offset="0.3" stopColor="#FA7E1E" />
              <stop offset="0.6" stopColor="#D62976" />
              <stop offset="0.85" stopColor="#962FBF" />
              <stop offset="1" stopColor="#4F5BD5" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#igGrad)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
          <circle cx="17" cy="7" r="1.1" fill="#fff" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            fill="#25F4EE"
            d="M14.5 2.5h-2.7v13.6a2.7 2.7 0 1 1-2.7-2.7v-2.6a5.3 5.3 0 1 0 5.3 5.3V8.7a7.6 7.6 0 0 0 4.5 1.5V7.6A4.6 4.6 0 0 1 14.5 2.5Z"
          />
          <path
            fill="#FE2C55"
            d="M16 4h-2.7v13.6a2.7 2.7 0 1 1-2.7-2.7v-2.6A5.3 5.3 0 1 0 16 17.6V10.2a7.6 7.6 0 0 0 4.5 1.5V9.1A4.6 4.6 0 0 1 16 4Z"
          />
          <path
            fill="#fff"
            fillOpacity="0.9"
            d="M15.2 3.2h-2.6v13.6a2.7 2.7 0 1 1-2.7-2.7v-2.6A5.3 5.3 0 1 0 15.2 16.8V9.4a7.6 7.6 0 0 0 4.5 1.5V8.3a4.6 4.6 0 0 1-4.5-5.1Z"
          />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path
            fill="#fff"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"
          />
        </svg>
      );
    default:
      return <Globe className={className} style={{ color: "hsl(187 100% 60%)" }} strokeWidth={2} />;
  }
};

export default PlatformLogo;
