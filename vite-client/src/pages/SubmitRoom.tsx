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
  SubmitButton,
} from "../components/minicomponents/Buttons";
import toast, { Toaster } from "react-hot-toast";

export default function SubmitRoom() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [submitRoomTab, setSubmitRoomTab] = useState<string>("part_1");
  const [partyroomName, setPartyroomName] =
    useState<string>("Submit a Partyroom");
  const [districts, setDistricts] = useState<District[]>([]);
  const [activeIconButtons, setActiveIconButtons] = useState<ActiveIconButtons>(
    {}
  );
  const [priceLists, setPriceLists] = useState([0]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [switchEnabled, setSwitchEnabled] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const handleRoomTabClick = (string: string) => {
    return setSubmitRoomTab(string);
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
      setDistricts(districts);
    };

    getDistricts();
  }, []);

  function handleFormIconButton(iconType: string) {
    setActiveIconButtons((prev) => ({
      ...prev,
      [iconType]: !prev[iconType],
    }));
  }

  const addPriceList = () => {
    setPriceLists((prevLists) => [...prevLists, priceLists.length]);
  };

  const removePriceList = (index: number) => {
    setPriceLists((prevLists) => prevLists.filter((_, i) => i + 1 !== index));
  };

  const onImageUpload = (imageUrls: string[]) => {
    setImagePreviews(imageUrls);
  };

  const handleImageUpload = () => {
    if (selectedImages.length === 0) {
      return toast.error("Please choose a photo to upload");
    }

    const imageUrls: string[] = [];

    selectedImages.forEach((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        if (reader.result) {
          imageUrls.push(reader.result as string);
          if (imageUrls.length === selectedImages.length) {
            onImageUpload(imageUrls);
          }
        }
      };
    });
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages(filesArray);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleResetForm = () => {
    setSubmitRoomTab("part_1");
    formRef.current?.reset();
    setActiveIconButtons({});
    setPartyroomName("Submit Your Partyroom");
    setImagePreviews([]);
    setSelectedImages([]);
  };

  const handleBack = () => {
    setSubmitRoomTab("part_1");
  };

  const { register, handleSubmit } = useForm<SubmitRoomFormState>();
  const onSubmit: SubmitHandler<SubmitRoomFormState> = (data) => {
    console.log(data);
  };

  return (
    <>
      <FullScreen>
        <div>
          <Toaster />
        </div>
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
              <RoomFormImages
                register={register}
                multiple={true}
                selectedImages={selectedImages}
                imagePreviews={imagePreviews}
                handleImageUpload={handleImageUpload}
                handleImageFileChange={handleImageFileChange}
                handleDeleteImage={handleDeleteImage}
              />
              {/* initiate form detials confirm */}
              <div className="columns-2 flex place-content-center place-items-center gap-5 mb-8">
                <div>
                  <p className="text-slate-300 text-md">I'm done uploading!</p>
                </div>
                <div>
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
              </div>
            </div>
            {/* confirm form details */}
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
            {/* button row (incl submit) */}
            <div
              className={`${
                switchEnabled && submitRoomTab === "part_2" ? "" : "hidden"
              } mt-12 mb-24 flex flex-wrap justify-center columns-3 gap-5`}
            >
              <div>
                <PrimaryButton
                  label="Back"
                  type="button"
                  onClick={() => handleBack()}
                />
              </div>
              <div>
                <DangerButton
                  label="Reset"
                  type="button"
                  onClick={() => handleResetForm()}
                />
              </div>
              <div>
                <SubmitButton label="Submit Your Room!" type="submit" />
              </div>
            </div>
          </form>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
