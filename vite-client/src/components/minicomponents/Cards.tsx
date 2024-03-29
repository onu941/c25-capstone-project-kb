import {
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

export interface CardProps {
  id?: number;
  date?: string | number;
  month?: string;
  year?: string | number;
  name?: string;
  time?: string;
  pax?: number;
  address?: string;
  content?: string;
  score?: string;
  onClick?: () => void;
  image?: string;
  alt?: string;
  review_text?: string;
  phone?: number | string;
  whatsAppUrl?: any;
}

export function BookingCardLarge(props: CardProps) {
  return (
    <a
      href=""
      onClick={props.onClick}
      className=" hover:brightness-125 transform transition-all duration-200 ease-in-out"
    >
      <div
        key={props.id}
        className="card lg:card-side bg-slate-800 drop-shadow-xl border-solid border-slate-700 border-opacity-40 border-2"
      >
        <figure>
          <img src={props.image} alt={props.alt} />
        </figure>
        <div className="card-body flex flex-col place-content-">
          <h2 className="card-title text-slate-200 text-2xl">{props.name}</h2>
          <div className="text-slate-300 text-sm md:mb-8">{props.address}</div>
          <div className="text-slate-200 text-xl font-semibold">{`${props.time}`}</div>
          <div className="text-slate-200 text-sm">
            {`${props.date} ${props.month} | ${props.pax} pax`}
          </div>
        </div>
      </div>
    </a>
  );
}

export function BookingCard(props: CardProps) {
  return (
    <div className="flex place-content-center mx-4">
      <a
        href=""
        onClick={props.onClick}
        className="w-full flex place-content-center hover:brightness-125 transform transition-all duration-200 ease-in-out"
      >
        <div className="bg-slate-800 md:w-96 w-full md:px-4 px-2 md:py-7 py-5 mb-6 rounded-xl columns-2 flex drop-shadow-lg border-solid border-2 border-slate-400 md:gap-2">
          <div className="w-full flex place-content-center columns-2 text-slate-300">
            <div className="w-fit flex place-content-end place-items-center pr-2 md:text-7xl text-5xl">
              {props.date}
            </div>
            <div className="w-fit flex flex-col md:text-2xl text-lg place-content-center">
              <div>{props.month}</div>
              <div>{props.year}</div>
            </div>
          </div>
          <div className="w-full flex flex-col place-content-center place-items-center">
            <div className="font-semibold md:text-lg text-base mb-2 text-center text-slate-200">
              {props.name}
            </div>
            <div className="md:text-base text-sm mb-1 text-slate-300">
              {props.time} | {props.pax} pax
            </div>
            <div className="md:text-sm text-sm text-center text-slate-300">
              {props.address}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export function PartyroomCardLarge(props: CardProps) {
  return (
    <a
      href=""
      onClick={props.onClick}
      className=" hover:brightness-125 transform transition-all duration-200 ease-in-out"
    >
      <div
        key={props.id}
        className="card lg:card-side bg-slate-800 drop-shadow-xl border-solid border-slate-700 border-opacity-40 border-2"
      >
        <figure>
          <img src={props.image} alt={props.alt} />
        </figure>
        <div className="card-body flex flex-col place-content-">
          <h2 className="card-title text-slate-200 text-lg">{props.name}</h2>
          <div className="text-slate-300 text-sm md:mb-4">{props.address}</div>
          <div className="text-slate-200 text-base font-semibold">{`${props.pax} pax`}</div>
        </div>
      </div>
    </a>
  );
}

export function PartyroomCard(props: CardProps) {
  return (
    <div className="flex place-content-center mb-8 w-full" key={props.id}>
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
    <>
      <div className="flex place-content-center">
        <div className="bg-slate-800 md:w-96 w-full md:px-4 px-2 md:py-7 py-5 rounded-xl columns-2 flex drop-shadow-lg border-solid border-2 border-slate-400 md:gap-2">
          <div className="w-full flex place-content-center">
            <UserCircleIcon className="h-28 w-28 text-slate-300" />
          </div>
          <div className="w-full flex flex-col place-content-center place-items-center">
            <div className="font-semibold md:text-2xl text-base mb-6 text-center text-slate-100">
              {props.name}
            </div>
            <div className="md:text-lg text-sm mb-1 text-slate-300">
              <a
                href={props.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-400"
              >
                <ChatBubbleLeftEllipsisIcon className="h-9 w-9 text-slate-300 hover:brightness-110 hover:-translate-y-1 transform transition-all duration-200 ease-in-out" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ReviewCard(props: CardProps) {
  return (
    <div className="card lg:card-side bg-transparent drop-shadow-xl border-solid border-slate-700 border-2 columns-2">
      <div className="p-2 py-8 px-8 place-items-center place-content-center text-center md:text-start flex italic text-slate-200 text-lg leading-relaxed border-r-2 border-solid border-slate-700">
        {`"${props.review_text}"`}
      </div>
      <div className="card-body flex w-fill md:flex-col flex-row bg-slate-800 bg-opacity-50">
        <div className="card-title text-slate-200 md:text-5xl text-4xl mb-3 md:me-0 me-6 font-light tracking-wider">
          {props.score}
        </div>
        <div className="text-slate-300 text-base mb-3">
          {props.name}
          <br></br>
          {props.date}
        </div>
      </div>
    </div>
  );
}
