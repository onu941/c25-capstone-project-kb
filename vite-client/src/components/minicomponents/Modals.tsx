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

export function BookingModal(props: BookingModalProps) {
  const currentDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-40">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"
        onClick={props.toggleModal}
      ></div>
      <div className="px-10 py-8 bg-slate-900 text-slate-300 rounded-lg z-50 border-solid border-2 border-slate-500 border-opacity-30 w-2/3">
        <p className="text-3xl mb-12 text-slate-200 font-semibold">
          Book This Room!
        </p>
        <div className="h-96 overflow-auto">
          <form onSubmit={props.onSubmit}>
            <p className="text-sm">How many partygoers?</p>
            <StandardInput
              type="number"
              defaultValue={6}
              name="headcount"
              register={props.register("headcount")}
            />
            <p className="text-sm">What date?</p>
            <StandardInput
              type="date"
              name="booking_date"
              min={currentDate}
              placeholder="what date??"
              register={props.register("booking_date")}
            />
            <p className="text-sm">Please pick a price list</p>
            <DropdownInput
              hasExtras
              options={props.options}
              register={props.register("partyroom_price_list_id")}
            />
            <div className="my-6">
              <TextArea
                placeholder="Please note down any special requests"
                register={props.register("special_request")}
              />
            </div>
            <div className="mt-8 w-full flex columns-2 gap-6 place-content-center">
              <div>
                <PrimaryButton
                  type="button"
                  onClick={props.toggleModal}
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
