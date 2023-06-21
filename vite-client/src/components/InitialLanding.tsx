import { InitialLandingProps } from "../app/interface";
import { PrimaryButton } from "./minicomponents/Buttons";
import logo from "../assets/logo04.png";

export function InitialLanding(props: InitialLandingProps) {
  return (
    <div className="flex flex-col place-content-center place-items-center">
      <div className="md:w-96 w-80 rounded-xl flex place-content-center place-items-center mb-14">
        <img src={logo} className="w-96"></img>
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
