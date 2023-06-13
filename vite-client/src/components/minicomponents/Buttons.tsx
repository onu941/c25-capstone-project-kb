interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  onClick?: (arg: any) => void;
  isCentered?: boolean;
}

interface SettingsTabButtonProps {
  name?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function PrimaryButton(props: ButtonProps) {
  return (
    <div className={`${props.isCentered ? "flex justify-center" : ""}`}>
      <button
        type={props.type}
        className="py-2 px-4 bg-slate-800 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-offset-1 outline-slate-700 transition duration-200 ease-in-out hover:scale-110 hover:-translate-y-1 hover:brightness-125 "
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}

export function DangerButton(props: ButtonProps) {
  return (
    <div className={`${props.isCentered ? "flex justify-center" : ""}`}>
      <button
        type={props.type}
        className="py-2 px-4 bg-pink-600 hover:bg-fuchsia-600 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-2 outline-offset-1 outline-neutral-400 transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 active:translate-y-0"
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}

export function SubmitButton(props: ButtonProps) {
  return (
    <div className={`${props.isCentered ? "flex justify-center" : ""}`}>
      <button
        type="submit"
        className="py-2 px-4 bg-emerald-600 hover:bg-lime-600 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-2 outline-offset-1 outline-neutral-400 transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 active:translate-y-0"
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}

export function SettingsTabButton(props: SettingsTabButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`tab tab-bordered dark:text-slate-300 tab-lg md:text-xl text-base ${
        props.isSelected ? "tab-active" : ""
      }`}
    >
      {props.name}
    </button>
  );
}

export function BookingButton(props: ButtonProps) {
  return (
    <div className="absolute md:bottom-32 md:right-12 z-30 drop-shadow-lg">
      <button
        type={props.type}
        className="bg-slate-400 bg-opacity-80 md:w-32 md:h-32 rounded-full border-solid border-4 border-slate-300"
        onClick={props.onClick}
      >
        <div className="flex flex-wrap flex-col text-2xl font-bold">
          {props.label}
        </div>
      </button>
    </div>
  );
}
