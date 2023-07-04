export function FullScreenInitial(props: React.PropsWithChildren<{}>) {
  return (
    <div className="h-screen bg-slate-900 flex flex-col place-content-center place-items-center text-white">
      {props.children}
    </div>
  );
}

export function FullScreen(props: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-auto h-screen bg-slate-900 flex flex-col text-white">
      {props.children}
    </div>
  );
}

export function ResponsiveContainer(props: React.PropsWithChildren<{}>) {
  return <div className=" sm:mx-4 md:mx-12">{props.children}</div>;
}
