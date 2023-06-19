import { FormIconButton } from "../minicomponents/Buttons";
import { FormHeader } from "../minicomponents/Headers";
import {
  CheckboxRefs,
  FormCategoryEquipmentProps,
  FormProps,
} from "../../app/interface";
import { StandardInput } from "../minicomponents/Inputs";
import { useRef } from "react";

export default function RoomFormCategoryEquipment(
  props: FormCategoryEquipmentProps
) {
  const checkboxRefs: CheckboxRefs = {
    General: useRef<HTMLInputElement>(null),
    Dates: useRef<HTMLInputElement>(null),
    Families: useRef<HTMLInputElement>(null),
    Businesses: useRef<HTMLInputElement>(null),
    Birthdays: useRef<HTMLInputElement>(null),
    Weddings: useRef<HTMLInputElement>(null),
    Mahjong: useRef<HTMLInputElement>(null),
    BBQ: useRef<HTMLInputElement>(null),
    Karaoke: useRef<HTMLInputElement>(null),
    VideoGames: useRef<HTMLInputElement>(null),
    BoardGames: useRef<HTMLInputElement>(null),
    TV: useRef<HTMLInputElement>(null),
  };

  function handleIconButtonClick(name: string) {
    if (checkboxRefs[name].current) {
      checkboxRefs[name].current!.checked =
        !checkboxRefs[name].current!.checked;
    }
    props.handleFormIconButton(name);
  }

  return (
    <>
      <div>
        <FormHeader title="What is your partyroom designed for?" />
        <div className="w-full sm:px-8 md:px-36 grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col justify-center">
            <FormIconButton
              icon="general"
              onClick={() => handleIconButtonClick("General")}
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
              onClick={() => handleIconButtonClick("Dates")}
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
              onClick={() => handleIconButtonClick("Families")}
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
              onClick={() => handleIconButtonClick("Businesses")}
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
              onClick={() => handleIconButtonClick("Birthdays")}
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
              onClick={() => handleIconButtonClick("Weddings")}
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
      <div id="hidden-category-inputs">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">General</span>
            <input
              type="checkbox"
              name="general"
              className="checkbox"
              ref={checkboxRefs.General}
              value={1}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Families</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.Families}
              value={2}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Businesses</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.Businesses}
              value={5}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Dates</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.Dates}
              value={4}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Birthdays</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.Birthdays}
              value={3}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Weddings</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.Weddings}
              value={6}
            />
          </label>
        </div>
      </div>
      <FormHeader title="What are your partyroom's key items?" />
      <div
        id="equipment-icon-buttons"
        className="w-full sm:px-8 md:px-36 columns-3 mb-6"
      >
        <div className="w-full flex flex-col justify-center">
          <FormIconButton
            icon="mahjong"
            onClick={() => handleIconButtonClick("Mahjong")}
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
            onClick={() => handleIconButtonClick("VideoGames")}
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
            onClick={() => handleIconButtonClick("BBQ")}
            color={
              props.activeIconButtons.BBQ ? "text-slate-300" : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.BBQ ? "text-slate-300" : "text-slate-600"
            }
          />
          <FormIconButton
            icon="board_games"
            onClick={() => handleIconButtonClick("BoardGames")}
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
            onClick={() => handleIconButtonClick("Karaoke")}
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
            onClick={() => handleIconButtonClick("TV")}
            color={
              props.activeIconButtons.TV ? "text-slate-300" : "text-slate-600"
            }
            spanClassName={
              props.activeIconButtons.TV ? "text-slate-300" : "text-slate-600"
            }
          />
        </div>
      </div>
      <div id="hidden-equipment-inputs">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Mahjong</span>
            <input
              type="checkbox"
              name="general"
              className="checkbox"
              ref={checkboxRefs.Mahjong}
              value={1}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">BBQ</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.BBQ}
              value={2}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Karaoke</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.Karaoke}
              value={3}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Video Games</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.VideoGames}
              value={4}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Board Games</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.BoardGames}
              value={5}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Streaming</span>
            <input
              type="checkbox"
              className="checkbox"
              ref={checkboxRefs.TV}
              value={6}
            />
          </label>
        </div>
      </div>
    </>
  );
}
