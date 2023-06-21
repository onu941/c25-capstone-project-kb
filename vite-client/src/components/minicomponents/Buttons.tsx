import { BriefcaseIcon, CakeIcon, HeartIcon } from "@heroicons/react/20/solid";
import {
  ButtonProps,
  FormIconButtonProps,
  SettingsTabButtonProps,
  SubmitRoomFormState,
} from "../../app/interface";
import {
  BBQIcon,
  BoardGamesIcon,
  FamilyIcon,
  GeneralPartyIcon,
  KaraokeIcon,
  MahjongIcon,
  VideoGamesIcon,
  WeddingIcon,
} from "../../assets/MaterialIcons";
import { TvIcon } from "@heroicons/react/24/outline";
import { ComponentType } from "react";
import { FormHeader } from "./Headers";
import { UseFormRegister } from "react-hook-form";

export function PrimaryButton(props: ButtonProps) {
  return (
    <div className={`${props.isCentered ? "flex justify-center" : ""}`}>
      <button
        type={props.type}
        className={`py-2 px-4 bg-slate-800 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-offset-1 outline-slate-700 transition duration-200 ease-in-out ${
          props.disabled
            ? "opacity-50"
            : "hover:scale-110 hover:-translate-y-1 hover:brightness-125"
        }`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </div>
  );
}

export function DangerButton(props: ButtonProps) {
  return (
    <div className={`${props.isCentered ? "flex justify-center" : ""}`}>
      <button
        type={props.type}
        className={`py-2 px-4 bg-pink-600 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-2 outline-offset-1 outline-neutral-400 transform transition duration-200 ease-in-out ${
          props.disabled
            ? "opacity-40"
            : "hover:-translate-y-1 hover:scale-110 active:translate-y-0 hover:bg-fuchsia-600"
        }`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </div>
  );
}

export function SubmitButton(props: ButtonProps) {
  return (
    <div className={`${props.isCentered ? "flex justify-center" : ""}`}>
      <button
        type="submit"
        className={`py-2 px-4 bg-emerald-600 rounded-xl flex place-content-center place-items-center mb-6 w-fit drop-shadow-lg outline outline-2 outline-offset-1 outline-neutral-400 transform transition duration-200 ease-in-out ${
          props.disabled
            ? "opacity-40"
            : "hover:-translate-y-1 hover:scale-110 active:translate-y-0 hover:bg-lime-600"
        }`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </div>
  );
}

export function SettingsTabButton(props: SettingsTabButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`tab tab-bordered dark:text-slate-300 tab-lg md:text-xl text-base ${
        props.isSelected ? "tab-active" : ""
      }`}
    >
      {props.name}
    </button>
  );
}

export function BookingButton(props: ButtonProps) {
  return (
    <div className="absolute md:bottom-32 md:right-16 bottom-24 right-6 z-30 drop-shadow-lg">
      <button
        type={props.type}
        className="bg-fuchsia-500 md:bg-opacity-80 bg-opacity-40 md:w-32 md:h-32 w-20 h-20 rounded-full border-solid md:border-4 border-2 border-slate-300 md:border-opacity-100 border-opacity-50"
        onClick={props.onClick}
      >
        <div className="flex flex-wrap flex-col md:text-2xl text-base font-bold">
          {props.label}
        </div>
      </button>
    </div>
  );
}

export function FormIconButton(props: FormIconButtonProps) {
  const color =
    props.color || props.selected ? "text-slate-300" : "text-slate-600";
  return (
    <button
      type="button"
      className="flex flex-col place-items-center mb-4"
      onClick={props.onClick}
    >
      {props.icon === "general" && (
        <>
          <GeneralPartyIcon
            color={color}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>General</span>
        </>
      )}
      {props.icon === "dates" && (
        <>
          <HeartIcon className={`${color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Dates</span>
        </>
      )}
      {props.icon === "families" && (
        <>
          <FamilyIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>Families</span>
        </>
      )}
      {props.icon === "businesses" && (
        <>
          <BriefcaseIcon className={`${color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Businesses</span>
        </>
      )}
      {props.icon === "birthdays" && (
        <>
          <CakeIcon className={`${color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Birthdays</span>
        </>
      )}
      {props.icon === "weddings" && (
        <>
          <WeddingIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>Weddings</span>
        </>
      )}
      {props.icon === "mahjong" && (
        <>
          <MahjongIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>Mahjong</span>
        </>
      )}
      {props.icon === "video_games" && (
        <>
          <VideoGamesIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>Video Games</span>
        </>
      )}
      {props.icon === "bbq" && (
        <>
          <BBQIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>BBQ</span>
        </>
      )}
      {props.icon === "board_games" && (
        <>
          <BoardGamesIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>Board Games</span>
        </>
      )}
      {props.icon === "karaoke" && (
        <>
          <KaraokeIcon color={color} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>Karaoke</span>
        </>
      )}
      {props.icon === "tv" && (
        <>
          <TvIcon className={`${color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Streaming</span>
        </>
      )}
    </button>
  );
}
