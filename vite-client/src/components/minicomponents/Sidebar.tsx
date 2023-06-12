import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
// import { ClockIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { logout } from "../../redux/authSlice";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar(props: SidebarProps) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("user_id");
    navigate(`/dashboard?user_id=${userId}`);
  };

  const navigateToSettings = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("user_id");
    navigate(`/settings?user_id=${userId}`);
  };

  return (
    <>
      {props.isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"
          onClick={props.toggleSidebar}
        />
      )}
      <div
        className={`flex flex-col place-items-center px-4 py-6 ease-in-out duration-300 sidebar h-full z-40 fixed top-0 right-0 dark:bg-slate-700 ${
          props.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={props.toggleSidebar} className="mb-48">
          <XMarkIcon className="h-9 w-9 text-slate-200 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></XMarkIcon>
        </button>
        <button onClick={navigateToDashboard}>
          <PresentationChartBarIcon className="mb-10 h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></PresentationChartBarIcon>
        </button>
        <button onClick={navigateToSettings}>
          <Cog6ToothIcon className="mb-10 h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></Cog6ToothIcon>
        </button>
        <button onClick={() => dispatch(logout())}>
          <ArrowRightOnRectangleIcon className="mb-10 h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></ArrowRightOnRectangleIcon>
        </button>
      </div>
    </>
  );
}
