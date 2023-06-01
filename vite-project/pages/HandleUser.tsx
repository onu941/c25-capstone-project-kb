import { useState } from "react";
import { PrimaryButton } from "../components/Buttons";
import { FullScreenInitial } from "../components/Containers";
import { Link } from "react-router-dom";

export default function HandleUser() {
  return (
    <FullScreenInitial>
      <div className="h-36 w-52 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-28">
        Logo
      </div>
      <Link to="/signup">
        <PrimaryButton label="New User"></PrimaryButton>
      </Link>
      <Link to="/login">
        <PrimaryButton label="Existing User"></PrimaryButton>
      </Link>
    </FullScreenInitial>
  );
}
