type Props = {
  onTop?: boolean;
  className?: string;
};

export default function Alert({ className }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`bg-primary relative flex rounded-full w-2 h-2`}>
        <span className={`bg-primary absolute w-full h-full rounded-full animate-ping`} />
      </div>
    </div>
  );
}
