import { BookingModalProps } from "../../app/interface";
import { PrimaryButton, SubmitButton } from "./Buttons";
import { StandardInput, TextArea } from "./Inputs";

export function BookingModal(props: BookingModalProps) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-40">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"
        onClick={props.toggleModal}
      ></div>
      <div className="px-10 py-8 bg-slate-900 text-slate-300 rounded-lg z-50 border-solid border-4 border-slate-400 w-2/3">
        <p className="text-3xl mb-4 text-slate-200 font-semibold">
          Book This Room!
        </p>
        <div className="h-96 overflow-auto">
          <form>
            <p className="text-lg mt-3 mb-6 font-semibold">Booking Details</p>
            <p className="text-sm ms-2">how many people?</p>
            <StandardInput type="number" name="headcount" defaultValue={6} />
            <p className="text-sm ms-2">what date?</p>
            <StandardInput
              type="date"
              name="booking_date"
              placeholder="what date??"
            />
            <p className="text-sm ms-2">what time?</p>
            <StandardInput
              type="time"
              name="start_time"
              placeholder="what time?"
              min="10:00:00"
              max="18:00:00"
            />
            <p className="text-sm ms-2">for how long (hours)?</p>
            <StandardInput type="number" defaultValue={4} />
            <div className="my-6">
              <TextArea placeholder="any special requests?" />
            </div>
            <div className="mt-6">
              <p className="text-center">
                Based on this room's pricing blocks, your stay would cost{" "}
                <span className="font-bold underline">$</span>
              </p>
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
                <SubmitButton
                  type="submit"
                  onClick={props.toggleModal}
                  label="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
