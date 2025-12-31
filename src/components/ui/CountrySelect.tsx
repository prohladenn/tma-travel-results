import { COUNTRIES_BY_REGION } from "../../data/countries";

interface CountrySelectProps {
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
  className?: string;
}

export function CountrySelect({
  value,
  onChange,
  placeholder = "Select country",
  className = "",
}: CountrySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">{placeholder}</option>
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
  );
}
