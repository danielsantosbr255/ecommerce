type Props = {
  onTop?: boolean;
  className?: string;
};

export default function Alert({ className }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`bg-primary relative border-2 border-bg-secondary z-0 flex rounded-full w-3 h-3`}>
        <span className={`bg-primary absolute w-full h-full z-20 rounded-full animate-ping`} />
      </div>
    </div>
  );
}
