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
        className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg"
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
      className={`tab tab-bordered dark:text-slate-300 tab-lg text-xl ${
        props.isSelected ? "tab-active" : ""
      }`}
    >
      {props.name}
    </button>
  );
}

export function BookingButton() {
  return (
    <div className="absolute bottom-36 right-4 z-50 drop-shadow-lg">
      <button className="dark:bg-slate-400 w-28 h-28 rounded-full border-solid border-4 border-slate-300">
        <div className="flex flex-col text-xl">
          <div>BOOK</div>
          <div> NOW</div>
        </div>
      </button>
    </div>
  );
}
