import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
// import { ClockIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar(props: SidebarProps) {
  return (
    <div
      className={`flex flex-col place-items-center px-4 py-6 ease-in-out duration-300 sidebar h-full z-40 fixed top-0 right-0 dark:bg-slate-600 ${
        props.isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={props.toggleSidebar} className="mb-48">
        <XMarkIcon className="h-9 w-9 text-slate-200 drop-shadow-lg"></XMarkIcon>
      </button>
      <Link to="/chats">
        <ChatBubbleLeftRightIcon className="mb-10 h-8 w-8 text-slate-300 drop-shadow-lg"></ChatBubbleLeftRightIcon>
      </Link>
      <Link to="/settings">
        <Cog6ToothIcon className="mb-10 h-8 w-8 text-slate-300 drop-shadow-lg"></Cog6ToothIcon>
      </Link>
      <Link to="/logout">
        <ArrowLeftOnRectangleIcon className="mb-10 h-8 w-8 text-slate-300 drop-shadow-lg"></ArrowLeftOnRectangleIcon>
      </Link>
    </div>
  );
}
