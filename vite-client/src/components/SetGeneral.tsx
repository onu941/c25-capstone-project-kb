import { DangerButton } from "./minicomponents/Buttons";
import { SettingsInput } from "./minicomponents/Inputs";
import { useAppDispatch } from "../app/hook";
import { logout } from "../redux/authSlice";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { JWT } from "../app/interface";
import jwtDecode from "jwt-decode";

export function SetGeneral() {
  const token = localStorage.getItem("token");
  const decoded: JWT = jwtDecode(token!);
  const jwtUserId = decoded.id;

  const [inputs, setUserInputs] = useState({
    id: NaN,
    username: "",
    phone: "",
    email: "",
  });
  const [isGoodForEditing, setisGoodForEditing] = useState({
    username: false,
    phone: false,
    email: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userDetails = await response.json();
      setUserInputs({
        id: NaN,
        username: userDetails.user.name,
        phone: userDetails.user.phone,
        email: userDetails.user.email,
      });
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = (field: string) => {
    setisGoodForEditing({ ...isGoodForEditing, [field]: true });
  };

  const handleSaveClick = (field: string) => {
    setisGoodForEditing({ ...isGoodForEditing, [field]: false });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onUpdateUserInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.username.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/user/${jwtUserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email }),
      }
    );

    if (response.ok) {
      const userDetails = await response.json();
      setUserInputs({
        ...inputs,
        username: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email,
      });
      toast.success("Updated");
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="w-full flex flex-col place-content-center place-items-center px-8 md:px-8 md:mt-12 mt-12">
        <div className="dark:bg-slate-800 md:py-8 md:px-14 py-4 px-6 drop-shadow-lg rounded-lg w-full flex flex-col place-content-center mb-16 border-solid border-2 border-slate-400 border-opacity-50">
          <span className="text-xl md:mb-8 mb-4 mt-1 font-semibold">
            Edit Account Info
          </span>
          <form onSubmit={onUpdateUserInfo}>
            <input type="hidden" name="id" defaultValue={"user_id"} />
            <SettingsInput
              value={inputs["username"]}
              name="username"
              canEdit
              handleEditClick={() => handleEditClick("username")}
              handleSaveClick={() => handleSaveClick("username")}
              isGoodForEditing={isGoodForEditing["username"]}
              onChange={handleInputChange}
            />
            <SettingsInput
              value={inputs["phone"]}
              name="phone"
              canEdit
              handleEditClick={() => handleEditClick("phone")}
              handleSaveClick={() => handleSaveClick("phone")}
              isGoodForEditing={isGoodForEditing["phone"]}
              onChange={handleInputChange}
            />
            <SettingsInput
              value={inputs["email"]}
              name="email"
              canEdit
              handleEditClick={() => handleEditClick("email")}
              handleSaveClick={() => handleSaveClick("email")}
              isGoodForEditing={isGoodForEditing["email"]}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
      <div className="mb-24 flex justify-center">
        <DangerButton label="Logout" onClick={() => dispatch(logout())} />
      </div>
    </>
  );
}
