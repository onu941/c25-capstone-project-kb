import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { FullScreen } from "./components/Containers";
import { useForm } from "react-hook-form";

type FormState = {
  name: string;
  phoneNo: any;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormState>({});

  const onSubmit = (data: FormState) => {
    data.phoneNo = parseInt(data.phoneNo, 10);
    console.log("submitted form data:", data);
  };

  return (
    <FullScreen>
      <button
        className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-24"
        disabled
      >
        New User
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col place-content-center place-items-center"
      >
        <input
          className="text-black px-2 py-2 rounded-lg mb-5"
          type="text"
          placeholder="enter your name"
          {...register("name")}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-5"
          type="tel"
          placeholder="enter phone #"
          {...register("phoneNo")}
        ></input>
        <input
          className="text-black px-2 py-2 rounded-lg mb-6"
          type="password"
          placeholder="enter password"
          {...register("password")}
        ></input>
        <button type="submit">
          <ArrowRightCircleIcon className="h-12 w-12"></ArrowRightCircleIcon>
        </button>
      </form>
    </FullScreen>
  );
}
