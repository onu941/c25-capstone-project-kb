import { FormHeader } from "./minicomponents/Headers";
import {
  DropdownInput,
  MiniInput,
  StandardInput,
  TextArea,
} from "./minicomponents/Inputs";
import { Form1Props } from "../app/interface";
import { FormIconButton } from "./minicomponents/Buttons";

export function Part1Form(props: Form1Props) {
  const districts = [
    { value: "Kwai Tsing", label: "Kwai Tsing" },
    { value: "Yau Tsim Mong", label: "Yau Tsim Mong" },
    { value: "Wan Chai", label: "Wan Chai" },
    { value: "Kwun Tong", label: "Kwun Tong" },
  ];

  return (
    <>
      <div id="basics" className="mb-8">
        <StandardInput
          name="name"
          type="text"
          placeholder="name your partyroom"
          register={props.register("name")}
          onChange={props.handleInputChange}
          isEditing
        />
        <div className="flex flex-row w-full justify-between">
          <MiniInput
            name="room_size"
            type="text"
            placeholder="area (ft²)"
            register={props.register("room_size")}
          />
          <MiniInput
            name="capacity"
            type="text"
            placeholder="capacity"
            register={props.register("capacity")}
          />
        </div>
      </div>
      <div className="mb-12">
        <StandardInput
          name="address"
          placeholder="address line 1 (room, building, street)"
          type="text"
          register={props.register("address")}
          isEditing
        />
        <DropdownInput
          name="district"
          options={districts}
          register={props.register("district")}
          placeholder="your district"
        />
      </div>
      <FormHeader title="What is your partyroom designed for?" />
      <div
        id="category-icon-buttons"
        className="w-full sm:px-8 md:px-36 columns-3 mb-6"
      >
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="general"
            onClick={() => props.handleFormIconButton("General")}
            color={
              props.activeIconButtons.General
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.General
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
          <FormIconButton
            icon="dates"
            onClick={() => props.handleFormIconButton("Dates")}
            color={
              props.activeIconButtons.Dates
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Dates
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="families"
            onClick={() => props.handleFormIconButton("Families")}
            color={
              props.activeIconButtons.Families
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Families
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
          <FormIconButton
            icon="businesses"
            onClick={() => props.handleFormIconButton("Businesses")}
            color={
              props.activeIconButtons.Businesses
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Businesses
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="birthdays"
            onClick={() => props.handleFormIconButton("Birthdays")}
            color={
              props.activeIconButtons.Birthdays
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Birthdays
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
          <FormIconButton
            icon="weddings"
            onClick={() => props.handleFormIconButton("Weddings")}
            color={
              props.activeIconButtons.Weddings
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Weddings
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
        </div>
      </div>
      <div id="hidden-category-inputs" hidden>
        {props.activeIconButtons.General && (
          <div>
            <StandardInput
              key="general"
              defaultValue="general"
              type="text"
              {...props.register("category.0.name" as const)}
              name="category.0.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.Families && (
          <div>
            <StandardInput
              key="families"
              defaultValue="families"
              type="text"
              {...props.register("category.1.name" as const)}
              name="category.1.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.Birthdays && (
          <div>
            <StandardInput
              key="birthdays"
              defaultValue="birthdays"
              type="text"
              {...props.register("category.2.name" as const)}
              name="category.2.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.Dates && (
          <div>
            <StandardInput
              key="dates"
              defaultValue="dates"
              type="text"
              {...props.register("category.3.name" as const)}
              name="category.3.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.Businesses && (
          <div>
            <StandardInput
              key="businesses"
              defaultValue="businesses"
              type="text"
              {...props.register("category.4.name" as const)}
              name="category.4.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.Weddings && (
          <div>
            <StandardInput
              key="weddings"
              defaultValue="weddings"
              type="text"
              {...props.register("category.5.name" as const)}
              name="category.5.name"
              isEditing
            />
          </div>
        )}
        {/* {props.categoryFields.map((field) =>
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
        </div> */}
      </div>
      <FormHeader title="What are your partyroom's key items?" />
      <div
        id="equipment-icon-buttons"
        className="w-full sm:px-8 md:px-36 columns-3 mb-6"
      >
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="mahjong"
            onClick={() => props.handleFormIconButton("Mahjong")}
            color={
              props.activeIconButtons.Mahjong
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Mahjong
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
          <FormIconButton
            icon="video_games"
            onClick={() => props.handleFormIconButton("VideoGames")}
            color={
              props.activeIconButtons.VideoGames
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.VideoGames
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="bbq"
            onClick={() => props.handleFormIconButton("BBQ")}
            color={
              props.activeIconButtons.BBQ ? "text-slate-300" : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.BBQ ? "text-slate-300" : "text-slate-600"
            }
          />
          <FormIconButton
            icon="board_games"
            onClick={() => props.handleFormIconButton("BoardGames")}
            color={
              props.activeIconButtons.BoardGames
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.BoardGames
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="karaoke"
            onClick={() => props.handleFormIconButton("Karaoke")}
            color={
              props.activeIconButtons.Karaoke
                ? "text-slate-300"
                : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.Karaoke
                ? "text-slate-300"
                : "text-slate-600"
            }
          />
          <FormIconButton
            icon="tv"
            onClick={() => props.handleFormIconButton("TV")}
            color={
              props.activeIconButtons.TV ? "text-slate-300" : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.TV ? "text-slate-300" : "text-slate-600"
            }
          />
        </div>
      </div>
      <div id="hidden-equipment-inputs" hidden>
        {props.activeIconButtons.Mahjong && (
          <div>
            <StandardInput
              key="mahjong"
              defaultValue="mahjong"
              type="text"
              {...props.register("equipment.0.name" as const)}
              name="equipment.0.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.BBQ && (
          <div>
            <StandardInput
              key="bbq"
              defaultValue="bbq"
              type="text"
              {...props.register("equipment.1.name" as const)}
              name="equipment.1.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.Karaoke && (
          <div>
            <StandardInput
              key="karaoke"
              defaultValue="karaoke"
              type="text"
              {...props.register("equipment.2.name" as const)}
              name="equipment.2.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.VideoGames && (
          <div>
            <StandardInput
              key="videogames"
              defaultValue="video games"
              type="text"
              {...props.register("equipment.3.name" as const)}
              name="equipment.3.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.BoardGames && (
          <div>
            <StandardInput
              key="boardgames"
              defaultValue="board games"
              type="text"
              {...props.register("equipment.4.name" as const)}
              name="equipment.4.name"
              isEditing
            />
          </div>
        )}
        {props.activeIconButtons.TV && (
          <div>
            <StandardInput
              key="tv"
              defaultValue="tv"
              type="text"
              {...props.register("equipment.5.name" as const)}
              name="equipment.5.name"
              isEditing
            />
          </div>
        )}
        {/* {props.equipmentFields.map((field) =>
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
        </div> */}
      </div>
      <FormHeader title="Add your partyroom's pricing plans:" />
      <FormHeader title="Add any other features that weren't previously mentioned:" />
      <TextArea
        placeholder="Max 150 characters"
        register={props.register("description")}
      />
    </>
  );
}
