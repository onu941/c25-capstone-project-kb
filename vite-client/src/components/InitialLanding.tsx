import { PrimaryButton } from "./minicomponents/Buttons";
import logo from "../assets/logo05.png";

export interface InitialLandingProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export function InitialLanding({ setPage }: InitialLandingProps) {
  return (
    <div className="flex flex-col place-content-center place-items-center w-full">
      <div className="md:w-7/8 rounded-xl flex place-content-center place-items-center mb-14">
        <img src={logo} className="w-96"></img>
      </div>
      <PrimaryButton
        label="New User"
        onClick={() => setPage("signup")}
      ></PrimaryButton>
      <PrimaryButton
        label="Existing User"
        onClick={() => setPage("login")}
      ></PrimaryButton>
    </div>
  );
}
