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
      <div
        className={clsx("animate-material-spin rounded-full border-4 border-t-transparent", color, className)}
        style={{ width: spinnerSize, height: spinnerSize }}
      />
    </div>
  );
}
