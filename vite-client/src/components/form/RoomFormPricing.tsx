import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FormHeader } from "../minicomponents/Headers";
import { StandardInput } from "../minicomponents/Inputs";
import { FormProps } from "../../app/interface";
import { PrimaryButton } from "../minicomponents/Buttons";
import { useState } from "react";

export interface PriceList {
  id: string;
  base_room_fee: number;
  headcount_price: number;
  start_time: string;
  total_hour: number;
  is_holiday: boolean;
}

export interface FormPricingProps extends FormProps {
  removePriceList: (id: string) => void;
  priceListDetails: PriceList[];
  addPriceList: () => void;
  setPriceListDetails: Function;
}

export default function RoomFormPricing({
  removePriceList,
  priceListDetails,
  addPriceList,
  setPriceListDetails,
}: FormPricingProps) {
  function setFieldsValues(
    fieldName: keyof PriceList,
    listIndex: number,
    value: any
  ) {
    setPriceListDetails((prevDetails: any) => {
      const newDetails = [...prevDetails];
      newDetails[listIndex] = {
        ...newDetails[listIndex],
        [fieldName]: value,
      };
      return newDetails;
    });
  }

  return (
    <>
      <div className="mb-8">
        <FormHeader title="Price your partyroom:" />
        <div className="flex place-content-around place-items-center text-center">
          <PrimaryButton
            type="button"
            label="Add A Price List"
            onClick={addPriceList}
          />
        </div>
        <div
          className={`text-slate-300 w-full grid ${
            priceListDetails!.length >= 3 && `md:grid-cols-3`
          } ${priceListDetails!.length == 2 && `md:grid-cols-2`} ${
            priceListDetails!.length <= 1 && `md:grid-cols-1`
          } grid-cols-1 gap-8 place-items-center place-content-center md:bg-slate-950 md:bg-opacity-30 bg-transparent md:p-12 p-0 md:border-solid border-2 rounded-md md:border-slate-500 border-slate-800 md:border-opacity-30 border-none overflow-auto`}
        >
          {priceListDetails!.map((v, listIndex) => (
            <div
              key={v.id}
              className=" relative price-list rounded-lg p-8 md:px-10 px-8 border-solid border-2 border-slate-300 border-opacity-50 drop-shadow-lg bg-slate-800 bg-opacity-60"
            >
              {listIndex !== 0 && (
                <div className="h-12 w-12 bg-slate-700 bg-opacity-70 absolute right-0 top-0 rounded-lg">
                  <button type="button" onClick={() => removePriceList(v.id)}>
                    <XMarkIcon className="h-12 w-12  drop-shadow-lg" />
                  </button>
                </div>
              )}
              <div className="text-xl mb-8 text-center font-semibold text-slate-200">
                Price List {listIndex + 1}
              </div>
              <div className="flex mb-6 place-content-between place-items-center text-base">
                <div>Is this price for weekends & public holidays?</div>
                <div>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={priceListDetails[listIndex]?.is_holiday || false}
                    onChange={(e) =>
                      setFieldsValues("is_holiday", listIndex, e.target.checked)
                    }
                  />
                </div>
              </div>
              <div>What is the base room fee?</div>
              <StandardInput
                type="number"
                step={100}
                defaultValue={200}
                min={100}
                onChange={(e) =>
                  setFieldsValues(
                    "base_room_fee",
                    listIndex,
                    parseInt(e.target.value)
                  )
                }
              />
              <div>What is the price per person?</div>
              <StandardInput
                type="number"
                step={50}
                defaultValue={100}
                min={0}
                onChange={(e) =>
                  setFieldsValues(
                    "headcount_price",
                    listIndex,
                    parseInt(e.target.value)
                  )
                }
              />
              <div>Enter the start time for this price block (24 hr time)</div>
              <StandardInput
                type="time"
                step={1800}
                onChange={(e) =>
                  setFieldsValues("start_time", listIndex, e.target.value)
                }
              />
              <div>Enter the duration of this price block in hours</div>
              <StandardInput
                type="number"
                step={1}
                min={1}
                defaultValue={6}
                onChange={(e) =>
                  setFieldsValues(
                    "total_hour",
                    listIndex,
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
