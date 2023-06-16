import { useState, useEffect } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, ReviewHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import {
  DangerButton,
  SubmitButton,
} from "../components/minicomponents/Buttons";
import {
  BookingCardLarge,
  OwnerCard,
} from "../components/minicomponents/Cards";
import { TextArea } from "../components/minicomponents/Inputs";
import { Toaster, toast } from "react-hot-toast";
import sample from "../assets/img/sample_partyroom.jpg";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Booking as BookingType, ReviewFormData } from "../app/interface";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get("booking_id");
  const reduxUserId = useSelector((state: RootState) => state.auth.user_id);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showTimeSensitiveSection, setShowTimeSensitiveSection] =
    useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingType>({
    id: Number(bookingId),
    name: "",
    host_id: NaN,
    host_name: "",
    phone: "",
    address: "",
    headcount: NaN,
    start_time: "",
    booking_date: "",
    status: "",
    special_request: "",
    partyroom_id: NaN,
  });

  const initialReviewFormData: ReviewFormData = {
    detail: "",
    rating: "",
  };
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>(
    initialReviewFormData
  );

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const isPastDateTime = (targetDate: Date) => {
    const currentDate = new Date();
    return currentDate > targetDate;
  };

  useEffect(() => {
    const getBookingDetails = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/partygoer/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingDetails = await response.json();
      const bookingDetailsTreated = bookingDetails.map(
        (booking: BookingType) => ({
          ...booking,
          booking_date: new Date(booking.booking_date).toLocaleString("en-US", {
            timeZone: "Asia/Hong_Kong",
          }),
          start_time: booking.start_time.slice(0, -3),
          status: booking.status
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        })
      );

      setBookingDetails(bookingDetailsTreated[0]);
    };

    getBookingDetails();

    const targetDate = new Date(2023, 2, 18, 16, 0, 0); // replace with database data
    const checkTime = () => {
      if (isPastDateTime(targetDate)) setShowTimeSensitiveSection(true);
    };

    const timer = setInterval(checkTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/review/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_info_id: bookingId,
            rating: parseInt(reviewFormData.rating),
            detail: reviewFormData.detail,
            is_hidden: false,
          }),
        }
      );
      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);
      } else {
        console.log("Form not submitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("booking details", bookingDetails);
  console.log(bookingDetails.booking_date);
  console.log(bookingDetails.partyroom_id);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
            title="Booking Details"
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          <div className="mt-8 flex justify-around place-items-center">
            <span className="mb-6 text-xl text-slate-300">
              Booking Status:{" "}
              <span className="text-slate-100">{bookingDetails.status}</span>
            </span>
            {!showTimeSensitiveSection && (
              <DangerButton label="Cancel Booking" />
            )}
          </div>
          <div
            className={`mb-12 ${
              showTimeSensitiveSection && "mt-6"
            } columns-2 gap-8`}
          >
            <BookingCardLarge
              image={sample}
              onClick={() =>
                navigate(`/partyroom?room_id=${bookingDetails.partyroom_id}`)
              }
              name={bookingDetails.name}
              address={bookingDetails.address}
              date={bookingDetails.booking_date.split(/[\/\s,:]+/)[1]}
              month={new Date(
                2000,
                parseInt(
                  bookingDetails.booking_date.split(/[\/\s,:]+/)[0],
                  10
                ) - 1
              ).toLocaleString("default", { month: "short" })}
              pax={bookingDetails.headcount}
              time={bookingDetails.start_time}
            />
            <div className="flex flex-col place-content-between">
              <OwnerCard
                name={bookingDetails.host_name}
                whatsAppUrl={`https://wa.me/${bookingDetails.phone}`}
              />
              <div className="mt-11 mx-16 border-solid border-2 border-slate-300 border-opacity-40 rounded-md px-8 p-4 h-32 flex items-center justify-center text-slate-300 text-lg">
                <span className="italic">
                  {bookingDetails.special_request}&nbsp;
                </span>
                <span className="text-slate-500">Your special request</span>
              </div>
            </div>
          </div>
          {showTimeSensitiveSection && (
            <>
              <form className="w-full" onSubmit={handleSubmitReview}>
                <ReviewHeader
                  handleInputChange={handleFormChange}
                  rating={reviewFormData.rating}
                />
                <div
                  id="review"
                  className="flex flex-wrap w-full place-content-center mb-24"
                >
                  <div className="mb-8 w-full">
                    <TextArea
                      placeholder="Max 150 characters"
                      name="detail"
                      value={reviewFormData.detail}
                      handleReviewDetailInputChange={handleFormChange}
                    />
                  </div>
                  <SubmitButton
                    isCentered
                    type="submit"
                    label="Submit Your Review"
                  />
                </div>
              </form>
            </>
          )}
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
