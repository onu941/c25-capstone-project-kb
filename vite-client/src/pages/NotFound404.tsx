import { useNavigate } from "react-router-dom";
import { FullScreenInitial } from "../components/minicomponents/Containers";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function notFound404() {
  const navigate = useNavigate();

  return (
    <FullScreenInitial>
      <div className="text-slate-300 text-3xl mb-24">
        Sorry, this page does not exist
      </div>
      <button onClick={() => navigate(`/landing`)}>
        <HomeIcon className="h-16 w-16 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-125"></HomeIcon>
      </button>
    </FullScreenInitial>
  );
}
