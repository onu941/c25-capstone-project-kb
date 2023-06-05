import { FullScreen } from "../components/Containers";
import { AppHeader, FormHeader } from "../components/Header";
import { useCallback, useState } from "react";
import { MiniInput, StandardInput, TextArea } from "../components/Inputs";
import { PrimaryButton } from "../components/Buttons";
import { NewRoomTab, Tab } from "../components/Tab";
import { Sidebar } from "../components/Sidebar";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import { FormCarousel } from "../components/Carousels";
import { Switch } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";

type EquipmentField = {
  id: number;
  name: string;
};

type FormState = {
  name: string;
  area: number;
  capacity: number;
  address_1: string;
  address_2: string;
  address_3: string;
  equipment: EquipmentField[];
  description: string;
};

interface Form1Props {
  register: UseFormRegister<FormState>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  equipmentFields: EquipmentField[];
  handleDelete: (id: number) => void;
  handleAddMore: () => void;
}

interface Form2Props {
  isSelected?: string;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive?: boolean;
  enabled?: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewRoom() {
  const [isSelected, setIsSelected] = useState<string>("basics");
  const [enabled, setEnabled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [partyroomName, setPartyroomName] = useState("Submit Your Partyroom");
  const [equipmentFields, setEquipmentFields] = useState<EquipmentField[]>([
    { id: 1, name: "Equipment 1" },
    { id: 2, name: "Equipment 2" },
    { id: 3, name: "Equipment 3" },
  ]);

  const handleClick = (string: string) => {
    return setIsSelected(string);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.trim() === ""
      ? setPartyroomName("Submit Your Partyroom")
      : setPartyroomName(e.target.value);
  };

  const handleAddMore = () => {
    const newId = equipmentFields.length + 1;
    setEquipmentFields((prev) => [
      ...prev,
      { id: newId, name: `Equipment ${newId}` },
    ]);
  };

  const handleDelete = (id: number) => {
    setEquipmentFields((prev) => prev.filter((field) => field.id !== id));
  };

  const onDrop = useCallback((_acceptedFiles: any) => {}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log(data);
  };

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <>
      <FullScreen>
        <AppHeader
          title={partyroomName}
          toggleSidebar={toggleSidebar}
          isOpen={sidebarIsOpen}
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <NewRoomTab handleClick={handleClick} isSelected={isSelected} />
        <form
          className="flex mt-6 flex-col w-full px-8 mb-12"
          onSubmit={handleSubmit((v) => onSubmit(v))}
        >
          {/* part 2 form */}
          <div className={`${isSelected === "basics" ? "hidden" : ""}`}>
            <Part2Form
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              setEnabled={setEnabled}
              enabled={enabled}
              isDragActive={isDragActive}
            />
          </div>
          {/* part 1 form */}
          <div
            className={`${
              isSelected === "basics" ||
              (enabled && isSelected === "photoconfirm")
                ? ""
                : "hidden"
            }`}
          >
            <Part1Form
              register={register}
              handleInputChange={handleInputChange}
              equipmentFields={equipmentFields}
              handleDelete={handleDelete}
              handleAddMore={handleAddMore}
            />
            {/* next button */}
            <div
              className={`${
                isSelected === "basics" ? "" : "hidden"
              } flex justify-center my-12`}
            >
              <PrimaryButton
                type="button"
                label="Next"
                onClick={() => setIsSelected("photoconfirm")}
              />
            </div>
          </div>
          {/* submit button */}
          <div
            className={`${
              enabled && isSelected === "photoconfirm" ? "" : "hidden"
            } my-12 flex justify-center`}
          >
            <PrimaryButton
              label="Submit Your Room!"
              type="submit"
            ></PrimaryButton>
          </div>
        </form>
      </FullScreen>
      <Tab />
    </>
  );
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

export function Part1Form(props: Form1Props) {
  return (
    <>
      <StandardInput
        type="text"
        placeholder="name your partyroom"
        register={props.register("name")}
        onChange={props.handleInputChange}
      />
      <div className="flex flex-row w-full justify-between">
        <MiniInput
          type="text"
          placeholder="area"
          register={props.register("area")}
        />
        <MiniInput
          type="text"
          placeholder="capacity"
          register={props.register("capacity")}
        />
      </div>
      <FormHeader title="Address: " />
      <StandardInput
        placeholder="line 1"
        type="text"
        register={props.register("address_1")}
      />
      <StandardInput
        placeholder="line 2"
        type="text"
        register={props.register("address_2")}
      />
      <StandardInput
        placeholder="line 3"
        type="text"
        register={props.register("address_3")}
      />
      <div className="text-3xl flex justify-center my-6">Hashtags TBD</div>
      <FormHeader title="Facilities (min. 3)" />
      {props.equipmentFields.map((field) =>
        field.id <= 3 ? (
          <StandardInput
            key={field.id}
            placeholder={`equipment ${field.id}`}
            type="text"
            register={props.register(`equipment.${field.id - 1}.name` as const)}
            name={`equipment.${field.id - 1}.name`}
          />
        ) : (
          <StandardInput
            key={field.id}
            placeholder={`equipment ${field.id}`}
            type="text"
            register={props.register(`equipment.${field.id - 1}.name` as const)}
            name={`equipment.${field.id - 1}.name`}
            onDelete={() => props.handleDelete(field.id)}
            canDelete
          />
        )
      )}
      <div className="w-full flex place-content-center mt-5">
        <PrimaryButton
          type="button"
          onClick={props.handleAddMore}
          label="Add More"
        />
      </div>
      <FormHeader title="Tell us a little more about your partyroom:" />
      <TextArea
        placeholder="Max 150 characters"
        register={props.register("description")}
      />
    </>
  );
}
