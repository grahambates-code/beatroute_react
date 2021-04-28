import React, { Component } from 'react';
import Slider from 'react-slick';
import Frame from './../../../Common/Frame';
import { LinearInterpolator } from 'deck.gl';

export default class SimpleSlider extends Component {
    render() {
        const { card, setViewState } = this.props;

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            centerMode: true,
            centerPadding: '20px',
            initialSlide: this.props.slideIndex,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            beforeChange: (current, next) => {
                card.slides[next] &&
                    card.slides[next].camera &&
                    setViewState({
                        transitionDuration: 750,
                        transitionInterpolator: new LinearInterpolator(),
                        ...card.slides[next].camera,
                    });

                this.props.setSlideIndex(next);
            },
        };
        return (
            <div>
                <Slider {...settings}>
                    {card.slides.map((s) => (
                        <Frame>one...</Frame>
                    ))}
                </Slider>
            </div>
        );
    }
}
