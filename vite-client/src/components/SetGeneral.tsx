import { Link } from "react-router-dom";
import { DangerButton, PrimaryButton } from "./minicomponents/Buttons";
import { FullScreen } from "./minicomponents/Containers";
import { StandardInput } from "./minicomponents/Inputs";
import { useAppDispatch } from "../app/hook";
import { logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export interface JWT {
  name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  image_id: number;
  iat: number;
  exp: number;
}

export function SetGeneral() {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JWT = jwt_decode(token);
      setUserName(decoded.name || "");
      setUserPhone(decoded.phone || "");
      setUserEmail(decoded.email || "");
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col place-content-center place-items-center">
        <div className="dark:bg-slate-500 p-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16">
          <span className="text-xl mb-8 font-semibold">Edit Account Info</span>
          <StandardInput value={userName} canEdit isReadOnly isDisabled />
          <StandardInput value={userPhone} canEdit isReadOnly isDisabled />
          <StandardInput value={userEmail} canEdit isReadOnly isDisabled />
          <StandardInput value="*****" canEdit isReadOnly isDisabled />
        </div>
        <div className="dark:bg-slate-500 px-8 py-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16">
          <span className="text-xl mb-12 font-semibold">Account Help</span>
          <div className="px-8 flex flex-col place-items-center">
            <PrimaryButton label="User Support" />
            <DangerButton label="Deactivate Account" />
          </div>
        </div>
      </div>
      <div className="mb-24 flex justify-center">
        <DangerButton label="Logout" onClick={() => dispatch(logout())} />
      </div>
    </>
  );
}
