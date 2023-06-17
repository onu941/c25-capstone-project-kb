import { FullScreenInitial } from "./minicomponents/Containers";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "./minicomponents/Buttons";
import { SignupProps } from "../app/interface";

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
        onSubmit={props.onSignupSubmit}
        className="flex flex-col place-content-center place-items-center mb-20"
      >
        <input
          className="text-slate-500 px-2 py-2 rounded-lg mb-5 text-center"
          name="username"
          type="text"
          placeholder="name"
          value={props.initialName}
          onChange={(e) => props.setName(e.target.value)}
        ></input>
        <input
          className="text-slate-500 px-2 py-2 rounded-lg mb-5 text-center"
          name="email"
          type="text"
          placeholder="email"
          value={props.initialEmail}
          onChange={(e) => props.setEmail(e.target.value)}
        ></input>
        <input
          className="text-slate-500 px-2 py-2 rounded-lg mb-5 text-center"
          name="phone"
          type="tel"
          placeholder="phone #"
          value={props.initialPhone}
          onChange={(e) => props.setPhone(e.target.value)}
        ></input>
        <input
          className="text-slate-500 px-2 py-2 rounded-lg mb-8 text-center"
          name="password"
          type="password"
          placeholder="password"
          value={props.initialPassword}
          onChange={(e) => props.setPassword(e.target.value)}
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
