import { useEffect, useRef, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, FormHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { NewRoomTab, Tab } from "../components/minicomponents/Tab";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ActiveIconButtons,
  District,
  SubmitRoomFormState,
} from "../app/interface";
import RoomFormBasics from "../components/form/RoomFormBasics";
import RoomFormCategoryEquipment from "../components/form/RoomFormCategoryEquipment";
import RoomFormDescription from "../components/form/RoomFormDescription";
import RoomFormPricing from "../components/form/RoomFormPricing";
import RoomFormImages from "../components/form/RoomFormImages";
import { Switch } from "@headlessui/react";
import {
  DangerButton,
  PrimaryButton,
} from "../components/minicomponents/Buttons";

export default function SubmitRoom() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [submitRoomTab, setSubmitRoomTab] = useState<string>("part_1");
  const [partyroomName, setPartyroomName] =
    useState<string>("Submit a partyroom");
  const [districts, setDistricts] = useState<District[]>([]);
  const [activeIconButtons, setActiveIconButtons] = useState<ActiveIconButtons>(
    {}
  );
  const [priceLists, setPriceLists] = useState([1]);
  const [switchEnabled, setSwitchEnabled] = useState(false);

  const handleRoomTabClick = (string: string) => {
    return setSubmitRoomTab(string);
  };

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.trim() === ""
      ? setPartyroomName("Submit Your Partyroom")
      : setPartyroomName(e.target.value);
  };

  useEffect(() => {
    const getDistricts = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/district`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const districts = await response.json();
      console.log(districts);
      setDistricts(districts);
    };

    getDistricts();
  }, []);

  // const oldDistricts = ["Wan Chai", "Kwun Tong", "Tsuen Wan"];

  function handleFormIconButton(iconType: string) {
    setActiveIconButtons((prev) => ({
      ...prev,
      [iconType]: !prev[iconType],
    }));
  }

  const addPriceList = () => {
    setPriceLists((prevLists) => [...prevLists, priceLists.length + 1]);
  };

  const removePriceList = (index: number) => {
    setPriceLists((prevLists) => prevLists.filter((_, i) => i !== index));
  };

  const handleResetForm = () => {
    setSubmitRoomTab("part_1");
    formRef.current?.reset();
    setPartyroomName("Submit Your Partyroom");
  };

  const { register, handleSubmit } = useForm<SubmitRoomFormState>();

  const onSubmit: SubmitHandler<SubmitRoomFormState> = (data) => {
    console.log(data);
  };

  return (
    <>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            title={partyroomName}
            toggleSidebar={toggleSidebar}
            isOpen={sidebarIsOpen}
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          <NewRoomTab
            handleClick={handleRoomTabClick}
            isSelected={submitRoomTab}
          />
          <form
            className="md:px-16 px-4"
            onSubmit={handleSubmit((v) => onSubmit(v))}
            ref={formRef}
          >
            {/* form part 2*/}
            <div className={`${submitRoomTab === "part_1" ? "hidden" : ""}`}>
              form part 2
              <RoomFormImages />
              <Switch
                checked={switchEnabled}
                onChange={setSwitchEnabled}
                className={`${switchEnabled ? "bg-pink-500" : "bg-pink-800"}
        relative inline-flex h-[29px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors shadow-lg duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    switchEnabled ? "translate-x-6" : "translate-x-0"
                  }
          pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            {/* confirm form detail */}
            <div
              className={`${
                switchEnabled && submitRoomTab === "part_2" ? "" : "hidden"
              } flex justify-start`}
            >
              <FormHeader title="Confirm your partyroom:" />
            </div>
            {/* form part 1*/}
            <div
              className={`${
                submitRoomTab === "part_1" ||
                (switchEnabled && submitRoomTab === "part_2")
                  ? ""
                  : "hidden"
              }`}
            >
              <RoomFormBasics
                register={register}
                handleNameInputChange={handleNameInputChange}
                dropdownOptions={districts}
              />
              <RoomFormCategoryEquipment
                register={register}
                activeIconButtons={activeIconButtons}
                handleFormIconButton={handleFormIconButton}
              />
              <RoomFormPricing
                register={register}
                priceLists={priceLists}
                addPriceList={addPriceList}
                removePriceList={removePriceList}
              />
              <RoomFormDescription register={register} />
              {/* next button */}
              <div
                className={`${
                  submitRoomTab === "part_1" ? "" : "hidden"
                } flex flex-wrap justify-center my-12 columns-2 gap-6 mb-24`}
              >
                <div>
                  <PrimaryButton
                    type="button"
                    label="Next"
                    onClick={() => setSubmitRoomTab("part_2")}
                  />
                </div>
                <div>
                  <DangerButton
                    label="Reset"
                    type="button"
                    onClick={() => handleResetForm()}
                  />
                </div>
              </div>
            </div>
          </form>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
