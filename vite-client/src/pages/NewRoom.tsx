import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, FormHeader } from "../components/minicomponents/Headers";
import { useState, useRef } from "react";
import {
  DangerButton,
  PrimaryButton,
  SubmitButton,
} from "../components/minicomponents/Buttons";
import { NewRoomTab, Tab } from "../components/minicomponents/Tab";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import { Part1Form } from "../components/Part1Form";
import { Part2Form } from "../components/Part2Form";
import {
  EquipmentField,
  CategoryField,
  NewRoomFormState,
  ActiveIconButtons,
} from "../app/interface";

export default function NewRoom() {
  const [isSelected, setIsSelected] = useState<string>("part_1");
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [partyroomName, setPartyroomName] = useState("Submit Your Partyroom");
  const [equipmentFields, setEquipmentFields] = useState<EquipmentField[]>([
    { id: 1, name: "Equipment 1" },
    { id: 2, name: "Equipment 2" },
    { id: 3, name: "Equipment 3" },
  ]);
  const [categoryFields, setCategoryFields] = useState<CategoryField[]>([
    { id: 1, name: "Category 1" },
  ]);

  const [activeIconButtons, setActiveIconButtons] = useState<ActiveIconButtons>(
    {}
  );

  const formRef = useRef<HTMLFormElement>(null);

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

  const handleAddMoreEquipment = () => {
    const newId = equipmentFields.length + 1;
    setEquipmentFields((prev) => [
      ...prev,
      { id: newId, name: `Equipment ${newId}` },
    ]);
  };

  const handleDelete = (id: number) => {
    setEquipmentFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleAddMoreCategories = () => {
    const newId = categoryFields.length + 1;
    setCategoryFields((prev) => [
      ...prev,
      { id: newId, name: `Category ${newId}` },
    ]);
  };

  const handleDeleteCategories = (id: number) => {
    setCategoryFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleBack = () => {
    setIsSelected("part_1");
  };

  const handleReset = () => {
    setIsSelected("part_1");
    formRef.current?.reset();
  };

  function handleFormIconButton(iconType: string) {
    setActiveIconButtons((prev) => ({
      ...prev,
      [iconType]: !prev[iconType],
    }));
  }

  const { register, handleSubmit } = useForm<NewRoomFormState>();
  const onSubmit: SubmitHandler<NewRoomFormState> = (data) => {
    console.log(data);
  };

  return (
    <>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            title={partyroomName}
            toggleSidebar={toggleSidebar}
            isOpen={sidebarIsOpen}
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          <NewRoomTab handleClick={handleClick} isSelected={isSelected} />
          <form
            className="flex mt-6 flex-col w-full md:px-16 md:mt-12 mb-12"
            onSubmit={handleSubmit((v) => onSubmit(v))}
            ref={formRef}
          >
            {/* part 2 form */}
            <div className={`${isSelected === "part_1" ? "hidden" : ""}`}>
              <Part2Form
                setSwitchEnabled={setSwitchEnabled}
                switchEnabled={switchEnabled}
              />
            </div>
            <div
              className={`${
                switchEnabled && isSelected === "part_2" ? "" : "hidden"
              } flex justify-start`}
            >
              <FormHeader title="Confirm your partyroom:" />
            </div>
            {/* part 1 form */}
            <div
              className={`${
                isSelected === "part_1" ||
                (switchEnabled && isSelected === "part_2")
                  ? ""
                  : "hidden"
              }`}
            >
              <Part1Form
                register={register}
                handleInputChange={handleInputChange}
                equipmentFields={equipmentFields}
                handleDelete={handleDelete}
                handleAddMoreEquipment={handleAddMoreEquipment}
                categoryFields={categoryFields}
                handleAddMoreCategories={handleAddMoreCategories}
                handleDeleteCategories={handleDeleteCategories}
                activeIconButtons={activeIconButtons}
                handleFormIconButton={handleFormIconButton}
              />
              {/* next button */}
              <div
                className={`${
                  isSelected === "part_1" ? "" : "hidden"
                } flex flex-wrap justify-center my-12 columns-2 gap-6`}
              >
                <div>
                  <PrimaryButton
                    type="button"
                    label="Next"
                    onClick={() => setIsSelected("part_2")}
                  />
                </div>
                <div>
                  <DangerButton
                    label="Reset"
                    type="button"
                    onClick={() => handleReset()}
                  />
                </div>
              </div>
            </div>
            {/* submit button */}
            <div
              className={`${
                switchEnabled && isSelected === "part_2" ? "" : "hidden"
              } my-12 flex flex-wrap justify-center columns-3 gap-5`}
            >
              <div>
                <PrimaryButton
                  label="Back"
                  type="button"
                  onClick={() => handleBack()}
                />
              </div>
              <div>
                <DangerButton
                  label="Reset"
                  type="button"
                  onClick={() => handleReset()}
                />
              </div>
              <div>
                <SubmitButton label="Submit Your Room!" type="submit" />
              </div>
            </div>
          </form>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
