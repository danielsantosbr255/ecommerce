// Componente Select reutilizável (Single Responsibility Principle)
interface SelectProps {
  label: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, id, name, options }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-tx-secondary font-bold mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="appearance-none border-2 border-lines rounded-lg w-full py-2 px-3 leading-tight focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
