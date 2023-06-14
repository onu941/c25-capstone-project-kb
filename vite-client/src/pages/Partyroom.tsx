import { useEffect, useState } from "react";
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
import { toast, Toaster } from "react-hot-toast";
import sample from "../assets/sample_partyroom.jpg";
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
import { Partyroom as PartyroomType, Review } from "../app/interface";

export default function Partyroom() {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("user_id");
  const partyroomId = params.get("partyroom_id");

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [bookingModalIsOpen, setBookingModalIsOpen] = useState(false);
  const [partyroom, setPartyroom] = useState<PartyroomType>({
    id: Number(partyroomId),
    name: "",
    host_id: Number(userId),
    host_name: "",
    district: "",
    room_size: NaN,
    capacity: NaN,
    phone: "",
    address: "",
    description: "",
    category: [],
    equipment: [],
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const toggleBookingModal = () => {
    console.log("modal button clicked");
    setBookingModalIsOpen(!bookingModalIsOpen);
  };

  const openGoogleMaps = () => {
    const addressQuery = encodeURIComponent(partyroom.address);
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
    window.open(googleMapsURL, "_blank");
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
      console.log("partyroom details: ", partyroomDetails);

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
        category: [],
        equipment: [],
      });

      if (Number(userId) === partyroomDetails.host_id) setIsOwner(!isOwner);
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
      console.log(reviewsData);
      setReviews(reviewsData);
      console.log("useState reviews: ", reviews);
    };

    fetchPartyroomDetails();
    fetchPartyroomReviews();
  }, []);

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
              <BookingModal toggleModal={toggleBookingModal} />
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
          <div className="mb-12">
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
          <div className="mb-4 w-full columns-2 flex justify-center gap-12">
            {isOwner && (
              <>
                <PrimaryButton label="Edit Partyroom" />
                <DangerButton label="Delete Partyroom" />
              </>
            )}
          </div>
          <div className="w-full flex md:px-0 justify-between columns-2 mb-6 gap-8">
            <div className="flex columns-2 gap-2">
              <img
                src={sample}
                className="rounded-lg border-solid border-2 border-slate-700 drop-shaadow-xl"
              ></img>
              <div className="border-solid border-2 border-slate-700 px-4">
                image carousel
              </div>
            </div>
            <div className="bg-slate-800 px-8 py-12 rounded-lg border-slate-700 border-solid border-2 text-2xl flex flex-col place-items-center">
              <div className="grid grid-cols-3 grid-flow-row gap-8 mb-16">
                <div className="text-base flex flex-col place-items-center">
                  <GeneralPartyIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300">General</span>
                </div>
                <div className="text-base flex flex-col place-items-center">
                  <FamilyIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300">Families</span>
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <CakeIcon className={"w-16 h-16 mb-1"} />
                  Birthdays
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <HeartIcon className={"w-16 h-16 mb-1"} />
                  Dates
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <BriefcaseIcon className={"w-16 h-16 mb-1"} />
                  Businesses
                </div>
                <div className="text-base flex flex-col place-items-center">
                  <WeddingIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300">Weddings</span>
                </div>
              </div>
              <div className="grid grid-cols-3 grid-flow-row gap-8">
                <div className="text-base flex flex-col place-items-center">
                  <MahjongIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300">Mahjong</span>
                </div>
                <div className="text-base flex flex-col place-items-center">
                  <BBQIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300">BBQ</span>
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <KaraokeIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300">Karaoke</span>
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <VideoGamesIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300 text-sm translate-y-1">
                    Video Games
                  </span>
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <BoardGamesIcon
                    className={"w-16 h-16 mb-1"}
                    color={"text-slate-300"}
                  />
                  <span className="text-slate-300 text-sm translate-y-1">
                    Board Games
                  </span>
                </div>
                <div className="text-base flex flex-col place-items-center text-slate-300">
                  <TvIcon className={"w-16 h-16 mb-1"} />
                  Streaming
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 flex flex-row">
            <div>
              <OwnerCard
                name={partyroom.host_name}
                phone={partyroom.phone}
                whatsAppUrl={`https://wa.me/${partyroom.phone}`}
              />
            </div>
            <div className="border-solid border-2 py-6 px-8 rounded-lg border-slate-700 place-items-center place-content-center flex text-slate-300 h-fill ms-8 text-lg leading-relaxed italic">
              <p>{`"${partyroom.description}"`}</p>
            </div>
          </div>
          <div className="mb-48">
            <BodyHeader title="Reviews"></BodyHeader>
            <div className="grid grid-cols-3 gap-8">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review_text={review.detail}
                  score={`${review.rating}/10`}
                  name={review.name}
                  date="18 June 23"
                />
              ))}
            </div>
          </div>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
