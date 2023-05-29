interface ButtonProps {
  label: string;
  type?: string;
}

export function PrimaryButton(props: ButtonProps) {
  return (
    <button className="py-2 px-4 dark:bg-slate-600 rounded-xl flex place-content-center place-items-center mb-6">
      {props.label}
    </button>
  );
}
