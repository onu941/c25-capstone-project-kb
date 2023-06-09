import { UseFormRegister } from "react-hook-form";
import { PrimaryButton } from "./minicomponents/Buttons";
import { FormHeader } from "./minicomponents/Headers";
import { MiniInput, StandardInput, TextArea } from "./minicomponents/Inputs";
import {
  CategoryField,
  EquipmentField,
  NewRoomFormState,
} from "../pages/NewRoom";

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
      <FormHeader title="What is your partyroom best used for?" />
      {props.categoryFields.map((field) =>
        field.id <= 1 ? (
          <StandardInput
            key={field.id}
            placeholder={`category ${field.id} (e.g. birthday parties)`}
            type="text"
            register={props.register(`category.${field.id - 1}.name` as const)}
            name={`category.${field.id - 1}.name`}
          />
        ) : (
          <StandardInput
            key={field.id}
            placeholder={`category ${field.id}`}
            type="text"
            register={props.register(`category.${field.id - 1}.name` as const)}
            name={`category.${field.id - 1}.name`}
            canDelete
            onDelete={() => props.handleDeleteCategories(field.id)}
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
          onClick={props.handleAddMoreEquipment}
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
