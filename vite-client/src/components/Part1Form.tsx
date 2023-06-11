import { UseFormRegister } from "react-hook-form";
import { PrimaryButton } from "./minicomponents/Buttons";
import { FormHeader } from "./minicomponents/Headers";
import { MiniInput, StandardInput, TextArea } from "./minicomponents/Inputs";
import {
  CategoryField,
  EquipmentField,
  NewRoomFormState,
} from "../pages/NewRoom";
import { useState } from "react";
import {
  FamilyIcon,
  FriendsIcon,
  GeneralPartyIcon,
  WeddingIcon,
} from "../assets/MaterialIcons";
import { BriefcaseIcon, CakeIcon, HeartIcon } from "@heroicons/react/20/solid";

export interface Form1Props {
  register: UseFormRegister<NewRoomFormState>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  equipmentFields: EquipmentField[];
  categoryFields: CategoryField[];
  handleDelete: (id: number) => void;
  handleAddMoreEquipment: () => void;
  handleAddMoreCategories: () => void;
  handleDeleteCategories: (id: number) => void;
}

export function Part1Form(props: Form1Props) {
  const [isEditing, setIsEditing] = useState(true);

  return (
    <>
      <StandardInput
        type="text"
        placeholder="name your partyroom"
        register={props.register("name")}
        onChange={props.handleInputChange}
        isEditing
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
        isEditing
      />
      <StandardInput
        placeholder="line 2"
        type="text"
        register={props.register("address_2")}
        isEditing
      />
      <StandardInput
        placeholder="line 3"
        type="text"
        register={props.register("address_3")}
        isEditing
      />
      <FormHeader title="What is your partyroom best used for?" />
      <div className="w-full sm:px-8 md:px-36 columns-3 mb-6">
        <div className="w-full flex flex-col justify-center">
          <button className="flex flex-col place-items-center mb-4">
            <GeneralPartyIcon className="w-16 h-16" />
            General
          </button>
          <button className="flex flex-col place-items-center">
            <HeartIcon className="text-slate-300 w-16 h-16" />
            Dates
          </button>
        </div>
        <div className="w-full flex flex-col justify-center">
          <button className="flex flex-col place-items-center mb-4">
            <FamilyIcon className="w-16 h-16" />
            Families
          </button>
          <button className="flex flex-col place-items-center">
            <BriefcaseIcon className="text-slate-300 w-16 h-16" />
            Businesses
          </button>
        </div>
        <div className="w-full flex flex-col justify-center">
          <button className="flex flex-col place-items-center mb-4">
            <CakeIcon className="text-slate-300 w-16 h-16" />
            Birthdays
          </button>
          <button className="flex flex-col place-items-center">
            <WeddingIcon className="w-16 h-16" />
            Weddings
          </button>
        </div>
      </div>
      <div id="hidden-category-inputs" hidden>
        {props.categoryFields.map((field) =>
          field.id <= 1 ? (
            <StandardInput
              key={field.id}
              placeholder={`category ${field.id} (e.g. birthday parties)`}
              type="text"
              register={props.register(
                `category.${field.id - 1}.name` as const
              )}
              name={`category.${field.id - 1}.name`}
              isEditing
            />
          ) : (
            <StandardInput
              key={field.id}
              placeholder={`category ${field.id}`}
              type="text"
              register={props.register(
                `category.${field.id - 1}.name` as const
              )}
              name={`category.${field.id - 1}.name`}
              canDelete
              onDelete={() => props.handleDeleteCategories(field.id)}
              isEditing
            />
          )
        )}
        <div className="w-full flex place-content-center mt-5">
          <PrimaryButton
            type="button"
            onClick={props.handleAddMoreCategories}
            label="Add More"
          />
        </div>
      </div>
      <FormHeader title="What are your room's key items?" />
      <div className="w-full sm:px-8 md:px-36 columns-3 mb-6">
        <div className="w-full flex flex-col justify-center">
          <button className="flex flex-col place-items-center mb-4">
            <GeneralPartyIcon className="w-16 h-16" />
            Mahjong
          </button>
          <button className="flex flex-col place-items-center">
            <HeartIcon className="text-slate-300 w-16 h-16" />
            Video Games
          </button>
        </div>
        <div className="w-full flex flex-col justify-center">
          <button className="flex flex-col place-items-center mb-4">
            <FamilyIcon className="w-16 h-16" />
            BBQ
          </button>
          <button className="flex flex-col place-items-center">
            <BriefcaseIcon className="text-slate-300 w-16 h-16" />
            Board Games
          </button>
        </div>
        <div className="w-full flex flex-col justify-center">
          <button className="flex flex-col place-items-center mb-4">
            <CakeIcon className="text-slate-300 w-16 h-16" />
            Karaoke
          </button>
          <button className="flex flex-col place-items-center">
            <WeddingIcon className="w-16 h-16" />
            TV / Streaming
          </button>
        </div>
      </div>
      <div id="hidden-equipment-inputs" hidden>
        {props.equipmentFields.map((field) =>
          field.id <= 3 ? (
            <StandardInput
              key={field.id}
              placeholder={`equipment ${field.id}`}
              type="text"
              register={props.register(
                `equipment.${field.id - 1}.name` as const
              )}
              name={`equipment.${field.id - 1}.name`}
              isEditing
            />
          ) : (
            <StandardInput
              key={field.id}
              placeholder={`equipment ${field.id}`}
              type="text"
              register={props.register(
                `equipment.${field.id - 1}.name` as const
              )}
              name={`equipment.${field.id - 1}.name`}
              onDelete={() => props.handleDelete(field.id)}
              canDelete
              isEditing
            />
          )
        )}
        <div className="w-full flex place-content-center mt-5">
          <PrimaryButton
            type="button"
            onClick={props.handleAddMoreEquipment}
            label="Add More"
          />
        </div>
      </div>
      <FormHeader title="Add any other features that weren't previously mentioned:" />
      <TextArea
        placeholder="Max 150 characters"
        register={props.register("description")}
      />
    </>
  );
}
