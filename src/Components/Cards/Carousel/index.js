import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSpringCarousel } from 'react-spring-carousel-js';
import DeckGL, { ScatterplotLayer, LinearInterpolator, FlyToInterpolator } from "deck.gl";
import CarouselActions from './CarouselActions';
import Frame from './../Common/Frame'
import './index.less';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


function Carousel({ slidePhotoRotation, setSlidePhotoRotation, setCurrentPhoto, viewState, setViewState, setSlideIndex, slideIndex, card,refetch, className, style }) {

    const prev = usePrevious({ slides : card.slides.length});
    const [locked, setLocked] = useState(false);

    const { carouselFragment, getCurrentActiveItem, useListenToCustomEvent, slideToNextItem } = useSpringCarousel({
        withLoop: false,

        items: card.slides.map((slide, index) => ({
            id: index,
            renderItem: <Frame setLocked={setLocked} slidePhotoRotation={slidePhotoRotation} setSlidePhotoRotation={setSlidePhotoRotation} viewState={viewState} card={card} slide={slide} refetch={refetch} slideIndex={slideIndex} setSlideIndex={setSlideIndex}>blah</Frame>
        }))
    });

    //if slides increased, move along
    useEffect(() => {
        if (prev && card.slides.length > prev.slides) slideToNextItem();
    }, [card.slides.length]);

    useListenToCustomEvent( 'onSlideStartChange', name => {

        //console.log(card.slides[name.nextItem].camera);
        setSlideIndex(name.nextItem);
        setCurrentPhoto(card.slides[name.nextItem].data.geojson); //setting photo geojson state

        card.slides[name.nextItem].camera && setViewState({
            transitionDuration: 750,
            transitionInterpolator: new LinearInterpolator(),
            ...card.slides[name.nextItem].camera});
    });

    return (
        <div
            className={classNames(
                'carousel',
                className,
            )}
            style={style}
        >

            <div className="carousel-wrapper">
                <div style={{ flex: 1 }}>
                    {carouselFragment}
                </div>
            </div>

        </div>
    );
}

Carousel.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

Carousel.ItemActions = CarouselActions;

export default Carousel;
