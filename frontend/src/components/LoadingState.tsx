import clsx from "clsx";

type LoadingSpinnerProps = {
  className?: string;
  size?: number;
  color?: string;
};

export default function LoadingState({
  className,
  size = 60,
  color = "border-highlight-n",
}: LoadingSpinnerProps) {
  const spinnerSize = `${size}px`;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative rounded-full border-5 border-gray-500/20" style={{ width: spinnerSize, height: spinnerSize }}>
        <div
          className={clsx(
            "absolute w-full h-full animate-material-spin rounded-full border-4 scale-120 border-t-transparent",
            color,
            className
          )}
        />
      </div>
    </div>
  );
}
