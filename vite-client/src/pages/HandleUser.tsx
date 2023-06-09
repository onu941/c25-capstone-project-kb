import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FullScreenInitial } from "../components/minicomponents/Containers";
import { InitialLanding } from "../components/InitialLanding";
import { Login } from "../components/Login";
import { HandleUserFormState, Signup } from "../components/Signup";
import { localLogin } from "../redux/authAPI";
import { login } from "../redux/authSlice";
import { useAppDispatch } from "../app/hook";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function HandleUser() {
  const [page, setPage] = useState("initial");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const success = await localLogin(email, password);
    console.log(success);
    if (success) {
      dispatch(login(email));
      navigate("/landing");
    } else {
      toast.error("Login failed");
    }
  };

  const { register, handleSubmit } = useForm<HandleUserFormState>({});

  const onSignupSubmit = (data: HandleUserFormState) => {
    data.phoneNo = parseInt(data.phoneNo, 10);
    console.log("submitted form data:", data);
  };

  return (
    <FullScreenInitial>
      <div>
        <Toaster />
      </div>
      {page === "initial" && <InitialLanding setPage={setPage} />}
      {page === "login" && (
        <Login
          initialEmail={email}
          initialPassword={password}
          setEmail={setEmail}
          setPassword={setPassword}
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
