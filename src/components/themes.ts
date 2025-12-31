export type ThemeType =
  | "sunset"
  | "ocean"
  | "forest"
  | "purple"
  | "midnight"
  | "coral";

export interface Theme {
  background: string;
  header: string;
  headerAccent: string;
  statsBar: string;
  cardBg: string;
  cardBorder: string;
  footer: string;
  footerBorder: string;
  button1: string;
  button2: string;
  accentColor: string;
}

export interface ThemeOption {
  id: ThemeType;
  name: string;
  gradient: string;
  emoji: string;
}

export const themes: Record<ThemeType, Theme> = {
  sunset: {
    background: "from-orange-400 via-rose-400 to-pink-500",
    header: "from-orange-500 to-rose-500",
    headerAccent: "text-orange-100",
    statsBar: "from-orange-50 to-white",
    cardBg: "from-orange-50 to-rose-50",
    cardBorder: "border-orange-100",
    footer: "from-orange-50 to-white",
    footerBorder: "border-orange-100",
    button1: "from-orange-500 to-rose-500",
    button2: "from-rose-500 to-pink-500",
    accentColor: "text-orange-600",
  },
  ocean: {
    background: "from-cyan-400 via-blue-400 to-indigo-500",
    header: "from-cyan-500 to-blue-500",
    headerAccent: "text-cyan-100",
    statsBar: "from-cyan-50 to-white",
    cardBg: "from-cyan-50 to-blue-50",
    cardBorder: "border-cyan-100",
    footer: "from-cyan-50 to-white",
    footerBorder: "border-cyan-100",
    button1: "from-cyan-500 to-blue-500",
    button2: "from-blue-500 to-indigo-500",
    accentColor: "text-cyan-600",
  },
  forest: {
    background: "from-emerald-400 via-green-400 to-teal-500",
    header: "from-emerald-500 to-green-500",
    headerAccent: "text-emerald-100",
    statsBar: "from-emerald-50 to-white",
    cardBg: "from-emerald-50 to-green-50",
    cardBorder: "border-emerald-100",
    footer: "from-emerald-50 to-white",
    footerBorder: "border-emerald-100",
    button1: "from-emerald-500 to-green-500",
    button2: "from-green-500 to-teal-500",
    accentColor: "text-emerald-600",
  },
  purple: {
    background: "from-purple-400 via-fuchsia-400 to-pink-500",
    header: "from-purple-500 to-fuchsia-500",
    headerAccent: "text-purple-100",
    statsBar: "from-purple-50 to-white",
    cardBg: "from-purple-50 to-fuchsia-50",
    cardBorder: "border-purple-100",
    footer: "from-purple-50 to-white",
    footerBorder: "border-purple-100",
    button1: "from-purple-500 to-fuchsia-500",
    button2: "from-fuchsia-500 to-pink-500",
    accentColor: "text-purple-600",
  },
  midnight: {
    background: "from-slate-700 via-indigo-700 to-purple-800",
    header: "from-slate-600 to-indigo-600",
    headerAccent: "text-slate-200",
    statsBar: "from-slate-800/30 to-indigo-900/20",
    cardBg: "from-slate-700/50 to-indigo-700/50",
    cardBorder: "border-indigo-400/30",
    footer: "from-slate-800/30 to-indigo-900/20",
    footerBorder: "border-indigo-400/30",
    button1: "from-indigo-500 to-purple-500",
    button2: "from-purple-500 to-fuchsia-500",
    accentColor: "text-indigo-300",
  },
  coral: {
    background: "from-rose-300 via-orange-300 to-amber-400",
    header: "from-rose-400 to-orange-400",
    headerAccent: "text-rose-100",
    statsBar: "from-rose-50 to-white",
    cardBg: "from-rose-50 to-orange-50",
    cardBorder: "border-rose-100",
    footer: "from-rose-50 to-white",
    footerBorder: "border-rose-100",
    button1: "from-rose-400 to-orange-400",
    button2: "from-orange-400 to-amber-400",
    accentColor: "text-rose-600",
  },
};

export const themeOptions: ThemeOption[] = [
  {
    id: "sunset",
    name: "Sunset Vibes",
    gradient: "from-orange-400 via-rose-400 to-pink-500",
    emoji: "🌅",
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    gradient: "from-cyan-400 via-blue-400 to-indigo-500",
    emoji: "🌊",
  },
  {
    id: "forest",
    name: "Forest Green",
    gradient: "from-emerald-400 via-green-400 to-teal-500",
    emoji: "🌲",
  },
  {
    id: "purple",
    name: "Purple Dream",
    gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
    emoji: "💜",
  },
  {
    id: "midnight",
    name: "Midnight Sky",
    gradient: "from-slate-700 via-indigo-700 to-purple-800",
    emoji: "🌙",
  },
  {
    id: "coral",
    name: "Coral Sunset",
    gradient: "from-rose-300 via-orange-300 to-amber-400",
    emoji: "🪸",
  },
];
