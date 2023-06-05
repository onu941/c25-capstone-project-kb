import { useState } from "react";
import { FullScreen } from "../components/minicomponents/Containers";
import { AppHeader, BodyHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import {
  MiniInput,
  StandardInput,
  TextArea,
} from "../components/minicomponents/Inputs";
import { FormCarousel } from "../components/minicomponents/Carousels";
import { OwnerCard, ReviewCard } from "../components/minicomponents/Cards";
import { BookingButton } from "../components/minicomponents/Buttons";
import { BookingModal } from "../components/minicomponents/Modals";

type EquipmentField = {
  id: number;
  name: string;
};

type Review = {
  id: number;
  score: number;
  name: string;
  content: string;
};

export default function Partyroom() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [bookingModalIsOpen, setBookingModalIsOpen] = useState(false);
  const partyroomName = "name fetched from postgres via knex query";
  const equipment: EquipmentField[] = [
    { id: 1, name: "Equipment 1" },
    { id: 2, name: "Equipment 2" },
    { id: 3, name: "Equipment 3" },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      score: 9,
      name: "Reviewer Name",
      content: "Excellent thanks!",
    },
    {
      id: 2,
      score: 9,
      name: "Reviewer Name",
      content: "Excellent thanks!",
    },
    {
      id: 3,
      score: 9,
      name: "Reviewer Name",
      content: "Excellent thanks!",
    },
  ];

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const toggleBookingModal = () => {
    console.log("modal button clicked");
    setBookingModalIsOpen(!bookingModalIsOpen);
  };

  return (
    <>
      <BookingButton
        type="button"
        label="BOOK NOW"
        onClick={toggleBookingModal}
      />
      {bookingModalIsOpen && <BookingModal toggleModal={toggleBookingModal} />}
      <FullScreen>
        <AppHeader
          isOpen={sidebarIsOpen}
          toggleSidebar={toggleSidebar}
          title={partyroomName}
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <div className="flex flex-col place-items-center place-content-center mt-6">
          <div className="w-11/12">
            <StandardInput type="text" isReadOnly isDisabled value="Name" />
          </div>
          <div className="w-11/12 flex flex-row justify-between">
            <MiniInput isReadOnly type="text" value="area" isDisabled />
            <MiniInput isReadOnly type="text" value="capacity" isDisabled />
          </div>
          <p className="text-center mb-8 text-xl">Image Preview here</p>
          <FormCarousel />
        </div>
        <OwnerCard name="Owner Name" />
        <BodyHeader title="Description" />
        <div className="flex flex-col place-items-center place-content-center mb-6">
          <div className="flex w-11/12">
            <TextArea value="Max 150 characters" isDisabled />
          </div>
        </div>
        <BodyHeader title="Facilities" />
        <div className="flex flex-col place-items-center place-content-center">
          <div className="w-11/12">
            {equipment.map((item) => (
              <StandardInput
                key={item.id}
                value={`equipment ${item.id}`}
                type="text"
                name={`equipment.${item.id - 1}.name`}
                isDisabled
                isReadOnly
              />
            ))}
          </div>
        </div>
        <BodyHeader title="Reviews" />
        <div className="mb-24">
          {reviews.map((review) => (
            <ReviewCard
              score={review.score}
              name={review.name}
              content={review.content}
            />
          ))}
        </div>
      </FullScreen>
      <Tab />
    </>
  );
}
