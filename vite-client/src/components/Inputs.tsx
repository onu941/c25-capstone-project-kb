import { Combobox } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { addressLine2, addressLine3 } from "../assets/geography";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
  name?: string;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
};

export function AddressLine2(props: InputProps) {
  return (
    <>
      <select
        className="rounded-lg w-full dark:bg-slate-200 dark:text-gray-500 mb-6 text-center"
        placeholder="Pick your district"
      >
        <option disabled selected>
          line 2
        </option>
        {addressLine2.map((line) => {
          return <option>{line}</option>;
        })}
      </select>
    </>
  );
}

export function AddressLine3() {
  return (
    <select
      className="rounded-lg w-full dark:bg-slate-200 dark:text-gray-500 mb-6 flex text-center"
      placeholder="Pick your district"
    >
      <option disabled selected>
        line 3
      </option>
      {addressLine3.map((line) => {
        return <option>{line}</option>;
      })}
    </select>
  );
}

export function StandardInput(props: InputProps) {
  return (
    <div
      className={`flex ${props.canEdit || props.canDelete ? "columns-2" : ""} ${
        props.canEdit && props.canDelete ? "columns-3" : ""
      }columns-3 gap-5 place-content-center`}
    >
      <div className="w-full">
        <input
          placeholder={props.placeholder}
          type={props.type}
          className="dark:text-black dark:bg-slate-200 p-2 rounded-lg mb-5 text-center w-full drop-shadow-lg"
          {...props.register}
          onChange={props.onChange}
          value={props.value}
        ></input>
      </div>
      {props.canEdit ? (
        <div className="w-fit">
          {props.canEdit ? (
            <PencilSquareIcon className="h-9 w-9 pt-1 text-slate-300" />
          ) : null}
        </div>
      ) : null}
      {props.canDelete ? (
        <div className="w-fit">
          {props.canDelete ? (
            <button onClick={props.onDelete}>
              <TrashIcon className="h-9 w-9 text-slate-300 pt-1" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
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

export function TextArea(props: InputProps) {
  return (
    <textarea
      className="dark:bg-slate-200 dark:text-black rounded-lg h-32 w-full"
      placeholder={props.placeholder}
      maxLength={150}
      value={props.value}
    ></textarea>
  );
}
