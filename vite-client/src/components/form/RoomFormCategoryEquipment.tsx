import { FormIconButton } from "../minicomponents/Buttons";
import { FormHeader } from "../minicomponents/Headers";
import { FormCategoryEquipmentProps, FormProps } from "../../app/interface";
import { StandardInput } from "../minicomponents/Inputs";

export default function RoomFormCategoryEquipment(
  props: FormCategoryEquipmentProps
) {
  return (
    <>
      <div>
        <FormHeader title="What is your partyroom designed for?" />
        <div className="w-full sm:px-8 md:px-36 grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col justify-center">
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
          <div className="flex flex-col justify-center">
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
          <div className="flex flex-col justify-center">
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
            />
          </div>
        )}
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
            />
          </div>
        )}
      </div>
    </>
  );
}
