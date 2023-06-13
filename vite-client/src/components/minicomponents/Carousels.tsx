import seulgi from "../../assets/seulgi_shoulder.png";

interface CarouselProps {
  image: string;
}

export function LandingCarousel(props: CarouselProps) {
  return (
    <div className="carousel carousel-center gap-4">
      <div className="carousel-item md:w-96 w-72 rounded-xl hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" className="" />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" />
      </div>
      <div className="carousel-item md:w-96 w-72 hover:brightness-125 transition transition-200 ease-in-out">
        <img src={props.image} alt="seulgi" />
      </div>
    </div>
  );
}

export function FormCarousel() {
  return (
    <div className="px-0">
      <div className="carousel mb-8">
        <div className="carousel-item md:w-96 w-72">
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
