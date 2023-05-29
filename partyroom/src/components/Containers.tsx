export function FullScreen(props: React.PropsWithChildren<{}>) {
  return (
    <div className="h-screen dark:bg-slate-800 flex flex-col place-content-center place-items-center text-white">
      {props.children}
    </div>
  );
}
