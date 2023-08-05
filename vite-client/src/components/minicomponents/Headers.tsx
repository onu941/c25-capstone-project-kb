import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  title?: string;
  isOpen?: boolean;
  toggleSidebar?: () => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rating?: string;
}

export function AppHeader({ title, toggleSidebar }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-0 pt-6 justify-between flex flex-row text-2xl mb-3 font-semibold">
      <button onClick={() => navigate(`/landing`)}>
        <div className="transform transition duration-200 ease-in-out hover:scale-110">
          {title}
        </div>
      </button>
      <button onClick={toggleSidebar}>
        <UserCircleIcon className="h-9 w-9 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-125"></UserCircleIcon>
      </button>
    </div>
  );
}

export function BodyHeader({ title }: HeaderProps) {
  return (
    <div className="px-4 md:px-0 pt-6 justify-between flex flex-row text-xl font-light mb-6">
      {title}
    </div>
  );
}

export function FormHeader({ title }: HeaderProps) {
  return (
    <div className="header pt-4 justify-between flex flex-row text-lg font-extralight mb-6">
      {title}
    </div>
  );
}

export function ReviewHeader({ rating, handleInputChange }: HeaderProps) {
  return (
    <div className="flex mb-6">
      <div className=" w-3/5 header flex flex-row text-lg font-extralight place-items-center">
        Leave A Review
      </div>
      <div className="flex w-2/5 place-items-center justify-end">
        <input
          type="text"
          name="rating"
          className="dark:bg-transparent w-1/4 text-white h-2/3 border-b-slate-300 border-transparent text-center"
          value={rating}
          onChange={handleInputChange}
        ></input>
        <div className=" pl-3">/ 10</div>
      </div>
    </div>
  );
}
