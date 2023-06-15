import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { InputProps, District } from "../../app/interface";

export default function DistrictInput(props: InputProps) {
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchDistricts = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/district`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const districtsData = await response.json();
      console.log(districtsData);

      setDistricts(districtsData);
    };

    fetchDistricts();
  }, []);

  const filteredDistricts =
    query === ""
      ? districts
      : districts.filter((district: District) =>
          district.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full mb-6">
      <Combobox value={selected} onChange={setSelected} name={props.name}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden bg-transparent drop-shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full bg-transparent py-3 pl-3 pr-10 text-base text-center leading-5 text-slate-200 focus:ring-0 border-solid border-transparent border-b-slate-300 border-opacity-50"
              displayValue={(district: District) => district.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={props.placeholder}
              {...props.register}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredDistricts.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-slate-200 text-base">
                  Nothing found.
                </div>
              ) : (
                filteredDistricts.map((district: District) => (
                  <Combobox.Option
                    key={district.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 text-base ${
                        active
                          ? "bg-slate-700 text-slate-200"
                          : "text-slate-200"
                      }`
                    }
                    value={district}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {district.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-slate-200" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
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
          placeholder={props.placeholder}
          type={props.type}
          className={`${
            props.isEditing ? "read-only" : ""
          } text-slate-300 bg-transparent px-2 py-3 mb-5 text-center w-full drop-shadow-lg border-solid border-b-slate-300 border-opacity-50 border-transparent`}
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
