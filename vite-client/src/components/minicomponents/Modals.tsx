import { UseFormRegister } from "react-hook-form";
import { MakeBookingFormState } from "../../pages/Partyroom";
import { PrimaryButton, SubmitButton } from "./Buttons";
import { DropdownInput, StandardInput, TextArea } from "./Inputs";
import { FormEventHandler } from "react";
import { format } from "date-fns";

export interface BookingModalProps {
  toggleModal?: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<MakeBookingFormState>;
  options: any[];
}

export function BookingModal({
  toggleModal,
  onSubmit,
  register,
  options,
}: BookingModalProps) {
  const currentDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-40">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"
        onClick={toggleModal}
      ></div>
      <div className="md:px-10 md:py-8 p-5 bg-slate-900 text-slate-300 rounded-lg z-50 border-solid border-2 border-slate-500 border-opacity-30 md:w-2/3 w-4/5">
        <p className="md:text-3xl text-lg md:mb-12 mb-6 text-slate-200 font-semibold">
          Book This Room!
        </p>
        <div className="h-96 overflow-auto">
          <form onSubmit={onSubmit}>
            <p className="text-sm">How many partygoers?</p>
            <StandardInput
              type="number"
              defaultValue={6}
              name="headcount"
              register={register("headcount")}
            />
            <p className="text-sm">What date?</p>
            <StandardInput
              type="date"
              name="booking_date"
              min={currentDate}
              placeholder="what date??"
              register={register("booking_date")}
            />
            <p className="text-sm">Please pick a price list</p>
            <DropdownInput
              hasExtras
              options={options}
              register={register("partyroom_price_list_id")}
            />
            <div className="my-6">
              <TextArea
                placeholder="Please note down any special requests"
                register={register("special_request")}
              />
            </div>
            <div className="mt-8 w-full flex columns-2 gap-6 place-content-center">
              <div>
                <PrimaryButton
                  type="button"
                  onClick={toggleModal}
                  label="Go back"
                />
              </div>
              <div>
                <SubmitButton type="submit" label="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
