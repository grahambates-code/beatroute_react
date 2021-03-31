import React, { Component } from "react";
import Slider from "react-slick";
import Frame from './../../../Common/Frame'

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            centerMode: true,
            centerPadding: "20px",
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        return (
            <div>

                <Slider {...settings}>
                    <div>
                     <Frame>one...</Frame>
                    </div>

                    <div>
                        <Frame>two...</Frame>
                    </div>

                    <div>
                        <Frame>three...</Frame>
                    </div>

                    <div>
                        <Frame>four...</Frame>
                    </div>
                </Slider>
            </div>
        );
    }
}
