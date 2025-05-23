export const CardLight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative w-fit h-fit rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-2xl p-10 min-w-[60vw] ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
