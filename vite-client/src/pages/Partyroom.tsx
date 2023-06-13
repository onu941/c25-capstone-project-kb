import { useEffect, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
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
import {
  BriefcaseIcon,
  CakeIcon,
  ChartBarIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import { TvIcon } from "@heroicons/react/24/outline";

type Partyroom = {
  id: number;
  name: string;
  host_id: number;
  district: string;
  capacity: number;
  phone: string;
  address: string;
  description: string;
  category: string[];
  equipment: string[];
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
  const [partyroom, setPartyroom] = useState<Partyroom>({
    id: NaN,
    name: "",
    host_id: NaN,
    district: "",
    capacity: NaN,
    phone: "",
    address: "",
    description: "",
    category: [],
    equipment: [],
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);

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

  const openGoogleMaps = () => {
    const addressQuery = encodeURIComponent(partyroom.address);
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
    window.open(googleMapsURL, "_blank");
  };

  useEffect(() => {
    const fetchPartyroomDetails = async () => {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("user_id");
      const partyroomId = params.get("partyroom_id");
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
        address: partyroomDetails.address,
        host_id: partyroomDetails.host_id,
        capacity: partyroomDetails.capacity,
        // area: partyroomDetails.area,
        description: partyroomDetails.description,
      });

      if (Number(userId) === partyroomDetails.host_id) setIsOwner(!isOwner);
    };

    fetchPartyroomDetails();
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
              {partyroom.address} | district |{" "}
              <a
                href=""
                className=" underline text-slate-400"
                onClick={() => openGoogleMaps()}
              >
                locate on google maps
              </a>
            </div>
            <div className="text-slate-300">
              partyroom area | {partyroom.capacity} pax
            </div>
          </div>
          {isOwner && (
            <div className="mb-4 w-full columns-2 flex justify-center gap-12">
              <PrimaryButton label="Edit Partyroom" />
              <DangerButton label="Delete Partyroom" />
            </div>
          )}
          <div className="w-full flex md:px-0 justify-between columns-2 mb-12">
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
          <div className="mb-8">
            <div className="border-solid border-2 p-6 rounded-lg border-slate-700 text-center text-slate-300">
              <p>{partyroom.description}</p>
              <br></br>- Owner name, WhatsApp number
            </div>
          </div>
          <div className="mb-48">
            <BodyHeader title="Reviews"></BodyHeader>
            <div className="border-solid border-2 p-6 rounded-lg border-slate-700 text-center text-slate-300">
              <p>{partyroom.description}</p>
              <br></br>- Reviewer, WhatsApp number
            </div>
          </div>
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
