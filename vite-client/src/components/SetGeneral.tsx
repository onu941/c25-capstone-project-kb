import { PrimaryButton } from "./minicomponents/Buttons";
import { FullScreen } from "./minicomponents/Containers";
import { StandardInput } from "./minicomponents/Inputs";

export function SetGeneral() {
  return (
    <FullScreen>
      <div className="w-full flex flex-col place-content-center place-items-center">
        <div className="dark:bg-slate-500 p-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16">
          <span className="text-xl mb-8 font-semibold">Edit Account Info</span>
          <StandardInput value="Name" canEdit />
          <StandardInput value="Phone #" canEdit />
          <StandardInput value="Email" canEdit />
          <StandardInput value="Password" canEdit />
        </div>
        <div className="dark:bg-slate-500 px-8 py-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16">
          <span className="text-xl mb-12 font-semibold">Account Help</span>
          <div className="px-32 flex flex-col place-items-center">
            <PrimaryButton label="User Support" />
            <PrimaryButton label="Deactivate Account (Needs danger)" />
          </div>
        </div>
        <PrimaryButton label="Logout (needs other colour)" />
      </div>
    </FullScreen>
  );
}