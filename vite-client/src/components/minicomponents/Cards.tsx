import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { PrimaryButton } from "./Buttons";

interface CardProps {
  id?: number;
  date?: number;
  month?: string;
  year?: number;
  name?: string;
  time?: string;
  pax?: number;
  address?: string;
  content?: string;
  score?: number;
  onClick?: () => void;
  image?: string;
  alt?: string;
}

export function BookingCard(props: CardProps) {
  return (
    <div className="flex place-content-center">
      <div className="bg-slate-800 md:w-96 md:px-4 px-6 md:py-7 py-5 mb-6 rounded-xl columns-2 flex drop-shadow-lg border-solid border-2 border-slate-400 gap-4">
        <div className="w-full flex place-content-center columns-2 text-slate-100">
          <div className="w-fit flex place-content-end place-items-center pr-2 md:text-7xl text-6xl">
            {props.date}
          </div>
          <div className="w-fit flex flex-col text-2xl place-content-center">
            <div>{props.month}</div>
            <div>{props.year}</div>
          </div>
        </div>
        <div className="w-full flex flex-col place-content-center place-items-center">
          <div className="font-semibold md:text-lg text-base mb-2 text-center text-slate-100">
            {props.name}
          </div>
          <div className="md:text-base text-base mb-1 text-slate-300">
            {props.time} | {props.pax} pax
          </div>
          <div className="md:text-base text-base text-center text-slate-300">
            {props.address}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingCardLarge(props: CardProps) {
  return (
    <a
      href=""
      className=" hover:brightness-125 transform transition-all duration-200 ease-in-out"
    >
      <div className="card lg:card-side bg-slate-800 drop-shadow-xl border-solid border-slate-700 border-opacity-40 border-2">
        <figure>
          <img src={props.image} alt={props.alt} />
        </figure>
        <div className="card-body mb-1">
          <h2 className="card-title text-slate-200 text-3xl mb-1">
            {props.name}
          </h2>
          <div className="text-slate-300 text-sm md:mb-12 mb-6">
            {props.address}
          </div>
          <div className="text-slate-200 text-lg mb-3">
            {`${props.date} ${props.month} | ${props.pax} pax`}
          </div>
        </div>
      </div>
    </a>
  );
}

export function PartyroomCard(props: CardProps) {
  return (
    <div className="flex place-content-center mb-8 w-full" data-id={props.id}>
      <a
        href=""
        onClick={props.onClick}
        className="w-full flex justify-center hover:brightness-125 transform transition-all duration-200 ease-in-out"
      >
        <div className="bg-slate-800 md:w-96 w-full md:px-4 px-6 md:py-7 py-5 rounded-xl columns-2 flex drop-shadow-lg border-solid border-2 border-slate-400 gap-4 ">
          <div className="w-full h-full">
            <div className="w-full flex flex-col place-content-center place-items-center">
              <div className="font-semibold md:text-2xl text-xl md:mb-7 mb-5 text-center">
                {props.name}
              </div>
              <div className="md:text-lg text-base text-center text-slate-300">
                {props.address}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export function OwnerCard(props: CardProps) {
  return (
    <div className="flex place-content-center">
      <div className="bg-slate-500 w-11/12 place-content-center place-items-center px-4 py-7 mb-6 rounded-md columns-2 flex drop-shadow-lg outline outline-offset-2 outline-slate-400">
        <div className="w-full flex place-content-center">
          <UserCircleIcon className="h-28 w-28 text-slate-200" />
        </div>
        <div className="w-full flex flex-col place-content-center place-items-center">
          <div className="font-semibold text-lg mb-2">{props.name}</div>
          <div className="text-md mb-1">
            <ChatBubbleLeftEllipsisIcon className="h-12 w-12 text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewCard(props: CardProps) {
  return (
    <div className="flex place-content-center">
      <div className="columns-2 bg-slate-500 w-11/12 place-content-center place-items-center px-4 py-7 mb-6 rounded-md flex drop-shadow-lg outline outline-offset-2 outline-slate-400">
        <div className="w-full flex place-content-center text-5xl">
          {props.score}/10
        </div>
        <div className="w-full flex flex-col place-content-center place-items-center">
          <div className="font-semibold text-lg mb-2">{props.name}</div>
          <div className="text-md mb-1">{props.content}</div>
        </div>
      </div>
    </div>
  );
}
