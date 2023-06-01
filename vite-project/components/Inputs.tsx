import React from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { addressLine2, addressLine3 } from "../assets/geography";

type InputProps = {
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
  name?: string;
  onDelete?: () => void;
};

export function AddressLine2() {
  return (
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

export function StandardInputDeleteEnabled(props: InputProps) {
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
        <button onClick={props.onDelete}>
          <TrashIcon className="h-9 w-9 text-slate-300" />
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
