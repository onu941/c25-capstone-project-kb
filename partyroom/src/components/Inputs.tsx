import { TrashIcon } from "@heroicons/react/20/solid";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
};

export function StandardInput(props: InputProps) {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-full"
      {...props.register}
      onChange={props.onChange}
    ></input>
  );
}

export function MiniInput(props: InputProps) {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-32"
      {...props.register}
      onChange={props.onChange}
    ></input>
  );
}

export function StandardInputDeleteDisabled(props: InputProps) {
  return (
    <div className="flex flex-row columns-2 gap-4">
      <div className="w-full">
        <input
          placeholder={props.placeholder}
          type={props.type}
          className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-full"
          {...props.register}
        ></input>
      </div>
      <div className="w-fit">
        <button disabled>
          <TrashIcon className="h-9 w-9 text-slate-600" />
        </button>
      </div>
    </div>
  );
}

export function TextArea(props: InputProps) {
  return (
    <textarea
      className="dark:bg-slate-200 dark:text-black rounded-lg h-32 "
      placeholder={props.placeholder}
      maxLength={150}
    ></textarea>
  );
}
