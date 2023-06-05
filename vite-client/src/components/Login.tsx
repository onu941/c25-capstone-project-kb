import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { FormEvent } from "react";
import { PrimaryButton } from "./minicomponents/Buttons";
import { FullScreenInitial } from "./minicomponents/Containers";

export interface LoginProps {
  setPhoneNo: React.Dispatch<React.SetStateAction<number>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLoginSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export function Login(props: LoginProps) {
  return (
    <FullScreenInitial>
      <button
        className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-24"
        disabled
      >
        Existing User
      </button>
      <form
        onSubmit={props.onLoginSubmit}
        className="flex flex-col place-content-center place-items-center mb-20"
      >
        <input
          className="text-black px-2 py-2 rounded-lg mb-5"
          name="phone_no"
          type="tel"
          placeholder="enter phone #"
          onChange={(e) => props.setPhoneNo(parseInt(e.target.value))}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-8"
          name="password"
          type="password"
          placeholder="enter password"
          onChange={(e) => props.setPassword(e.target.value)}
        ></input>
        <button type="submit">
          <ArrowRightCircleIcon className="h-14 w-14"></ArrowRightCircleIcon>
        </button>
      </form>
      <PrimaryButton
        label="Back"
        onClick={() => props.setPage("initial")}
      ></PrimaryButton>
    </FullScreenInitial>
  );
}