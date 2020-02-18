import React from "react";
// import "./style.css";

function Carousel(props) {
  return (
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                
            </div>
            <div class="carousel-item">
                <img src={props.imgTwo} class="d-block w-100 img-fluid" alt="Responsive image"/>
            </div>
            <div class="carousel-item">
                <img src={props.imgThree} class="d-block w-100 img-fluid" alt="Responsive image"/>
            </div>
        </div>
    </div>
  );
}

export default Carousel;