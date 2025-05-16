export default function Alert({ active, onTop }: { active?: boolean; onTop?: boolean }) {
  const variant = active ? "bg-white" : "bg-primary";
  const topPosition = onTop ? "top-0" : "top-2";

  return (
    <>
      <span className={`${variant} absolute right-1/12 w-2 h-2 rounded-full ${topPosition}`} />
      <span className={`${variant} animate-ping absolute right-1/12 w-2 h-2 rounded-full ${topPosition}`} />
    </>
  );
}
