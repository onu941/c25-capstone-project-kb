import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "./minicomponents/Buttons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();
  const [showPrimaryButton, setShowPrimaryButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrimaryButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="mt-24 w-full h-full text-center text-xl flex flex-col place-items-center place-content-center text-slate-300">
        <ArrowPathIcon className="w-14 h-14 animate-spin" />
        <div className="mt-8 mb-24">Loading...</div>
        {showPrimaryButton && (
          <PrimaryButton label="Back" onClick={() => handleBackButtonClick()} />
        )}
      </div>
    </>
  );
}
