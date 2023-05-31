import { useState } from "react";
import { Switch } from "@headlessui/react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  onClick?: (arg: any) => void;
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

export default function Example() {

  return (

  );
}
