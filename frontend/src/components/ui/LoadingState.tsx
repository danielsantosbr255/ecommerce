import clsx from "clsx";

type LoadingSpinnerProps = {
  className?: string;
  size?: number;
  color?: string;
  label?: string;
};

export default function LoadingState({
  className,
  size = 60,
  color = "border-primary",
  label = "Carregando",
}: LoadingSpinnerProps) {
  const spinnerSize = `${size}px`;

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
      <span className="relative rounded-full border-5 border-gray-500/20" style={{ width: spinnerSize, height: spinnerSize }}>
        <div
          className={clsx(
            "absolute w-full h-full animate-material-spin rounded-full border-4 scale-120 border-t-transparent",
            color,
            className
          )}
        />
      </span>

      <p className="font-semibold">{label}</p>
    </div>
  );
}
