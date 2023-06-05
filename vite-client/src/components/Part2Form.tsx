import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { FormCarousel } from "./minicomponents/Carousels";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

export interface Form2Props {
  isSelected?: string;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive?: boolean;
  enabled?: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Part2Form(props: Form2Props) {
  return (
    <div className={`${props.isSelected === "basics" ? "hidden" : ""}`}>
      <div
        className="px-10 py-12 rounded-xl border-dashed border-2 border-slate-500 text-lg text-justify mb-8"
        {...props.getRootProps()}
      >
        <input {...props.getInputProps()} />
        {props.isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <div className="flex flex-col place-content-center place-items-center text-slate-300">
            <PlusIcon className="h-40 w-40 mb-3" />
            Upload some photos
          </div>
        )}
      </div>
      <p className="text-center mb-8 text-xl">Image Preview here</p>
      <FormCarousel />
      <div className="columns-2 flex place-content-center place-items-center gap-5 mb-8">
        <div>
          <p className="text-slate-300 text-md">I'm done uploading!</p>
        </div>
        <div>
          <Switch
            checked={props.enabled}
            onChange={props.setEnabled}
            className={`${props.enabled ? "bg-pink-500" : "bg-pink-800"}
        relative inline-flex h-[29px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors shadow-lg duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${props.enabled ? "translate-x-6" : "translate-x-0"}
          pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}