import { useState } from "react";
import { PrimaryButton } from "./components/Buttons";
import { FullScreen } from "./components/Containers";

export default function Landing() {
  return (
    <FullScreen>
      <div className="h-36 w-52 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-28">
        Logo
      </div>
      <PrimaryButton label="New User"></PrimaryButton>
      <PrimaryButton label="Existing User"></PrimaryButton>
    </FullScreen>
  );
}
