import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";
import { FullScreenInitial } from "../components/Containers";
import { PrimaryButton } from "../components/Buttons";
import { Link } from "react-router-dom";

export default function Login() {
  const [phoneNo, setPhoneNo] = useState(NaN);
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ phone: phoneNo, password: password });
  };

  return (
    <FullScreenInitial>
      <button
        className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-24"
        disabled
      >
        Existing User
      </button>
      <form
        onSubmit={onSubmit}
        className="flex flex-col place-content-center place-items-center mb-20"
      >
        <input
          className="text-black px-2 py-2 rounded-lg mb-5"
          name="phone_no"
          type="tel"
          placeholder="enter phone #"
          onChange={(e) => setPhoneNo(parseInt(e.target.value))}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-8"
          name="password"
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">
          <ArrowRightCircleIcon className="h-14 w-14"></ArrowRightCircleIcon>
        </button>
      </form>
      <Link to="/handle_user">
        <PrimaryButton label="Back"></PrimaryButton>
      </Link>
    </FullScreenInitial>
  );
}
