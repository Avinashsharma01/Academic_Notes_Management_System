/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../Components/Carousel.css";
import { Carousel_Gsap } from "./Gsap";

function Carousel({ items }) {
    Carousel_Gsap();
    const [current, setCurrent] = useState(0);

    // const[autoPlay, setAotuPlay] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            slideRight();
        }, 3000);
    });
    const slideLeft = () => {
        setCurrent(current === 0 ? items.length - 1 : current - 1);
    };
    const slideRight = () => {
        setCurrent(current === items.length - 1 ? 0 : current + 1);
    };
    // console.log(current)
    return (
        <>
            <div className="carousel">
                <div className="Carousel_wrapper">
                    {items.map((imageItem, index) => (
                        <div
                            key={index}
                            className={
                                index == current
                                    ? "Crausel_card  Crausel_card-active"
                                    : "Crausel_card"
                            }
                        >
                            <img
                                className="card_image"
                                src={imageItem.image}
                                alt=""
                            />
                            <div className="card_overlay">
                                <h2 className="">{imageItem.titel}</h2>
                            </div>
                        </div>
                    ))}
                    <div className="carousel_arrow_left" onClick={slideLeft}>
                        &lsaquo;
                    </div>
                    <div className="carousel_arrow_right" onClick={slideRight}>
                        &rsaquo;
                    </div>
                    <div className="carousel_pagination">
                        {items.map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        index == current
                                            ? "pagination_dot  pagination_dot-active"
                                            : "pagination_dot"
                                    }
                                    onClick={() => setCurrent(index)}
                                ></div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Carousel;
