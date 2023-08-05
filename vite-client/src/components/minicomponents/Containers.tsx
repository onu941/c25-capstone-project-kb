export function FullScreenInitial({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-screen bg-slate-900 flex flex-col place-content-center place-items-center text-white">
      {children}
    </div>
  );
}

export function FullScreen({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-auto h-screen bg-slate-900 flex flex-col text-white">
      {children}
    </div>
  );
}

export function ResponsiveContainer({ children }: React.PropsWithChildren<{}>) {
  return <div className=" sm:mx-4 md:mx-12">{children}</div>;
}
