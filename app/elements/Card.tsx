export const CardLight = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-fit h-fit rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-2xl p-10">
      {children}
    </div>
  );
};
