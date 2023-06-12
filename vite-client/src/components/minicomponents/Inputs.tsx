import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { FormEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  register?: UseFormRegisterReturn;
  onChange?: (arg: any) => void;
  name?: string;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isEditing?: boolean;
  handleEditClick?: () => void;
  handleSaveClick?: () => void;
};

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
          placeholder={props.placeholder}
          type={props.type}
          className={`${
            props.isReadOnly ? "readonly" : ""
          } text-slate-300 dark:bg-transparent px-2 py-3 mb-5 text-center w-full drop-shadow-lg border-solid border-b-slate-300 border-opacity-50 border-transparent`}
          {...props.register}
          value={props.value}
          disabled={!props.isEditing || props.isDisabled}
          readOnly={!props.isEditing || props.isReadOnly}
          onChange={props.onChange}
          name={props.name}
          defaultValue={props.defaultValue}
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
            <button onClick={props.handleEditClick} type="button">
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
      } text-slate-300 dark:text-slate-300 dark:bg-transparent p-2 mb-5 text-center w-32 border-solid border-b-slate-300 border-opacity-50 border-transparent`}
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
        props.isReadOnly ? "readonly" : ""
      }dark:bg-transparent dark:text-slate-300 rounded-lg h-32 w-full`}
      placeholder={props.placeholder}
      maxLength={150}
      value={props.value}
      {...props.register}
      disabled={props.isDisabled}
      readOnly={props.isReadOnly}
    ></textarea>
  );
}
