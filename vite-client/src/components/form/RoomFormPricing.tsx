import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { FormHeader } from "../minicomponents/Headers";
import { StandardInput } from "../minicomponents/Inputs";
import { FormProps } from "../../app/interface";

export default function RoomFormPricing(props: FormProps) {
  return (
    <>
      <div className="mb-8">
        <FormHeader title="Price your partyroom:" />
        <div className="text-slate-300 w-full flex justify-center bg-slate-950 bg-opacity-30 p-12 border-solid border-2 rounded-md border-slate-500 border-opacity-30 overflow-auto">
          {props.priceLists!.map((listIndex) => (
            <div
              key={listIndex}
              className="price-list w-96 rounded-lg p-8 md:px-10 px-8 border-solid border-2 border-slate-300 border-opacity-50 drop-shadow-lg bg-slate-800 bg-opacity-60"
            >
              <div className="text-xl mb-8 text-center font-semibold text-slate-200">
                Price List {listIndex}
              </div>
              <div>Is this plan for weekdays or weekends & holidays?</div>
              <StandardInput
                type="text"
                {...props.register(`price_list.${listIndex - 1}.is_holiday`)}
              />
              <div>What is the base room fee?</div>
              <StandardInput
                type="number"
                {...props.register(`price_list.${listIndex - 1}.base_room_fee`)}
                step={100}
                defaultValue={200}
                min={100}
              />
              <div>What is the price / person?</div>
              <StandardInput
                type="number"
                {...props.register(`price_list.${listIndex - 1}.headcount`)}
                step={50}
                defaultValue={100}
                min={0}
              />
              <div>Enter the start time for this price block (24 hr time)</div>
              <StandardInput
                type="time"
                step={1800}
                {...props.register(`price_list.${listIndex - 1}.start_time`)}
              />
              <div>Enter the duration of this price block in hours</div>
              <StandardInput
                type="number"
                step={1}
                {...props.register(`price_list.${listIndex - 1}.total_hours`)}
                min={1}
                defaultValue={6}
              />
            </div>
          ))}
          <div className="flex place-content-center place-items-center text-center">
            <button
              type="button"
              className="ms-8 drop-shadow-lg"
              onClick={props.addPriceList}
            >
              <PlusIcon className="h-24 w-24 text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
