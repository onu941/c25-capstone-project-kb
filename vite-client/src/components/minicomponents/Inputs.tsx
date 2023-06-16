import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { InputProps } from "../../app/interface";

export function DropdownInput(props: InputProps) {
  return (
    <div className="w-full">
      <select
        className="text-slate-300 bg-transparent px-2 py-3 mb-5 text-center w-full drop-shadow-lg border-solid border-b-slate-300 border-opacity-50 border-transparent"
        {...props}
      >
        <option disabled selected value="">
          Select {props.placeholder}
        </option>
        {props.options!.map((option) => (
          <option
            className="text-slate-300 bg-transparent px-2 py-3 mb-5 text-center w-full drop-shadow-lg border-solid border-b-slate-300 border-opacity-50 border-transparent"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function StandardInput(props: InputProps) {
  return (
    <div
      className={`flex ${
        (props.canEdit || props.canDelete) && !props.isEditing
          ? "columns-2"
          : ""
      } ${
        props.canEdit && props.canDelete ? "columns-3" : ""
      } gap-5 place-content-center`}
    >
      <div className="w-full">
        <input
          {...props}
          className={`${
            props.isEditing ? "read-only" : ""
          } text-slate-300 bg-transparent px-2 py-3 mb-5 text-center w-full drop-shadow-lg border-solid border-b-slate-300 border-opacity-50 border-transparent`}
        />
      </div>
      {props.canEdit ? (
        <div className="w-fit">
          {props.isEditing ? (
            <button onClick={props.handleSaveClick} type="submit">
              {" "}
              <CheckIcon className="h-9 w-9 pt-1 text-slate-300" />
            </button>
          ) : (
            <button
              onClick={props.handleEditClick}
              type="button"
              className="transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 active:translate-y-0"
            >
              <PencilSquareIcon className="h-9 w-9 pt-1 text-slate-300" />
            </button>
          )}
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
      className={`${
        props.isReadOnly ? "readonly" : ""
      } text-slate-300 bg-transparent p-2 mb-5 text-center w-32 border-solid border-b-slate-300 border-opacity-50 border-transparent`}
      {...props.register}
      onChange={props.onChange}
      value={props.value}
      readOnly={props.isReadOnly}
      disabled={props.isDisabled}
    ></input>
  );
}

export function TextArea(props: InputProps) {
  return (
    <textarea
      className={`${
        props.isReadOnly ? "read-only" : ""
      }dark:bg-transparent dark:text-slate-300 rounded-lg h-32 w-full`}
      placeholder={props.placeholder}
      maxLength={150}
      value={props.value}
      name={props.name}
      {...props.register}
      onChange={props.handleReviewDetailInputChange}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
    ></textarea>
  );
}

export function SettingsInput(props: InputProps) {
  return (
    <div
      className={`flex ${
        (props.canEdit || props.canDelete) && !props.isEditing
          ? "columns-2"
          : ""
      } ${
        props.canEdit && props.canDelete ? "columns-3" : ""
      } gap-5 place-content-center`}
    >
      <div className="w-full">
        <input
          placeholder={props.placeholder}
          type={props.type}
          className={`text-slate-300 bg-transparent px-2 py-3 mb-5 text-center w-full border-solid border-2 border-transparent border-b-slate-400 border-opacity-40`}
          {...props.register}
          value={props.value}
          disabled={!props.isEditing}
          onChange={props.onChange}
          name={props.name}
          defaultValue={props.defaultValue}
        />
      </div>
      {props.canEdit ? (
        <div className="w-fit">
          {props.isEditing ? (
            <button
              onClick={props.handleSaveClick}
              type="button"
              className="transform transition duration-200 ease-in-out translate-y-2 hover:translate-y-1 hover:scale-110 active:translate-y-0"
            >
              {" "}
              <CheckIcon className="h-9 w-9 pt-1 text-slate-300" />
            </button>
          ) : (
            <button
              onClick={props.handleEditClick}
              type="submit"
              className="transform transition duration-200 ease-in-out translate-y-2 hover:translate-y-1 hover:scale-110 active:translate-y-0"
            >
              <PencilSquareIcon className="h-9 w-9 pt-1 text-slate-300" />
            </button>
          )}
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
