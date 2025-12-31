import { Plus, Trash2 } from "lucide-react";
import { COUNTRIES, COUNTRIES_BY_REGION, MONTHS } from "../data/countries";
import { ThemeType, themeOptions } from "./themes";

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
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h1 className="text-3xl mb-2 text-center text-gray-800">
            Travel Recap Editor
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Add your travels and generate your recap
          </p>

          {/* Based In Section */}
          <div className="mb-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Based in
              </label>
              <select
                value={basedIn.country}
                onChange={(e) => updateBasedIn(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {COUNTRIES_BY_REGION.map((region) => (
                  <optgroup key={region.region} label={region.region}>
                    {region.countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Travels Section */}
          <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200">
            <div className="py-2">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-1.5 px-1 text-sm font-semibold text-gray-700">
                      Country
                    </th>
                    <th className="text-left py-1.5 px-1 text-sm font-semibold text-gray-700 w-28">
                      Month From
                    </th>
                    <th className="text-left py-1.5 px-1 text-sm font-semibold text-gray-700 w-28">
                      Month To
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {travels.map((travel, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-1.5 px-1">
                        <select
                          value={travel.country}
                          onChange={(e) =>
                            updateTravel(index, "country", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select country</option>
                          {COUNTRIES_BY_REGION.map((region) => (
                            <optgroup key={region.region} label={region.region}>
                              {region.countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                  {country.flag} {country.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </td>
                      <td className="py-1.5 px-1 w-28">
                        <select
                          value={travel.monthFrom}
                          onChange={(e) =>
                            updateTravel(index, "monthFrom", e.target.value)
                          }
                          className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm text-gray-600 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                          <option value="">Select month</option>
                          {MONTHS.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-1.5 px-1 w-28">
                        <select
                          value={travel.monthTo}
                          onChange={(e) =>
                            updateTravel(index, "monthTo", e.target.value)
                          }
                          className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm text-gray-600 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                          <option value="">Select month</option>
                          {MONTHS.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-1.5 px-1 text-right">
                        <button
                          onClick={() => removeTravel(index)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors inline-flex"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3">
              <button
                onClick={addTravel}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/80 hover:bg-white text-gray-700 rounded-xl transition-colors"
              >
                <Plus className="size-5" />
                Add Trip
              </button>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Choose Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {themeOptions.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => onThemeChange(themeOption.id)}
                  className={`p-2 rounded-lg border-2 transition-all ${
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
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-2.5 rounded-xl shadow-lg transition-all duration-200"
            >
              Generate Travel Recap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
