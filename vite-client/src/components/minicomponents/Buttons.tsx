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
        className="py-2 px-4 dark:bg-slate-700 hover:bg-slate-500 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-2 outline-offset-1 outline-neutral-400 transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 active:translate-y-0"
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
    <div className="absolute bottom-36 right-4 z-30 drop-shadow-lg">
      <button
        type={props.type}
        className="dark:bg-slate-400 w-28 h-28 rounded-full border-solid border-4 border-slate-300"
        onClick={props.onClick}
      >
        <div className="flex flex-wrap flex-col text-xl">{props.label}</div>
      </button>
    </div>
  );
}
