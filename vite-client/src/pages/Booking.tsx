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
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Booking as BookingType, ReviewFormData } from "../app/interface";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get("booking_id");
  const viewMode = useSelector((state: RootState) => state.user.bookingsTab);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showTimeSensitiveSection, setShowTimeSensitiveSection] =
    useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingType>({
    id: Number(bookingId),
    name: "",
    person_id: NaN,
    person_name: "",
    phone: "",
    address: "",
    headcount: NaN,
    start_time: "",
    booking_date: "",
    status: "",
    special_request: "",
    partyroom_id: NaN,
    filename: "",
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

  const getTargetDate = () => {
    const bookingDate = bookingDetails.booking_date.split(",")[0].trim();
    const bookingTime = bookingDetails.start_time;

    const [month, day, year] = bookingDate.split("/");
    const [hours, minutes] = bookingTime.split(":");

    const monthIndex = parseInt(month) - 1;

    const targetDate = new Date(
      parseInt(year),
      monthIndex,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    return targetDate;
  };

  const isPastDateTime = (targetDate: Date) => {
    const currentDate = new Date();
    const result: boolean = currentDate > targetDate;
    return result;
  };

  const checkTime = async () => {
    const targetDate = getTargetDate();
    if (isPastDateTime(targetDate)) setShowTimeSensitiveSection(true);
  };

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

  const getBookingDetailsAsHost = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/booking/host/${bookingId}`,
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

  useEffect(() => {
    if (viewMode === "partygoer") {
      getBookingDetails();
    }

    if (viewMode === "host") {
      getBookingDetailsAsHost();
    }

    const successMessage = localStorage.getItem("bookingSuccess");
    if (successMessage) toast.success(successMessage);
    localStorage.removeItem("bookingSuccess");
  }, [viewMode]);

  useEffect(() => {
    checkTime();
  }, [bookingDetails]);

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

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/update_status/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "confirmed" }),
        }
      );

      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);
        getBookingDetailsAsHost();
      } else {
        console.log("Confirmation not submitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/update_status/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "cancelled" }),
        }
      );

      if (response.ok) {
        const { message } = await response.json();
        toast(message);

        if (viewMode === "host") {
          getBookingDetailsAsHost();
        } else if (viewMode === "partygoer") {
          getBookingDetails();
        }
      } else {
        console.log("Cancellation not submitted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestCancel = () => {
    const whatsAppLink = `https://wa.me/${bookingDetails.phone}`;
    toast(
      <span className="text-gray-600">
        Please contact the host @{" "}
        <a href={whatsAppLink} className="underline">
          {bookingDetails.phone}
        </a>
      </span>,
      { icon: "📱" }
    );
  };

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
          <div className="mt-8 flex justify-around place-items-center md:mx-0 mx-4">
            <span className="mb-6 text-xl text-slate-300">
              Booking Status:{" "}
              <span className="text-slate-100">{bookingDetails.status}</span>
            </span>
            {!showTimeSensitiveSection && viewMode === "partygoer" && (
              <DangerButton
                onClick={() => handleGuestCancel()}
                label="Cancel Booking"
              />
            )}
          </div>
          <div
            className={`mb-12 ${
              showTimeSensitiveSection && "mt-6"
            } grid md:grid-cols-2 grid-cols-1 gap-8 px-4 md:px-0`}
          >
            <BookingCardLarge
              image={`${import.meta.env.VITE_API_SERVER}/rooms/${
                bookingDetails.filename
              }`}
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
            <div
              className={`flex flex-col place-content-between md:mt-0 mt-4 ${
                !showTimeSensitiveSection && `mb-16`
              }`}
            >
              <OwnerCard
                name={bookingDetails.person_name}
                whatsAppUrl={`https://wa.me/${bookingDetails.phone}`}
              />
              <div className="mt-11 md:mx-16 border-solid border-2 border-slate-300 border-opacity-40 rounded-md px-8 p-4 h-32 flex flex-wrap items-center justify-center text-slate-300 md:text-lg text-base">
                <div className="italic">
                  {bookingDetails.special_request &&
                    `"${bookingDetails.special_request}"`}
                </div>
                <div className="text-slate-500">
                  {bookingDetails.special_request
                    ? `\u00A0-\u00A0${
                        viewMode === "host" ? "Their" : "Your"
                      } special request`
                    : "No special requests"}
                </div>
              </div>
            </div>
          </div>
          {viewMode === "host" && (
            <div className="w-full flex justify-center md:mt-20 md:mb-0 mb-24">
              <div className="w-5/12 flex flex-wrap justify-between">
                <DangerButton
                  disabled={
                    bookingDetails.status === "Confirmed" ||
                    bookingDetails.status === "Cancelled"
                  }
                  onClick={() => handleCancelBooking()}
                  label="Cancel Booking"
                />
                <SubmitButton
                  disabled={
                    bookingDetails.status === "Confirmed" ||
                    bookingDetails.status === "Cancelled"
                  }
                  onClick={() => handleConfirmBooking()}
                  label="Confirm Booking"
                />
              </div>
            </div>
          )}
          {viewMode === "partygoer" && showTimeSensitiveSection && (
            <>
              <form
                className="w-full px-4 md:px-0"
                onSubmit={handleSubmitReview}
              >
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
