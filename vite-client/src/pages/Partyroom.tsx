import { Suspense, useEffect, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, BodyHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import { OwnerCard, ReviewCard } from "../components/minicomponents/Cards";
import {
  BookingButton,
  DangerButton,
  PrimaryButton,
} from "../components/minicomponents/Buttons";
import { BookingModal } from "../components/minicomponents/Modals";
import toast, { Toaster } from "react-hot-toast";
import {
  BBQIcon,
  BoardGamesIcon,
  FamilyIcon,
  GeneralPartyIcon,
  KaraokeIcon,
  MahjongIcon,
  VideoGamesIcon,
  WeddingIcon,
} from "../assets/MaterialIcons";
import { BriefcaseIcon, CakeIcon, HeartIcon } from "@heroicons/react/20/solid";
import { TvIcon } from "@heroicons/react/24/outline";
import {
  JWT,
  PartyroomImage,
  Partyroom as PartyroomType,
  Review,
} from "../app/interface";
import { NewPriceListTable } from "../components/minicomponents/Table";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../app/hook";
import { settings } from "../redux/userSlice";
import Loading from "../components/Loading";

export interface MakeBookingFormState {
  partyroom_id: number;
  partyroom_price_list_id: string;
  booking_user_id: number;
  headcount: number;
  booking_date: string | Date;
  total_fee: number;
  special_request: string;
  is_hidden: boolean;
  status: string;
}

export default function Partyroom() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");
  const decoded: JWT = jwtDecode(token!);
  // console.log("decoded:", decoded);
  const jwtUserId = decoded.id;
  const params = new URLSearchParams(window.location.search);
  const partyroomId = params.get("room_id");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [bookingModalIsOpen, setBookingModalIsOpen] = useState(false);
  const [bookingModalPriceListDropdown, setBookingModalPriceListDropdown] =
    useState([]);
  const [partyroom, setPartyroom] = useState<PartyroomType>({
    id: Number(partyroomId),
    name: "",
    host_id: Number(jwtUserId),
    host_name: "",
    district: "",
    room_size: NaN,
    capacity: NaN,
    phone: "",
    address: "",
    description: "",
    category: [],
    equipment: [],
    image_filename: "",
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [priceLists, setPriceLists] = useState<any>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [roomImages, setRoomImages] = useState<PartyroomImage[]>([]);
  const [mainRoomImage, setMainRoomImage] = useState<string>("");

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const toggleBookingModal = () => {
    setBookingModalIsOpen(!bookingModalIsOpen);
  };

  const openGoogleMaps = () => {
    const addressQuery = encodeURIComponent(
      `${partyroom.address}, ${partyroom.district}`
    );
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
    window.open(googleMapsURL, "_blank");
  };

  const handlePartyroomMod = () => {
    const emailAddress = "admin@partymate.io";
    const mailtoLink = `mailto:${emailAddress}`;
    toast(
      <a href={mailtoLink}>
        Please contact <span className="underline">{emailAddress}</span>
      </a>,
      { icon: "📬" }
    );
  };

  const handleRoomImageRollClick = (index: number) => {
    setMainRoomImage(roomImages[index].filename);
  };

  useEffect(() => {
    const fetchPartyroomDetails = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/${partyroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const partyroomDetails = await response.json();

      setPartyroom({
        ...partyroom,
        name: partyroomDetails.name,
        host_name: partyroomDetails.host_name,
        address: partyroomDetails.address,
        district: partyroomDetails.district,
        room_size: partyroomDetails.room_size,
        capacity: partyroomDetails.capacity,
        phone: partyroomDetails.phone,
        description: partyroomDetails.description,
      });

      if (jwtUserId === partyroomDetails.host_id) setIsOwner(!isOwner);
    };

    const fetchCategories = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_SERVER
        }/partyroom/categories/${partyroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const categories = await response.json();
      setPartyroom((prevPartyroom) => ({
        ...prevPartyroom,
        category: [...prevPartyroom.category, ...categories],
      }));
    };

    const fetchEquipment = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/equipment/${partyroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const equipment = await response.json();
      setPartyroom((prevPartyroom) => ({
        ...prevPartyroom,
        equipment: [...prevPartyroom.equipment, ...equipment],
      }));
    };

    const fetchPartyroomImages = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/img/${partyroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const images = await response.json();
      setMainRoomImage(images[0].filename);
      setRoomImages(images);
    };

    const fetchPartyroomPriceLists = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/pricelist/${partyroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const priceListsData = await response.json();
      setPriceLists(priceListsData);
    };

    const fetchPartyroomReviews = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/reviews/${partyroomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reviewsData = await response.json();
      setReviews(reviewsData);
    };

    const fetchAllData = async () => {
      await fetchPartyroomDetails();
      await fetchCategories();
      await fetchEquipment();
      await fetchPartyroomImages();
      await fetchPartyroomPriceLists();
      await fetchPartyroomReviews();
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    setBookingModalPriceListDropdown(
      priceLists.map((list: any, index: number) => ({
        id: index,
        name: `${
          !list.is_holiday ? `Weekdays` : "Weekends & Hols"
        }, ${list.start_time.slice(0, -3)} start`,
        extra: list.database,
      }))
    );
  }, [priceLists]);

  const form = useForm<MakeBookingFormState>();
  const onSubmitBooking: SubmitHandler<MakeBookingFormState> = async (data) => {
    console.log(data);

    const [priceListIndex, databaseId] = data.partyroom_price_list_id
      .split(", ")
      .map(Number);

    const totalFee =
      priceLists[priceListIndex].base_room_fee +
      data.headcount *
        priceLists[priceListIndex].headcount_price *
        priceLists[priceListIndex].total_hour;

    const formJSON = {
      partyroom_price_list_id: databaseId,
      booking_users_id: jwtUserId,
      headcount: data.headcount,
      booking_date: data.booking_date,
      total_fee: totalFee,
      special_request: data.special_request,
      is_hidden: false,
      status: "pending",
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/booking/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJSON),
      }
    );
    if (response.ok) {
      const result = await response.json();
      const pendingBookingId = result[0].id;
      localStorage.setItem(
        "bookingSuccess",
        "Your booking has been confirmed!"
      );
      dispatch(settings("partygoer"));
      navigate(`/booking?booking_id=${pendingBookingId}`);
    } else {
      toast("Hmm, something's not right");
      toast.error("not working");
    }
  };

  const { register, handleSubmit } = form;

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div>
        {!isOwner ? (
          <>
            <BookingButton
              type="button"
              label="BOOK NOW"
              onClick={toggleBookingModal}
            />
            {bookingModalIsOpen && (
              <BookingModal
                toggleModal={toggleBookingModal}
                register={register}
                onSubmit={handleSubmit(onSubmitBooking)}
                options={bookingModalPriceListDropdown}
              />
            )}
          </>
        ) : (
          ""
        )}
      </div>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
            title={partyroom.name}
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          <Suspense fallback={<Loading />}>
            <div className="md:mb-10 w-full grid grid-rows-2 grid-flow-row md:px-0 px-4">
              <div className="text-slate-300">
                {partyroom.address} | {partyroom.district} |{" "}
                <a
                  href=""
                  className="underline text-slate-400"
                  onClick={() => openGoogleMaps()}
                >
                  locate on google maps
                </a>
              </div>
              <div className="text-slate-300">
                {partyroom.room_size} ft² | {partyroom.capacity} pax
              </div>
            </div>
            <div className="mb-4 w-full flex flex-row flex-wrap justify-center">
              {isOwner && (
                <>
                  <div className="md:me-8 me-2">
                    <PrimaryButton
                      onClick={() => handlePartyroomMod()}
                      label="Edit Partyroom"
                    />
                  </div>
                  <div className="md:ms-8 ms-2">
                    <DangerButton
                      onClick={() => handlePartyroomMod()}
                      label="Delete Partyroom"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-full md:mb-12 mb-6 grid md:grid-cols-3 grid-cols-1 grid-flow-row">
              <div className="col-span-2 flex flex-wrap justify-center">
                <div className="md:w-4/5 w-10/12">
                  <img
                    src={`${
                      import.meta.env.VITE_API_SERVER
                    }/rooms/${mainRoomImage}`}
                    className="rounded-lg border-solid border-2 border-slate-700 drop-shaadow-xl object-fill"
                  ></img>
                </div>
                <div className="md:w-4/5 w-10/12 mt-3 md:mb-0 mb-8 border-solid rounded-lg border-2 border-slate-700 border-opacity-30 px-0 bg-slate-800 bg-opacity-10 w-fill flex place-items-center place-content-start overflow-auto">
                  {roomImages.map((roomImage, index) => (
                    <img
                      src={`${import.meta.env.VITE_API_SERVER}/rooms/${
                        roomImage.filename
                      }`}
                      className="h-20 p-1 object-scale-down"
                      onClick={() => handleRoomImageRollClick(index)}
                    ></img>
                  ))}
                </div>
              </div>
              <div>
                {" "}
                <div className="bg-slate-800 mx-6 md:mx-0 md:px-8 px-8 md:py-12 py-10 rounded-lg border-slate-700 border-solid border-2 text-2xl flex flex-col place-items-center">
                  <div className="grid grid-cols-3 grid-flow-row md:gap-8 gap-8 md:mb-16 mb-14">
                    <div className="text-base flex flex-col place-items-center">
                      <GeneralPartyIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.category.some(
                            (category) => category.name === "general"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.category.some(
                            (category) => category.name === "general"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        General
                      </span>
                    </div>
                    <div className="text-base flex flex-col place-items-center">
                      <FamilyIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.category.some(
                            (category) => category.name === "families"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.category.some(
                            (category) => category.name === "families"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        Families
                      </span>
                    </div>
                    <div
                      className={`text-base flex flex-col place-items-center ${
                        partyroom.category.some(
                          (category) => category.name === "birthdays"
                        )
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      <CakeIcon className={"md:w-16 md:h-16 w-10 h-10 mb-1"} />
                      Birthdays
                    </div>
                    <div
                      className={`text-base flex flex-col place-items-center ${
                        partyroom.category.some(
                          (category) => category.name === "dates"
                        )
                          ? "text-slate-300"
                          : "text-slate-600"
                      } text-slate-300`}
                    >
                      <HeartIcon className={"md:w-16 md:h-16 w-10 h-10 mb-1"} />
                      Dates
                    </div>
                    <div
                      className={`text-base flex flex-col place-items-center ${
                        partyroom.category.some(
                          (category) => category.name === "businesses"
                        )
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      <BriefcaseIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                      />
                      Businesses
                    </div>
                    <div className="text-base flex flex-col place-items-center">
                      <WeddingIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.category.some(
                            (category) => category.name === "weddings"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.category.some(
                            (category) => category.name === "weddings"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        Weddings
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 grid-flow-row gap-8">
                    <div className="text-base flex flex-col place-items-center">
                      <MahjongIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "mahjong"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "mahjong"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        Mahjong
                      </span>
                    </div>
                    <div className="text-base flex flex-col place-items-center">
                      <BBQIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "bbq"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "bbq"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        BBQ
                      </span>
                    </div>
                    <div className="text-base flex flex-col place-items-center text-slate-300">
                      <KaraokeIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "karaoke"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "karaoke"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        Karaoke
                      </span>
                    </div>
                    <div className="text-base flex flex-col place-items-center text-slate-300">
                      <VideoGamesIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "video games"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "video games"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        } text-sm text-center translate-y-1`}
                      >
                        Video Games
                      </span>
                    </div>
                    <div className="text-base flex flex-col place-items-center text-slate-300">
                      <BoardGamesIcon
                        className={"md:w-16 md:h-16 w-10 h-10 mb-1"}
                        color={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "board games"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      <span
                        className={`${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "board games"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        } text-sm text-center translate-y-1`}
                      >
                        Board Games
                      </span>
                    </div>
                    <div
                      className={`text-base flex flex-col place-items-center ${
                        partyroom.equipment.some(
                          (equipment) => equipment.name === "tv"
                        )
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      <TvIcon
                        className={`md:w-16 md:h-16 w-10 h-10 mb-1 ${
                          partyroom.equipment.some(
                            (equipment) => equipment.name === "tv"
                          )
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      />
                      Streaming
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:mb-8 grid md:grid-cols-4 grid-cols-1 w-full px-4">
              <div className="mb-4 md:mb-0 mx-2 md:mx-0">
                <OwnerCard
                  name={partyroom.host_name}
                  whatsAppUrl={`https://wa.me/${partyroom.phone}`}
                />
              </div>
              <div className="flex md:col-span-3 border-solid border-2 py-6 px-8 rounded-lg border-slate-700 place-items-center place-content-center text-slate-300 h-fill md:ms-8 mx-2 md:text-lg leading-relaxed italic w-fill text-center">
                <p>{`"${partyroom.description}"`}</p>
              </div>
            </div>
            <div>
              <BodyHeader title="Price Lists" />
              <div>
                <NewPriceListTable data={priceLists} />
              </div>
              <div></div>
            </div>
            <div className="mb-36">
              <BodyHeader title="Reviews"></BodyHeader>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-8 text-slate-300">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div className="md:mx-0 mx-4">
                      <ReviewCard
                        key={review.id}
                        review_text={review.detail}
                        score={`${review.rating}/10`}
                        name={review.name}
                        date="18 June 23"
                      />
                    </div>
                  ))
                ) : (
                  <div className="md:mx-0 mx-4">No reviews yet!</div>
                )}
              </div>
            </div>
          </Suspense>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
