export interface Country {
  name: string;
  flag: string;
}

export interface CountryRegion {
  region: string;
  countries: Country[];
}

export const COUNTRIES: Country[] = [
  // Europe
  { name: "Austria", flag: "🇦🇹" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Czechia", flag: "🇨🇿" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Malta", flag: "🇲🇹" },
  { name: "Monaco", flag: "🇲🇨" },
  { name: "Montenegro", flag: "🇲🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Slovenia", flag: "🇸🇮" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "United Kingdom", flag: "🇬🇧" },

  // Asia
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "China", flag: "🇨🇳" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Taiwan", flag: "🇹🇼" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Vietnam", flag: "🇻🇳" },

  // Africa
  { name: "Botswana", flag: "🇧🇼" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Madagascar", flag: "🇲🇬" },
  { name: "Mauritius", flag: "🇲🇺" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Namibia", flag: "🇳🇦" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Seychelles", flag: "🇸🇨" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Zimbabwe", flag: "🇿🇼" },

  // North America
  { name: "Bahamas", flag: "🇧🇸" },
  { name: "Barbados", flag: "🇧🇧" },
  { name: "Belize", flag: "🇧🇿" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Cuba", flag: "🇨🇺" },
  { name: "Dominican Republic", flag: "🇩🇴" },
  { name: "Jamaica", flag: "🇯🇲" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "United States", flag: "🇺🇸" },

  // South America
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Bolivia", flag: "🇧🇴" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Ecuador", flag: "🇪🇨" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Uruguay", flag: "🇺🇾" },

  // Oceania
  { name: "Australia", flag: "🇦🇺" },
  { name: "Fiji", flag: "🇫🇯" },
  { name: "New Zealand", flag: "🇳🇿" },
];

export const COUNTRIES_BY_REGION: CountryRegion[] = [
  {
    region: "Europe",
    countries: COUNTRIES.slice(0, 36),
  },
  {
    region: "Asia",
    countries: COUNTRIES.slice(36, 64),
  },
  {
    region: "Africa",
    countries: COUNTRIES.slice(64, 78),
  },
  {
    region: "North America",
    countries: COUNTRIES.slice(78, 89),
  },
  {
    region: "South America",
    countries: COUNTRIES.slice(89, 97),
  },
  {
    region: "Oceania",
    countries: COUNTRIES.slice(97),
  },
];
