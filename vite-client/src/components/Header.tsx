import { UserCircleIcon } from "@heroicons/react/20/solid";

interface HeaderProps {
  title?: string;
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

export function AppHeader(props: HeaderProps) {
  return (
    <div className="header px-4 pt-6 justify-between flex flex-row text-2xl mb-3 font-semibold">
      <div>{props.title}</div>
      <button onClick={props.toggleSidebar}>
        <UserCircleIcon className="h-9 w-9 text-slate-300"></UserCircleIcon>
      </button>
    </div>
  );
}

export function BodyHeader(props: HeaderProps) {
  return (
    <div className="header px-4 pt-6 justify-between flex flex-row text-lg font-extralight mb-6">
      {props.title}
    </div>
  );
}

export function FormHeader(props: HeaderProps) {
  return (
    <div className="header pt-4 justify-between flex flex-row text-lg font-extralight mb-6">
      {props.title}
    </div>
  );
}
