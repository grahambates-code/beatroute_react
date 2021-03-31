import React from 'react';

function CarouselItem({ children, ...restProps }) {
    return (
        <div
            style={{
                flex: 1,
                cursor: 'grab',
                userSelect: 'none',
                margin : '30px',
                ...restProps.style,
            }}
        >
            {children}
        </div>
    );
}


export default CarouselItem;
