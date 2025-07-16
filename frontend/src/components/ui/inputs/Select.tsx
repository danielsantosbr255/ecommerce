import { ChevronDown } from "lucide-react";


interface SelectProps {
  label: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
}

export default function Select({ label, id, name, options, className, ...props }: SelectProps) {
  const icon = <ChevronDown size={25} />;

  return (
    <div className={`relative flex border-2 border-lines rounded-lg gap-0 focus-within:border-primary items-center ${className}`}>
      <label
        htmlFor={id}
        className="bg-bg-secondary absolute text-sm text-tx-secondary font-semibold top-0 -translate-y-1/2 z-5 px-1 ml-3 peer-focus:text-primary transition-all duration-300"
      >
        {label}
      </label>

      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tx-muted hover:text-primary transition-colors duration-300 cursor-pointer">
        {icon}
      </div>

      <select name={name} {...props} className="w-full appearance-none focus:outline-none focus:ring-0 py-3 peer px-3">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
