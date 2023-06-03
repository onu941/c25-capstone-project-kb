interface CardProps {
  date?: number;
  month?: string;
  year?: number;
  name: string;
  time?: string;
  pax?: number;
  address: string;
}

export function BookingCard(props: CardProps) {
  return (
    <div className="flex place-content-center">
      <div className="bg-slate-400 w-11/12 place-content-center place-items-center px-4 py-7 mb-6 rounded-md columns-2 flex drop-shadow-lg">
        <div className="w-full flex place-content-center columns-2">
          <div className="w-fit flex place-content-end place-items-center pr-2 text-7xl">
            {props.date}
          </div>
          <div className="w-fit flex flex-col text-2xl place-content-center">
            <div>{props.month}</div>
            <div>{props.year}</div>
          </div>
        </div>
        <div className="w-full flex flex-col place-content-center place-items-center">
          <div className="font-semibold text-lg mb-2">{props.name}</div>
          <div className="text-md mb-1">
            {props.time} | {props.pax} pax
          </div>
          <div>{props.address}</div>
        </div>
      </div>
    </div>
  );
}

export function PartyroomCard(props: CardProps) {
  return (
    <div className="flex place-content-center">
      <div className="bg-slate-400 w-11/12 place-content-center place-items-center px-4 py-7 mb-6 rounded-md columns-2 flex flex-col drop-shadow-lg">
        <div className="text-3xl mb-5 font-semibold">{props.name}</div>
        <div className="text-xl text-slate-300">{props.address}</div>
      </div>
    </div>
  );
}
