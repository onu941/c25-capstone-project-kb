import { CarouselProps } from "../../app/interface";
import { useNavigate } from "react-router-dom";

export function LandingCarousel(props: CarouselProps) {
  const navigate = useNavigate();

  return (
    <div className="carousel carousel-center gap-3 bg-slate-800 rounded-sm border-slate-700 border-opacity-30 border-solid border-2">
      {props.randomRooms.map((room, index) => (
        <div
          key={index}
          className="carousel-item md:w-96 w-72 py-3 rounded-sm hover:brightness-110 brightness-95 transition duration-200 ease-in-out"
          onClick={() => navigate(`/partyroom?room_id=${room.id}`)}
        >
          <img
            src={`${import.meta.env.VITE_API_SERVER}/rooms/${room.filename}`}
            alt={room.filename}
            className="rounded-sm ms-3 border-solid border-2 border-slate-100 border-opacity-50"
          />
        </div>
      ))}
    </div>
  );
}
