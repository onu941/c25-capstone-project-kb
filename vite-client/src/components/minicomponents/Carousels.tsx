import { useState } from "react";
import { CarouselProps, RandomLandingRooms } from "../../app/interface";
import { useNavigate } from "react-router-dom";

export function LandingCarousel(props: CarouselProps) {
  const navigate = useNavigate();
  const roomImageDirectory = "../../public/img/room/";

  return (
    <div className="carousel carousel-center gap-3 bg-slate-800 rounded-sm border-slate-700 border-opacity-30 border-solid border-2">
      {props.randomRooms.map((room, index) => (
        <div
          key={index}
          className="carousel-item md:w-96 w-72 py-3 rounded-sm hover:brightness-110 brightness-95 transition duration-200 ease-in-out"
          onClick={() => navigate(`/partyroom?room_id=${room.id}`)}
        >
          <img
            src={roomImageDirectory + room.filename}
            alt={room.filename}
            className="rounded-sm ms-3 border-solid border-4 border-slate-500 border-opacity-50"
          />
        </div>
      ))}
      {/* <div className="carousel-item md:w-96 w-72 rounded-xl hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[0].filename}
          alt={randomRooms[0].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[1].filename}
          alt={randomRooms[1].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[2].filename}
          alt={randomRooms[2].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[3].filename}
          alt={randomRooms[3].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[4].filename}
          alt={randomRooms[4].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[5].filename}
          alt={randomRooms[5].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[6].filename}
          alt={randomRooms[6].filename}
        />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img
          src={roomImageDirectory + randomRooms[7].filename}
          alt={randomRooms[7].filename}
        />
      </div> */}
    </div>
  );
}
