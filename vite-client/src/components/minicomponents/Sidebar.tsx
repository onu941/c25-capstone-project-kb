import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { logout } from "../../redux/authSlice";

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`flex flex-col place-items-center px-4 py-6 ease-in-out duration-300 sidebar h-full z-40 fixed top-0 right-0 dark:bg-slate-700 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={toggleSidebar} className="mb-48">
          <XMarkIcon className="h-9 w-9 text-slate-200 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></XMarkIcon>
        </button>
        <div className="mb-10">
          <button onClick={() => navigate(`/dashboard`)}>
            <PresentationChartBarIcon className="h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></PresentationChartBarIcon>
          </button>
        </div>
        <div className="mb-10">
          <button onClick={() => navigate(`/settings`)}>
            <Cog6ToothIcon className="h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></Cog6ToothIcon>
          </button>
        </div>
        <div className="mb-10">
          <button onClick={() => dispatch(logout())}>
            <ArrowRightOnRectangleIcon className="h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-110"></ArrowRightOnRectangleIcon>
          </button>
        </div>
      </div>
    </>
  );
}
