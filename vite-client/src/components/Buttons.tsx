interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  onClick?: (arg: any) => void;
}

interface SettingsTabButtonProps {
  name?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function PrimaryButton(props: ButtonProps) {
  return (
    <button
      type={props.type}
      className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg"
      onClick={props.onClick}
    >
      {props.label}
    </button>
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
