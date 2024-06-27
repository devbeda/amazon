import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  bannerfive,
  bannerfour,
  bannerone,
  bannersix,
  bannerthree,
  bannertwo,
} from "../../assets/index";

function Banner() {
  const [doctActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "70%",
          left:"0",
          right:"0",
          margin:"0 auto",
          transform: "translate(-50% -50%)",
          width: "210px",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          color: "white",
          background: "#131921",
          border: "1px blue solid",
        }}
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "0",
                right: "0",
                margin: "0 auto",
                transform: "translate(-50% -50%)",
                width: "150px",
              }}
            >
              <ul
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                {dots}{" "}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                color: "white",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                background: "#131921",
                border: "1px blue solid",
              }}
            >
              {i + 1}
            </div>
          ),
        },
      },
    ],
  };
  return (
    <div className="w-full">
      <div className="w-full h-full relative">
        <Slider {...settings}>
          <div>
            <img src={bannerone} alt="" />
          </div>
          <div>
            <img src={bannertwo} alt="" />
          </div>
          <div>
            <img src={bannerthree} alt="" />
          </div>
          <div>
            <img src={bannerfour} alt="" />
          </div>
          <div>
            <img src={bannerfive} alt="" />
          </div>
          <div>
            <img src={bannersix} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Banner;
