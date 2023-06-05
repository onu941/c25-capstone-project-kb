import { useState } from "react";
import { FullScreen } from "../components/Containers";
import { AppHeader, BodyHeader, FormHeader } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Tab } from "../components/Tab";
import { MiniInput, StandardInput, TextArea } from "../components/Inputs";
import { FormCarousel } from "../components/Carousels";
import { OwnerCard, ReviewCard } from "../components/Cards";
import { BookingButton } from "../components/Buttons";

type EquipmentField = {
  id: number;
  name: string;
};

export default function Partyroom() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [partyroomName, setPartyroomName] = useState(
    "name fetched from postgres via knex query"
  );
  const [equipmentFields, setEquipmentFields] = useState<EquipmentField[]>([
    { id: 1, name: "Equipment 1" },
    { id: 2, name: "Equipment 2" },
    { id: 3, name: "Equipment 3" },
  ]);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  return (
    <>
      <BookingButton />
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
            {equipmentFields.map((field) =>
              field.id <= 3 ? (
                <StandardInput
                  key={field.id}
                  value={`equipment ${field.id}`}
                  type="text"
                  name={`equipment.${field.id - 1}.name`}
                  isDisabled
                  isReadOnly
                />
              ) : (
                <StandardInput
                  key={field.id}
                  value={`equipment ${field.id}`}
                  type="text"
                  name={`equipment.${field.id - 1}.name`}
                  isDisabled
                  isReadOnly
                />
              )
            )}
          </div>
        </div>
        <BodyHeader title="Reviews" />
        <div className="mb-24">
          <ReviewCard
            score={9}
            name="Reviewer Name"
            content="Excellent thanks!"
          />
          <ReviewCard
            score={9}
            name="Reviewer Name"
            content="Excellent thanks!"
          />
          <ReviewCard
            score={9}
            name="Reviewer Name"
            content="Excellent thanks!"
          />
        </div>
      </FullScreen>
      <Tab />
    </>
  );
}
