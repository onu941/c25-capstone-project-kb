import { useForm } from "react-hook-form";
import { FullScreen } from "./Containers";
import { AppHeader, FormHeader } from "./Header";
import { useState } from "react";
import {
  MiniInput,
  StandardInput,
  StandardInputDeleteDisabled,
  TextArea,
} from "./Inputs";
import { PrimaryButton } from "./Buttons";
import { Tab } from "./Tab";

type FormState = {
  name: string;
  area: number;
  capacity: number;
  address_1: string;
  address_2: string;
  address_3: string;
  equipment_1: string;
  equipment_2: string;
  equipment_3: string;
};

export default function NewRoom() {
  const [partyroomName, setPartyroomName] = useState("Submit Your Partyroom");
  const [equipmentItems, setEquipmentItems] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.trim() === ""
      ? setPartyroomName("Submit Your Partyroom")
      : setPartyroomName(e.target.value);
  };

  const { register, handleSubmit } = useForm<FormState>();

  return (
    <>
      <FullScreen>
        <AppHeader title={partyroomName}></AppHeader>
        <form className="flex mt-6 flex-col w-full px-8 mb-12">
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
          />
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
          <StandardInputDeleteDisabled
            placeholder="equipment 1"
            type="text"
            register={register("equipment_1")}
          />
          <StandardInputDeleteDisabled
            placeholder="equipment 2"
            type="text"
            register={register("equipment_2")}
          />
          <StandardInputDeleteDisabled
            placeholder="equipment 3"
            type="text"
            register={register("equipment_3")}
          />
          <div className="w-full flex place-content-center mt-5">
            <PrimaryButton label="Add More" />
          </div>
          <FormHeader title="Tell us a little more about your partyroom:" />
          <TextArea placeholder="Max 150 characters" />
        </form>
        <div className="flex w-full place-content-center">
          <PrimaryButton label="Next: Upload Images" />
        </div>
      </FullScreen>
      <Tab />
    </>
  );
}
