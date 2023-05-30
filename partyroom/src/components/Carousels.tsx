import seulgi from "../assets/seulgi_shoulder.png";

export function LandingCarousel() {
  return (
    <div className="px-4">
      <div className="carousel mb-8">
        <div className="carousel-item">
          <img
            src={seulgi}
            alt="seulgi"
            className="rounded-md mx-1 drop-shadow-lg"
          ></img>
          <img
            src={seulgi}
            alt="seulgi"
            className="rounded-md mx-1 drop-shadow-lg"
          ></img>
          <img
            src={seulgi}
            alt="seulgi"
            className="rounded-md mx-1 drop-shadow-lg"
          ></img>
        </div>
      </div>
    </div>
  );
}
