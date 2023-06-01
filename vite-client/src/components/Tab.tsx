import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export function Tab() {
  return (
    <div className="z-50 fixed bottom-0 columns-3 flex justify-around w-full py-4 dark:bg-slate-600">
      <div>
        <Link to="/new_room">
          <PlusCircleIcon className="h-8 w-8 text-slate-300"></PlusCircleIcon>
        </Link>
      </div>
      <div>
        <Link to="/landing">
          <HomeIcon className="h-8 w-8 text-slate-300"></HomeIcon>
        </Link>
      </div>
      <div>
        <Link to="/search">
          <MagnifyingGlassIcon className="h-8 w-8 text-slate-300"></MagnifyingGlassIcon>
        </Link>
      </div>
    </div>
  );
}
