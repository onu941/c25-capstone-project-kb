import { DangerButton, PrimaryButton } from "./minicomponents/Buttons";
import { StandardInput } from "./minicomponents/Inputs";
import { useAppDispatch } from "../app/hook";
import { logout } from "../redux/authSlice";
import { FormEvent, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

export interface JWT {
  id: number;
  name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  image_id: number;
  iat: number;
  exp: number;
}

export function SetGeneral() {
  const [inputs, setUserInputs] = useState({
    id: NaN,
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState({
    username: false,
    phone: false,
    email: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JWT = jwt_decode(token);

      setUserInputs({
        id: decoded.id,
        username: decoded.name,
        phone: decoded.phone,
        email: decoded.email,
        password: "******",
      });
    }
  }, []);

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleUpdateUserInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const form = event.target as HTMLFormElement;
    // const id = form.id.value;
    // const name = form.username.value;
    // const phone = form.phone.value;
    // const email = form.email.value;
    // const success = await someAPIFunction(name);
    // if (success) {
    //   dispatch(someSliceFunction(name));
    //   toast.success("Updated");
    // } else {
    //   toast.error("Update failed");
    // }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="w-full flex flex-col place-content-center place-items-center">
        <div className="dark:bg-slate-500 p-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16">
          <span className="text-xl mb-8 font-semibold">Edit Account Info</span>
          <form onSubmit={handleUpdateUserInfo}>
            <input type="hidden" name="id" defaultValue={"user_id"} />
            <StandardInput
              value={inputs["username"]}
              name={"username"}
              canEdit
              handleEditClick={() => handleEditClick("username")}
              handleSaveClick={() => handleSaveClick("username")}
              isEditing={isEditing["username"]}
              onChange={handleInputChange}
            />
            <StandardInput
              value={inputs["phone"]}
              name={"phone"}
              canEdit
              handleEditClick={() => handleEditClick("phone")}
              handleSaveClick={() => handleSaveClick("phone")}
              isEditing={isEditing["phone"]}
              onChange={handleInputChange}
            />
            <StandardInput
              value={inputs["email"]}
              name={"email"}
              canEdit
              handleEditClick={() => handleEditClick("email")}
              handleSaveClick={() => handleSaveClick("email")}
              isEditing={isEditing["email"]}
              onChange={handleInputChange}
            />
          </form>
          <StandardInput value="*****" canEdit />
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
