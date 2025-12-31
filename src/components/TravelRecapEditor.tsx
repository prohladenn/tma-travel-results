import { Plus, Trash2 } from "lucide-react";
import { ThemeType } from "../App";

export interface TravelData {
  country: string;
  flag: string;
  monthFrom: string;
  monthTo: string;
}

export interface BasedInData {
  country: string;
  flag: string;
}

interface TravelInputProps {
  travels: TravelData[];
  basedIn: BasedInData;
  theme: ThemeType;
  onBasedInChange: (basedIn: BasedInData) => void;
  onThemeChange: (theme: ThemeType) => void;
  onTravelsChange: (travels: TravelData[]) => void;
  onGenerate: () => void;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COUNTRIES = [
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Czechia", flag: "🇨🇿" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Turkey", flag: "🇹🇷" },
];

const THEMES = [
  {
    id: "sunset" as ThemeType,
    name: "Sunset Vibes",
    gradient: "from-orange-400 via-rose-400 to-pink-500",
    emoji: "🌅",
  },
  {
    id: "ocean" as ThemeType,
    name: "Ocean Breeze",
    gradient: "from-cyan-400 via-blue-400 to-indigo-500",
    emoji: "🌊",
  },
  {
    id: "forest" as ThemeType,
    name: "Forest Green",
    gradient: "from-emerald-400 via-green-400 to-teal-500",
    emoji: "🌲",
  },
  {
    id: "purple" as ThemeType,
    name: "Purple Dream",
    gradient: "from-purple-400 via-fuchsia-400 to-pink-500",
    emoji: "💜",
  },
  {
    id: "midnight" as ThemeType,
    name: "Midnight Sky",
    gradient: "from-slate-700 via-indigo-700 to-purple-800",
    emoji: "🌙",
  },
  {
    id: "coral" as ThemeType,
    name: "Coral Sunset",
    gradient: "from-rose-300 via-coral-400 to-orange-400",
    emoji: "🪸",
  },
];

export function TravelInput({
  travels,
  basedIn,
  theme,
  onBasedInChange,
  onThemeChange,
  onTravelsChange,
  onGenerate,
}: TravelInputProps) {
  const addTravel = () => {
    onTravelsChange([
      ...travels,
      { country: "", flag: "", monthFrom: "", monthTo: "" },
    ]);
  };

  const removeTravel = (index: number) => {
    onTravelsChange(travels.filter((_, i) => i !== index));
  };

  const updateTravel = (
    index: number,
    field: keyof TravelData,
    value: string
  ) => {
    const updated = [...travels];
    if (field === "country") {
      const country = COUNTRIES.find((c) => c.name === value);
      updated[index] = {
        ...updated[index],
        country: value,
        flag: country?.flag || "",
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    onTravelsChange(updated);
  };

  const updateBasedIn = (countryName: string) => {
    const country = COUNTRIES.find((c) => c.name === countryName);
    if (country) {
      onBasedInChange({ country: country.name, flag: country.flag });
    }
  };

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl mb-2 text-center text-gray-800">
            Travel Recap Editor
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Add your travels and generate your recap
          </p>

          {/* Based In Section */}
          <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <label className="block mb-2 text-gray-700">Based in</label>
            <select
              value={basedIn.country}
              onChange={(e) => updateBasedIn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {COUNTRIES.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Country</th>
                  <th className="text-left py-3 px-4 text-gray-700">
                    Month From
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700">
                    Month To
                  </th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {travels.map((travel, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <select
                        value={travel.country}
                        onChange={(e) =>
                          updateTravel(index, "country", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={travel.monthFrom}
                        onChange={(e) =>
                          updateTravel(index, "monthFrom", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select month</option>
                        {MONTHS.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={travel.monthTo}
                        onChange={(e) =>
                          updateTravel(index, "monthTo", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select month</option>
                        {MONTHS.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => removeTravel(index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <button
              onClick={addTravel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
            >
              <Plus className="size-5" />
              Add Trip
            </button>
          </div>

          {/* Theme Selection */}
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <label className="block mb-3 text-gray-700">Choose Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => onThemeChange(themeOption.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    theme === themeOption.id
                      ? "border-indigo-500 bg-white shadow-md scale-105"
                      : "border-gray-200 bg-white/50 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`h-8 w-full bg-gradient-to-r ${themeOption.gradient} rounded mb-2`}
                  ></div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span>{themeOption.emoji}</span>
                    <span className="text-sm text-gray-700">
                      {themeOption.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex">
            <button
              onClick={onGenerate}
              disabled={
                travels.length === 0 ||
                travels.some((t) => !t.country || !t.monthFrom)
              }
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl shadow-lg transition-all duration-200"
            >
              Generate Travel Recap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
