import { MONTHS } from "../../data/countries";

interface MonthSelectProps {
  value: string;
  onChange: (month: string) => void;
  placeholder?: string;
  className?: string;
}

export function MonthSelect({
  value,
  onChange,
  placeholder = "Select month",
  className = "",
}: MonthSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">{placeholder}</option>
      {MONTHS.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
}
