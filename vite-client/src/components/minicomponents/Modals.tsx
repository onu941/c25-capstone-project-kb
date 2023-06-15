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
      <div className="px-12 py-8 bg-gray-800 text-white rounded-lg z-50 border-solid border-4 border-slate-400">
        <p className="text-5xl mb-8">Book Your Stay!</p>
        <p className="text-lg">User Details</p>
        <StandardInput isEditing type="text" placeholder="name (autofilled)" />
        <StandardInput isEditing type="text" placeholder="phone (autofilled)" />
        <p className="text-lg mt-3">Booking Details</p>
        <StandardInput isEditing type="text" placeholder="how many people?" />
        <StandardInput isEditing type="text" placeholder="what date??" />
        <StandardInput isEditing type="text" placeholder="what time?" />
        <TextArea placeholder="any special requests?" />
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
      </div>
    </div>
  );
}
