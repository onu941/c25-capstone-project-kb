import { InitialLandingProps } from "../app/interface";
import { PrimaryButton } from "./minicomponents/Buttons";

export function InitialLanding(props: InitialLandingProps) {
  return (
    <div className="flex flex-col place-content-center place-items-center">
      <div className="h-36 w-52 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-28">
        Logo
      </div>
      <PrimaryButton
        label="New User"
        onClick={() => props.setPage("signup")}
      ></PrimaryButton>
      <PrimaryButton
        label="Existing User"
        onClick={() => props.setPage("login")}
      ></PrimaryButton>
    </div>
  );
}
