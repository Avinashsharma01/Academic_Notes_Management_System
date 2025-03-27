import React, { useEffect, useState } from "react";
import "./Phase2.css";
import { Phase2ImageCard1, Phase2ImageCard2, Phase2ImageCard3, Phase2ImageCard4 } from "./Data_Storage_Con";
function Phase2() {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(()=>{
    setTimeout(()=>{
      slideRight();
    },3000)
  })

  const slideRight = () => {
    setCurrentVal(currentVal === Phase2ImageCard1.length - 1 ? 0 : currentVal + 1);
  };
  return (

    <>
    
    <div className="Phase2-main-container">
      <div className="carousel-container1">
        {Phase2ImageCard1.map((items, index) => (
          <div
            key={index}
            className={
              index == currentVal
                ? "carousel-card carousel-card-active"
                : "carousel-card"
            }
          >
            <img className="card-image" src={items.carouselBox1Img1} alt="" />
          </div>
        ))}
      </div>


      <div className="carousel-container2">
   
        {Phase2ImageCard2.map((items, index) => (
          <div
            key={index}
            className={
              index == currentVal
                ? "carousel-card carousel-card-active"
                : "carousel-card"
            }
          >
            <img className="card-image" src={items.carouselBox1Img1} alt="" />
          </div>
        ))}
      </div>


      <div className="carousel-container3">
   
        {Phase2ImageCard3.map((items, index) => (
          <div
            key={index}
            className={
              index == currentVal
                ? "carousel-card carousel-card-active"
                : "carousel-card"
            }
          >
            <img className="card-image" src={items.carouselBox1Img1} alt="" />
          </div>
        ))}
      </div>

      <div className="carousel-container4">
   
        {Phase2ImageCard4.map((items, index) => (
          <div
            key={index}
            className={
              index == currentVal
                ? "carousel-card carousel-card-active"
                : "carousel-card"
            }
          >
            <img className="card-image" src={items.carouselBox1Img1} alt="" />
          </div>
        ))}
      </div>

      </div>
    </>

  );
}

export default Phase2;
