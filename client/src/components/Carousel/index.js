import React from "react";
// import "./style.css";

function Carousel(props) {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src={props.imgOne} className="d-block w-100 img-fluid" alt="Responsive image"/>
            </div>
            <div className="carousel-item">
                <img src={props.imgTwo} className="d-block w-100 img-fluid" alt="Responsive image"/>
            </div>
            <div className="carousel-item">
                <img src={props.imgThree} className="d-block w-100 img-fluid" alt="Responsive image"/>
            </div>
        </div>
    </div>
  );
}

export default Carousel;