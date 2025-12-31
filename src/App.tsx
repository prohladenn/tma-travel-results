import { useState } from "react";
import { TravelData, TravelInput } from "./components/TravelInput";
import { TravelRecap } from "./components/TravelRecap";

export type ThemeType =
  | "sunset"
  | "ocean"
  | "forest"
  | "purple"
  | "midnight"
  | "coral";

export default function App() {
  const [showRecap, setShowRecap] = useState(false);
  const [basedIn, setBasedIn] = useState({ country: "Czechia", flag: "🇨🇿" });
  const [theme, setTheme] = useState<ThemeType>("sunset");
  const [travels, setTravels] = useState<TravelData[]>([
    { country: "France", flag: "🇫🇷", monthFrom: "Jan", monthTo: "Jan" },
    { country: "Germany", flag: "🇩🇪", monthFrom: "Feb", monthTo: "Feb" },
    { country: "Russia", flag: "🇷🇺", monthFrom: "Feb", monthTo: "Mar" },
    { country: "Azerbaijan", flag: "🇦🇿", monthFrom: "Apr", monthTo: "Apr" },
    { country: "Italy", flag: "🇮🇹", monthFrom: "Jul", monthTo: "Jul" },
    { country: "Germany", flag: "🇩🇪", monthFrom: "Jul", monthTo: "Jul" },
    { country: "Cyprus", flag: "🇨🇾", monthFrom: "Sep", monthTo: "Sep" },
    { country: "Russia", flag: "🇷🇺", monthFrom: "Oct", monthTo: "Nov" },
    { country: "Belarus", flag: "🇧🇾", monthFrom: "Nov", monthTo: "Nov" },
    { country: "Austria", flag: "🇦🇹", monthFrom: "Dec", monthTo: "Dec" },
    { country: "Hungary", flag: "🇭🇺", monthFrom: "Dec", monthTo: "Dec" },
    { country: "Slovakia", flag: "🇸🇰", monthFrom: "Dec", monthTo: "Dec" },
  ]);

  const formatTravelsForRecap = () => {
    return travels.map((t) => ({
      country: t.country,
      flag: t.flag,
      month:
        t.monthFrom === t.monthTo ? t.monthFrom : `${t.monthFrom}-${t.monthTo}`,
    }));
  };

  if (showRecap) {
    return (
      <TravelRecap
        travels={formatTravelsForRecap()}
        basedIn={basedIn}
        theme={theme}
        onBack={() => setShowRecap(false)}
      />
    );
  }

  return (
    <TravelInput
      travels={travels}
      basedIn={basedIn}
      theme={theme}
      onBasedInChange={setBasedIn}
      onThemeChange={setTheme}
      onTravelsChange={setTravels}
      onGenerate={() => setShowRecap(true)}
    />
  );
}
