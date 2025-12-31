import { useMemo, useState } from "react";
import { TravelRecap } from "./components/TravelRecap";
import { TravelInput } from "./components/TravelRecapEditor";
import { ThemeType } from "./components/themes";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BasedInData, TravelData } from "./types";

const DEFAULT_BASED_IN: BasedInData = { country: "", flag: "" };
const DEFAULT_THEME: ThemeType = "midnight";
const DEFAULT_TRAVELS: TravelData[] = [];

export default function App() {
  const [showRecap, setShowRecap] = useState(false);
  const [basedIn, setBasedIn] = useLocalStorage(
    "travel-recap-based-in",
    DEFAULT_BASED_IN
  );
  const [theme, setTheme] = useLocalStorage<ThemeType>(
    "travel-recap-theme",
    DEFAULT_THEME
  );
  const [travels, setTravels] = useLocalStorage(
    "travel-recap-travels",
    DEFAULT_TRAVELS
  );

  const formattedTravels = useMemo(
    () =>
      travels.map((t) => ({
        country: t.country,
        flag: t.flag,
        month:
          t.monthFrom === t.monthTo
            ? t.monthFrom
            : `${t.monthFrom}-${t.monthTo}`,
      })),
    [travels]
  );

  if (showRecap) {
    return (
      <TravelRecap
        travels={formattedTravels}
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
