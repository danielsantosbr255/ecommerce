import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  className?: string;
  iconPosition?: "left" | "right";
}

interface CheckIconProps {
  size?: number;
  containerClassName?: string;
}

interface CheckLabelProps {
  label: string;
  className?: string;
}

export function CheckLabel({ label, className }: CheckLabelProps) {
  return <span className={`text-gray-800 peer-checked:font-semibold select-none ${className || ""}`}>{label}</span>;
}

export function CheckIcon({ size = 12, containerClassName }: CheckIconProps) {
  return (
    <span
      className={`
        flex items-center justify-center border-2 border-gray-400 rounded-md p-0.5
        transition-all duration-200
        peer-checked:bg-primary peer-checked:border-primary
        peer-checked:[&>svg]:opacity-100
        ${containerClassName || ""}
      `}
    >
      <FaCheck className="text-white text-xs opacity-0 transition-opacity duration-200" size={size} />
    </span>
  );
}

function Checkbox({ children, className, iconPosition = "left", ...rest }: CheckboxProps) {
  const childrenArray = React.Children.toArray(children);

  const icon = childrenArray.find((child) => React.isValidElement(child) && child.type === CheckIcon);
  const otherChildren = childrenArray.filter((child) => React.isValidElement(child) && child.type !== CheckIcon);

  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className || ""}`}>
      <input type="checkbox" className="peer hidden" {...rest} />
      {iconPosition === "left" && icon}
      {otherChildren}
      {iconPosition === "right" && icon}
    </label>
  );
}

export default Checkbox;
