import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";
import { FullScreen } from "./components/Containers";

export default function Login() {
  const [phoneNo, setPhoneNo] = useState(NaN);
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ phone: phoneNo, password: password });
  };

  return (
    <FullScreen>
      <button
        className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-24"
        disabled
      >
        Existing User
      </button>
      <form
        onSubmit={onSubmit}
        className="flex flex-col place-content-center place-items-center"
      >
        <input
          className="text-black px-2 py-2 rounded-lg mb-5"
          name="phone_no"
          type="tel"
          placeholder="enter phone #"
          onChange={(e) => setPhoneNo(parseInt(e.target.value))}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-6"
          name="password"
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">
          <ArrowRightCircleIcon className="h-12 w-12"></ArrowRightCircleIcon>
        </button>
      </form>
    </FullScreen>
  );
}
