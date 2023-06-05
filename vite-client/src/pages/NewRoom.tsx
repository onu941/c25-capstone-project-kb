import { FullScreen } from "../components/minicomponents/Containers";
import { AppHeader, FormHeader } from "../components/minicomponents/Headers";
import { useCallback, useState } from "react";
import { PrimaryButton } from "../components/minicomponents/Buttons";
import { NewRoomTab, Tab } from "../components/minicomponents/Tab";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Part1Form } from "../components/Part1Form";
import { Part2Form } from "../components/Part2Form";

export type EquipmentField = {
  id: number;
  name: string;
};

export type NewRoomFormState = {
  name: string;
  area: number;
  capacity: number;
  address_1: string;
  address_2: string;
  address_3: string;
  equipment: EquipmentField[];
  description: string;
};

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

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

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

  const { register, handleSubmit } = useForm<NewRoomFormState>();
  const onSubmit: SubmitHandler<NewRoomFormState> = (data) => {
    console.log(data);
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
          <div
            className={`${
              enabled && isSelected === "photoconfirm" ? "" : "hidden"
            } flex justify-start`}
          >
            <FormHeader title="Confirm your partyroom:" />
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
