import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { FullScreenInitial } from "./minicomponents/Containers";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "./minicomponents/Buttons";

export type HandleUserFormState = {
  name: string;
  phoneNo: any;
  password: string;
};

export interface SignupProps {
  register: UseFormRegister<HandleUserFormState>;
  handleSubmit: UseFormHandleSubmit<HandleUserFormState, any>;
  onSignupSubmit: (data: HandleUserFormState) => void;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export function Signup(props: SignupProps) {
  return (
    <FullScreenInitial>
      <button
        className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-24"
        disabled
      >
        New User
      </button>
      <form
        onSubmit={props.handleSubmit(props.onSignupSubmit)}
        className="flex flex-col place-content-center place-items-center mb-20"
      >
        <input
          className="text-black px-2 py-2 rounded-lg mb-5 text-center"
          type="text"
          placeholder="enter your name"
          {...props.register("name")}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-5 text-center"
          type="tel"
          placeholder="enter phone #"
          {...props.register("phoneNo")}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-8 text-center"
          type="password"
          placeholder="enter password"
          {...props.register("password")}
        ></input>
        <button type="submit">
          <ArrowRightCircleIcon className="text-slate-300 h-14 w-14"></ArrowRightCircleIcon>
        </button>
      </form>
      <PrimaryButton
        label="Back"
        onClick={() => props.setPage("initial")}
      ></PrimaryButton>
    </FullScreenInitial>
  );
}
