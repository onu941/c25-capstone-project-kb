import { UserCircleIcon } from "@heroicons/react/20/solid";

interface HeaderProps {
  title: string;
}

export function AppHeader() {
  return (
    <div className="header px-4 pt-6 justify-between flex flex-row text-2xl mb-3 font-semibold">
      <div>Welcome, user</div>
      <UserCircleIcon className="h-9 w-9"></UserCircleIcon>
    </div>
  );
}

export function BodyHeader(props: HeaderProps) {
  return (
    <div className="header px-4 pt-6 justify-between flex flex-row text-lg font-extralight">
      {props.title}
    </div>
  );
}
