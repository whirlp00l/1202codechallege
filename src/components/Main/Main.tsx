export const Main: React.FC = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-24 flex flex-col content-center justify-center">
        {children}
      </div>
    </main>
  );
};
