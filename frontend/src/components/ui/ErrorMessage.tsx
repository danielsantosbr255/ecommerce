import { FiAlertCircle } from "react-icons/fi";

interface Props {
  message: string | undefined;
  className?: string;
}

const ErrorMessage = ({ message, className }: Props) => {
  if (!message) return null;
  return (
    <span className={`text-tx-error flex items-center text-sm gap-1 ${className}`}>
      <FiAlertCircle size={16} />
      {message}
    </span>
  );
};

export default ErrorMessage;
