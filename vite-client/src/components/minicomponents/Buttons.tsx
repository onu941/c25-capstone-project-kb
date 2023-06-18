import { BriefcaseIcon, CakeIcon, HeartIcon } from "@heroicons/react/20/solid";
import { ButtonProps, SettingsTabButtonProps } from "../../app/interface";
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
    <div className="absolute md:bottom-32 md:right-16 z-30 drop-shadow-lg">
      <button
        type={props.type}
        className="bg-fuchsia-500 bg-opacity-80 md:w-32 md:h-32 rounded-full border-solid border-4 border-slate-300"
        onClick={props.onClick}
      >
        <div className="flex flex-wrap flex-col text-2xl font-bold">
          {props.label}
        </div>
      </button>
    </div>
  );
}

export function FormIconButton(props: ButtonProps) {
  return (
    <button
      type="button"
      className="flex flex-col place-items-center mb-4"
      onClick={props.onClick}
    >
      {props.icon === "general" && (
        <>
          <GeneralPartyIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>General</span>
        </>
      )}
      {props.icon === "dates" && (
        <>
          <HeartIcon className={`${props.color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Dates</span>
        </>
      )}
      {props.icon === "families" && (
        <>
          <FamilyIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>Families</span>
        </>
      )}
      {props.icon === "businesses" && (
        <>
          <BriefcaseIcon
            className={`${props.color} md:w-16 md:h-16 w-12 h-12`}
          />
          <span className={props.spanClassName}>Businesses</span>
        </>
      )}
      {props.icon === "birthdays" && (
        <>
          <CakeIcon className={`${props.color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Birthdays</span>
        </>
      )}
      {props.icon === "weddings" && (
        <>
          <WeddingIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>Weddings</span>
        </>
      )}
      {props.icon === "mahjong" && (
        <>
          <MahjongIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>Mahjong</span>
        </>
      )}
      {props.icon === "video_games" && (
        <>
          <VideoGamesIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>Video Games</span>
        </>
      )}
      {props.icon === "bbq" && (
        <>
          <BBQIcon color={props.color!} className="md:w-16 md:h-16 w-12 h-12" />
          <span className={props.spanClassName}>BBQ</span>
        </>
      )}
      {props.icon === "board_games" && (
        <>
          <BoardGamesIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>Board Games</span>
        </>
      )}
      {props.icon === "karaoke" && (
        <>
          <KaraokeIcon
            color={props.color!}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <span className={props.spanClassName}>Karaoke</span>
        </>
      )}
      {props.icon === "tv" && (
        <>
          <TvIcon className={`${props.color} md:w-16 md:h-16 w-12 h-12`} />
          <span className={props.spanClassName}>Streaming</span>
        </>
      )}
    </button>
  );
}
