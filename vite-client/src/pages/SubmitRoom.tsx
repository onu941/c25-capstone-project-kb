import { useEffect, useRef, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, FormHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { NewRoomTab, Tab } from "../components/minicomponents/Tab";
import { SubmitHandler, useForm } from "react-hook-form";
import { District, JWT, PartyroomImage } from "../app/interface";
import RoomFormBasics from "../components/form/RoomFormBasics";
import RoomFormCategoryEquipment from "../components/form/RoomFormCategoryEquipment";
import RoomFormDescription from "../components/form/RoomFormDescription";
import RoomFormPricing, { PriceList } from "../components/form/RoomFormPricing";
import RoomFormImages from "../components/form/RoomFormImages";
import { Switch } from "@headlessui/react";
import {
  DangerButton,
  PrimaryButton,
  SubmitButton,
} from "../components/minicomponents/Buttons";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import jwtDecode from "jwt-decode";

export interface SubmitRoomFormState {
  name: string;
  room_size: number;
  capacity: number;
  address: string;
  district: string;
  equipment: number[];
  category: number[];
  description: string;
  image: PartyroomImage[];
  price_list: PriceList[];
}

export default function SubmitRoom() {
  const token = localStorage.getItem("token");
  const decoded: JWT = jwtDecode(token!);
  // console.log("decoded:", decoded);
  const jwtUserId = decoded.id;
  const [userPhone, setUserPhone] = useState<string>("");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [submitRoomTab, setSubmitRoomTab] = useState<string>("part_1");
  const [partyroomName, setPartyroomName] =
    useState<string>("Submit a Partyroom");
  const [districts, setDistricts] = useState<District[]>([]);
  const [activeIconButtons, setActiveIconButtons] = useState<number[]>([]);
  const [categories, setCategories] = useState([NaN]);
  const [equipment, setEquipment] = useState([NaN]);
  const [priceListDetails, setPriceListDetails] = useState<PriceList[]>([
    {
      id: crypto.randomUUID(),
      base_room_fee: 0,
      headcount_price: 0,
      start_time: "",
      total_hour: 0,
      is_holiday: false,
    },
  ]);
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

    const getUserPhone = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/user/phone`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const phoneData = await response.json();
      setUserPhone(phoneData.phone);
    };

    getDistricts();
    getUserPhone();
  }, []);

  function handleFormIconButton(id: string | number) {
    setActiveIconButtons((prev) => [...prev, +id]);
  }

  const addPriceList = () => {
    const newListIndex: string = crypto.randomUUID();

    setPriceListDetails((prevDetails) => [
      ...prevDetails,
      {
        id: newListIndex,
        base_room_fee: 0,
        headcount_price: 0,
        start_time: "",
        total_hour: 0,
        is_holiday: false,
      },
    ]);
    // return [...prevLists, newListIndex];
  };

  const removePriceList = (id: string) => {
    const newData = priceListDetails.filter((v) => v.id !== id);
    setPriceListDetails(newData);
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
    const updatedSelectedImages = [...selectedImages];
    updatedPreviews.splice(index, 1);
    updatedSelectedImages.splice(index, 1);
    setImagePreviews(updatedPreviews);
    setSelectedImages(updatedSelectedImages);
  };

  const handleResetForm = () => {
    setSubmitRoomTab("part_1");
    formRef.current?.reset();
    setActiveIconButtons([]);
    setPartyroomName("Submit Your Partyroom");
    setCategories([NaN]);
    setEquipment([NaN]);
    setImagePreviews([]);
    setSelectedImages([]);
  };

  const handleBack = () => {
    setSubmitRoomTab("part_1");
  };

  const form = useForm<SubmitRoomFormState>();
  const onSubmit: SubmitHandler<SubmitRoomFormState> = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    const category_id = categories.filter((value) => !isNaN(value));
    const equipment_id = equipment.filter((value) => !isNaN(value));

    console.log("room images", selectedImages);

    formData.append("name", data.name);
    formData.append("host_id", jwtUserId.toString());
    formData.append("address", data.address);
    formData.append("capacity", data.capacity.toString());
    formData.append("district", data.district);
    formData.append("room_size", data.room_size.toString());
    formData.append("phone", userPhone);
    formData.append("description", data.description);
    formData.append("is_hidden", "false");
    formData.append("category_id", JSON.stringify(category_id));
    formData.append("equipment_id", JSON.stringify(equipment_id));
    formData.append("price_list", JSON.stringify(priceListDetails));
    selectedImages.forEach((img, i) =>
      formData.append(`images-${i}`, img as any)
    );

    console.log(selectedImages);
    console.log("formData", formData);

    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/upload/submit_room`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (response.ok) {
      toast.success("Your partyroom has been uploaded!");
    } else {
      toast("Hmm, something's not right");
    }
  };
  const { register, handleSubmit } = form;

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
            className="md:px-16 px-6"
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
              {/* initiate form details confirm */}
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
                selectedCategory={categories}
                setSelectedCategory={setCategories}
                selectedEquipment={equipment}
                setSelectedEquipment={setEquipment}
              />
              <RoomFormPricing
                register={register}
                // priceListIndex={priceListIndex}
                priceListDetails={priceListDetails}
                addPriceList={addPriceList}
                removePriceList={removePriceList}
                setPriceListDetails={setPriceListDetails}
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
