import { FormEvent, useState } from "react";
import { FullScreenInitial } from "../components/minicomponents/Containers";
import { InitialLanding } from "../components/InitialLanding";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";
import { localLogin, localSignup } from "../redux/authAPI";
import { login } from "../redux/authSlice";
import { useAppDispatch } from "../app/hook";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// import { useForm } from "react-hook-form";
// import { HandleUserFormState } from "../app/interface";

export default function HandleUser() {
  const [page, setPage] = useState("initial");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const success = await localLogin(email, password);
    if (success.status) {
      dispatch(login(success.token));
      localStorage.setItem("successMessage", "Welcome back");
      const token = localStorage.getItem("token");
      if (token) {
        navigate(`/landing`);
      }
    } else {
      toast.error("Login failed");
    }
  };

  const onSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.username.value;
    const email = form.email.value;
    const phone = form.phone.value.toString();
    const password = form.password.value;

    const success = await localSignup(name, email, phone, password);
    if (success) {
      toast.success(success.message);
      setPage("login");
      setEmail("");
      setPassword("");
    }
  };

  // using react-hook-form
  // const { register, handleSubmit } = useForm<HandleUserFormState>({});
  // const onSignupSubmit = (data: HandleUserFormState) => {
  //   data.phoneNo = parseInt(data.phoneNo, 10);
  //   console.log("submitted form data:", data);
  // };

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
          initialName={name}
          initialEmail={email}
          initialPhone={phone}
          initialPassword={password}
          onSignupSubmit={onSignupSubmit}
          setPage={setPage}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setPassword={setPassword}
        />
      )}
    </FullScreenInitial>
  );
}
