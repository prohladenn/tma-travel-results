import { MapPin } from "lucide-react";

interface TravelEntry {
  country: string;
  flag: string;
  month: string;
}

export function TravelRecap() {
  const travels: TravelEntry[] = [
    { country: "France", flag: "🇫🇷", month: "Jan" },
    { country: "Germany", flag: "🇩🇪", month: "Feb" },
    { country: "Russia", flag: "🇷🇺", month: "Feb-Mar" },
    { country: "Azerbaijan", flag: "🇦🇿", month: "Apr" },
    { country: "Italy", flag: "🇮🇹", month: "Jul" },
    { country: "Germany", flag: "🇩🇪", month: "Jul" },
    { country: "Cyprus", flag: "🇨🇾", month: "Sept" },
    { country: "Russia", flag: "🇷🇺", month: "Oct-Nov" },
    { country: "Belarus", flag: "🇧🇾", month: "Nov" },
    { country: "Austria", flag: "🇦🇹", month: "Dec" },
    { country: "Hungary", flag: "🇭🇺", month: "Dec" },
    { country: "Slovakia", flag: "🇸🇰", month: "Dec" },
  ];

  const uniqueCountries = new Set(travels.map((t) => t.country)).size;
  const monthsOfTravel = 9;

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md aspect-[9/16] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-4 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1 left-1 text-3xl">✈️</div>
            <div className="absolute bottom-1 right-1 text-3xl">🌍</div>
          </div>
          <div className="relative">
            <div className="text-3xl mb-1">✈️</div>
            <h1 className="story-title">2025 Travel Recap</h1>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-2 px-4 py-2.5 bg-gradient-to-b from-orange-50 to-white">
          <div className="text-center">
            <div className="stat-number">{uniqueCountries}</div>
            <div className="stat-label">countries</div>
          </div>
          <div className="text-center">
            <div className="stat-number">{travels.length}</div>
            <div className="stat-label">trips</div>
          </div>
          <div className="text-center">
            <div className="stat-number">{monthsOfTravel}</div>
            <div className="stat-label">months</div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="flex-1 px-4 py-2 overflow-hidden min-h-0 flex">
          <div className="grid grid-cols-3 gap-1.5 w-full h-fit max-h-full my-auto">
            {travels.map((travel, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-lg p-1 shadow-sm border border-orange-100 flex flex-col items-center justify-center"
              >
                <div className="text-xl leading-none">{travel.flag}</div>
                <div className="country-name">{travel.country}</div>
                <div className="month-label">{travel.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-gradient-to-t from-orange-50 to-white border-t border-orange-100">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <MapPin className="size-3 text-orange-600" />
            <span className="text-xs text-gray-600">Based in</span>
            <span className="text-lg">🇨🇿</span>
            <span className="based-country">Czechia</span>
          </div>
          <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-2 rounded-xl shadow-md text-sm transition-all duration-200 active:scale-[0.98]">
            Create your Recap
          </button>
        </div>
      </div>
    </div>
  );
}
