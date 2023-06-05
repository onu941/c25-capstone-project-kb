import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FullScreenInitial } from "../components/minicomponents/Containers";
import { InitialLanding } from "../components/InitialLanding";
import { Login } from "../components/Login";
import { HandleUserFormState, Signup } from "../components/Signup";

export default function HandleUser() {
  const [page, setPage] = useState("initial");
  const [phoneNo, setPhoneNo] = useState(NaN);
  const [password, setPassword] = useState("");

  const onLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ phone: phoneNo, password: password });
  };

  const { register, handleSubmit } = useForm<HandleUserFormState>({});

  const onSignupSubmit = (data: HandleUserFormState) => {
    data.phoneNo = parseInt(data.phoneNo, 10);
    console.log("submitted form data:", data);
  };

  return (
    <FullScreenInitial>
      {page === "initial" && <InitialLanding setPage={setPage} />}
      {page === "login" && (
        <Login
          setPassword={setPassword}
          setPhoneNo={setPhoneNo}
          onLoginSubmit={onLoginSubmit}
          setPage={setPage}
        />
      )}
      {page === "signup" && (
        <Signup
          register={register}
          handleSubmit={handleSubmit}
          onSignupSubmit={onSignupSubmit}
          setPage={setPage}
        />
      )}
    </FullScreenInitial>
  );
}
