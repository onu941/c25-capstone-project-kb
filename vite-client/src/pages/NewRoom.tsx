import { FullScreen } from "../components/Containers";
import { AppHeader, FormHeader } from "../components/Header";
import { useState } from "react";
import {
  AddressLine2,
  AddressLine3,
  MiniInput,
  StandardInput,
  TextArea,
} from "../components/Inputs";
import { PrimaryButton } from "../components/Buttons";
import { Tab } from "../components/Tab";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

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
};

export default function NewRoom() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [partyroomName, setPartyroomName] = useState("Submit Your Partyroom");
  const [equipmentFields, setEquipmentFields] = useState<EquipmentField[]>([
    { id: 1, name: "Equipment 1" },
    { id: 2, name: "Equipment 2" },
    { id: 3, name: "Equipment 3" },
  ]);

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
        <form
          className="flex mt-6 flex-col w-full px-8 mb-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <StandardInput
            type="text"
            placeholder="name your partyroom"
            register={register("name")}
            onChange={handleInputChange}
          />
          <div className="flex flex-row w-full justify-between">
            <MiniInput
              type="text"
              placeholder="area"
              register={register("area")}
            />
            <MiniInput
              type="text"
              placeholder="capacity"
              register={register("capacity")}
            />
          </div>
          <FormHeader title="Address: " />
          <StandardInput
            placeholder="line 1"
            type="text"
            register={register("address_1")}
            canEdit={false}
            canDelete={false}
          />
          {/* <AddressLine2 />
          <AddressLine3 /> */}
          <StandardInput
            placeholder="line 2"
            type="text"
            register={register("address_2")}
          />
          <StandardInput
            placeholder="line 3"
            type="text"
            register={register("address_3")}
          />
          <div className="text-3xl flex justify-center my-6">Hashtags TBD</div>
          <FormHeader title="Facilities (min. 3)" />
          {equipmentFields.map((field) =>
            field.id <= 3 ? (
              <StandardInput
                key={field.id}
                placeholder={`equipment ${field.id}`}
                type="text"
                register={register(`equipment.${field.id - 1}.name` as const)}
                name={`equipment.${field.id - 1}.name`}
              />
            ) : (
              <StandardInput
                key={field.id}
                placeholder={`equipment ${field.id}`}
                type="text"
                register={register(`equipment.${field.id - 1}.name` as const)}
                name={`equipment.${field.id - 1}.name`}
                onDelete={() => handleDelete(field.id)}
                canDelete
              />
            )
          )}
          <div className="w-full flex place-content-center mt-5">
            <PrimaryButton
              type="button"
              onClick={handleAddMore}
              label="Add More"
            />
          </div>
          <FormHeader title="Tell us a little more about your partyroom:" />
          <TextArea placeholder="Max 150 characters" />
          <PrimaryButton label="submit" type="submit"></PrimaryButton>
        </form>
        <div className="flex w-full place-content-center mb-12">
          <Link to="/new_room_2">
            <PrimaryButton label="Next: Upload Images" />
          </Link>
        </div>
      </FullScreen>
      <Tab />
    </>
  );
}
