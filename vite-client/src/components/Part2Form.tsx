import { Switch } from "@headlessui/react";
import { Form2Props } from "../app/interface";

export function Part2Form(props: Form2Props) {
  return (
    <div className={`${props.isSelected === "part_1" ? "hidden" : ""}`}>
      <div className="px-10 py-12 rounded-xl border-dashed border-2 border-slate-500 text-lg text-justify mb-8">
        <input type="file"></input>
      </div>
      <p className="text-center mb-8 text-xl">Image Preview here</p>
      <div className="columns-2 flex place-content-center place-items-center gap-5 mb-8">
        <div>
          <p className="text-slate-300 text-md">I'm done uploading!</p>
        </div>
        <div>
          <Switch
            checked={props.switchEnabled}
            onChange={props.setSwitchEnabled}
            className={`${props.switchEnabled ? "bg-pink-500" : "bg-pink-800"}
        relative inline-flex h-[29px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors shadow-lg duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                props.switchEnabled ? "translate-x-6" : "translate-x-0"
              }
          pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
