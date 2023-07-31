import { ComponentType } from "react";
import { UseFormRegister } from "react-hook-form";
import { SubmitRoomFormState } from "../../pages/SubmitRoom";
import { FormHeader } from "../minicomponents/Headers";

type FormIconButtonGroupIcon =
  | ComponentType<{
      color: string;
      className: string;
    }>
  | ComponentType<{
      color?: string;
      className?: string;
    }>;

function binArray<T>(array: T[], binSize: number): T[][] {
  let result: T[][] = [];
  for (let i = 0; i < array.length; i += binSize) {
    result.push(array.slice(i, i + binSize));
  }
  return result;
}

export function FormIconButtonGroup(props: {
  question: string;
  options: {
    id: number;
    label: string;
    icon: FormIconButtonGroupIcon;
  }[];
  selected: number[];
  setSelected(selected: number[]): void;
  name: keyof SubmitRoomFormState;
  register: UseFormRegister<SubmitRoomFormState>;
}) {
  return (
    <>
      <div className="mb-6">
        <div>
          <FormHeader title={props.question} />
          <div className="w-full sm:px-8 md:px-36 grid grid-cols-3 gap-4 mb-6">
            {binArray(props.options, 2).map((options, i) => (
              <div className="flex flex-col justify-start mt-2" key={i}>
                {options.map((option) => {
                  const selected = props.selected.includes(option.id);
                  function toggle() {
                    if (selected) {
                      props.setSelected(
                        props.selected.filter((id) => id !== option.id)
                      );
                    } else {
                      props.setSelected([...props.selected, option.id]);
                    }
                  }
                  return (
                    <FormIconButton2
                      key={option.id}
                      label={option.label}
                      icon={option.icon}
                      selected={selected}
                      toggle={toggle}
                    ></FormIconButton2>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div hidden>
          {props.options.map((option) => (
            <div className="form-control" key={option.id}>
              <label className="label cursor-pointer">
                <span className="label-text">{option.label}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={props.selected.includes(option.id)}
                  value={option.id}
                  {...props.register(props.name)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function FormIconButton2(props: {
  label: string;
  icon: FormIconButtonGroupIcon;
  selected: boolean;
  toggle(): void;
}) {
  const Icon = props.icon;
  const color = props.selected ? "text-slate-300" : "text-slate-600";
  return (
    <>
      <button
        type="button"
        className="flex flex-col place-items-center mb-4"
        onClick={props.toggle}
      >
        <Icon color={color} className={`${color} md:w-16 md:h-16 w-12 h-12`} />
        <span className={color}>{props.label}</span>
      </button>
    </>
  );
}
