import React from "react";
import { FaCheck } from "react-icons/fa";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checkSize?: number;
}

function Checkbox({ label, checkSize, ...props }: Props) {
  return (
    <div className="flex justify-between items-center text-xs sm:text-sm">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input id="remember" type="checkbox" className="peer hidden" {...props} />
        <span className="items-center justify-center border-2 p-0.5 border-lines rounded-md transition-all duration-200 peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:opacity-100">
          <FaCheck className="text-white text-xs opacity-0 transition-opacity duration-200" size={checkSize} />
        </span>

        <span className="text-tx-primary peer-checked:font-semibold">{label}</span>
      </label>
    </div>
  );
}

export default Checkbox;
