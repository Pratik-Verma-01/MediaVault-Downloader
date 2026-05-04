export type Platform = "youtube" | "instagram" | "tiktok" | "twitter" | "generic";

export const detectPlatform = (url: string): Platform => {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("twitter.com") || u.includes("x.com")) return "twitter";
  return "generic";
};

export const platformMeta: Record<Platform, { name: string; color: string; tagBg: string; tagBorder: string }> = {
  youtube: {
    name: "YouTube",
    color: "#FF0033",
    tagBg: "bg-[#FF0033]/10",
    tagBorder: "border-[#FF0033]/40",
  },
  instagram: {
    name: "Instagram",
    color: "#E1306C",
    tagBg: "bg-[#E1306C]/10",
    tagBorder: "border-[#E1306C]/40",
  },
  tiktok: {
    name: "TikTok",
    color: "#25F4EE",
    tagBg: "bg-[#25F4EE]/10",
    tagBorder: "border-[#25F4EE]/40",
  },
  twitter: {
    name: "Twitter / X",
    color: "#FFFFFF",
    tagBg: "bg-white/10",
    tagBorder: "border-white/30",
  },
  generic: {
    name: "Web",
    color: "#00F2FE",
    tagBg: "bg-neon-cyan/10",
    tagBorder: "border-neon-cyan/40",
  },
};
