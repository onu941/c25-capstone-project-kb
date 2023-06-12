import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

export function AppHeader(props: HeaderProps) {
  return (
    <div className="px-4 md:px-0 pt-6 justify-between flex flex-row text-2xl mb-3 font-semibold">
      <Link to="/">
        <div className="transform transition duration-200 ease-in-out hover:scale-110">
          {props.title}
        </div>
      </Link>
      <button onClick={props.toggleSidebar}>
        <UserCircleIcon className="h-9 w-9 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-125"></UserCircleIcon>
      </button>
    </div>
  );
}

export function BodyHeader(props: HeaderProps) {
  return (
    <div className="px-4 md:px-0 pt-6 justify-between flex flex-row text-lg font-extralight mb-6">
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

export function ReviewHeader() {
  return (
    <div className="flex mb-6">
      <div className=" w-3/5 header px-4 flex flex-row text-lg font-extralight place-items-center">
        Leave A Review
      </div>
      <div className="flex w-2/5 place-items-center justify-end pr-8">
        <input
          type="text"
          name="score"
          className="dark:bg-transparent w-1/4 text-white h-2/3 border-b-slate-300 border-transparent text-center"
        ></input>
        <div className=" pl-3">/ 10</div>
      </div>
    </div>
  );
}
