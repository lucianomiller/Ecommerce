import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import f2 from "../../img/2.png";
import f3 from "../../img/3.png";
import f5 from "../../img/5.png";
import f6 from "../../img/9.png";
import "./Slider.css";

function Slider({ items }) {
  //console.log(items)

  return (
    <div className="carousel-wrapper">
      <Carousel infiniteLoop autoPlay interval={5000} showThumbs={false}>
        <div>
          <img src={f2} alt="" />
        </div>
        <div>
          <img src={f3} alt="" />
        </div>
        <div>
          <img src={f5} alt="" />
        </div>
        <div>
          <img src={f6} alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
