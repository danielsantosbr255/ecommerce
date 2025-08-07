import React from "react";
import ErrorMessage from "./ErrorMessage";
import { FieldError } from "react-hook-form";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
  label?: string;
}

function TextArea({ error, label, ...props }: Props) {
  return (
    <div className="col-span-full flex flex-col gap-1">
      {label && (
        <label htmlFor={props.id} className="block text-tx-secondary text-sm font-bold mb-2">
          {label}
        </label>
      )}

      <textarea
        {...props}
        className="shadow-xs appearance-none border-2 border-lines placeholder-tx-muted/50 rounded-lg w-full py-2 px-3 leading-tight focus:outline-primary bg-bg-secondary"
      />
      {error && <ErrorMessage message={error.message} />}
    </div>
  );
}

export default TextArea;
