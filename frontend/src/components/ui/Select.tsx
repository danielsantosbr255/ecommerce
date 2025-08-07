import { ChevronDown } from "lucide-react";
import { FieldError } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  className?: string;
  error?: FieldError;
}

export default function Select({ label, error, options, className, ...props }: SelectProps) {
  const icon = <ChevronDown size={25} />;

  return (
    <div className="flex flex-col gap-1">
      <div className={`relative flex border-2 border-lines rounded-lg focus-within:border-primary items-center ${className}`}>
        <label
          htmlFor={props.id}
          className="bg-bg-secondary absolute text-sm text-tx-secondary font-semibold top-0 -translate-y-1/2 z-5 px-1 ml-3 peer-focus:text-primary transition-all duration-300"
        >
          {label}
        </label>

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tx-muted">{icon}</div>

        <select
          name={props.name}
          {...props}
          className="peer flex flex-1 p-2.5 appearance-none focus:outline-none focus:ring-0 cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <span className={`text-tx-error flex items-center text-sm gap-1 ${className}`}>
          <FiAlertCircle size={16} /> {error.message}
        </span>
      )}
    </div>
  );
}
