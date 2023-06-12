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
    // const success = await someAPIFunction(???);
    // if (success) {
    //   dispatch(someSliceFunction(???));
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
      <div className="w-full flex flex-col place-content-center place-items-center px-8 md:px-8 md:mt-12 mt-12">
        <div className="dark:bg-slate-500 md:py-8 md:px-14 py-4 px-6 rounded-lg w-full flex flex-col place-content-center mb-16">
          <span className="text-xl md:mb-8 mb-4 mt-1 font-semibold">
            Edit Account Info
          </span>
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
      </div>
      <div className="mb-24 flex justify-center">
        <DangerButton label="Logout" onClick={() => dispatch(logout())} />
      </div>
    </>
  );
}
