import {
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

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
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={props.image} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.address}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">See more</button>
        </div>
      </div>
    </div>
  );
}

export function PartyroomCard(props: CardProps) {
  return (
    <div className="flex place-content-center mb-8" data-id={props.id}>
      <a href="" onClick={props.onClick} className="w-full flex justify-center">
        <div className="bg-slate-800 md:w-96 md:px-4 px-6 md:py-7 py-5 rounded-xl columns-2 flex drop-shadow-lg border-solid border-2 border-slate-400 gap-4">
          <div className="w-full h-full">
            <div className="w-full flex flex-col place-content-center place-items-center">
              <div className="font-semibold md:text-2xl text-base mb-7 text-center">
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
