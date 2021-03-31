import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

function MaskModeFrame(props) {
    return (
        <div 
            className='mask-mode-frame' 
            style={{ 
                transform: props.rotateDeg !== undefined 
                    ?  `rotate(${props.rotateDeg}deg)`
                    : undefined
            }}
        >
            <div className="mask-mode-frame-img" >
                <div>
                    <img src={props.imgSource} alt="" />
                </div>
            </div>
            {props.ActionComponent && (
                <div className="mask-mode-frame-footer">
                    <props.ActionComponent />
                </div>
            )}
        </div>
    );
}

MaskModeFrame.propTypes = {
    imgSource: PropTypes.string.isRequired,
    rotateDeg: PropTypes.number,
    ActionComponent: PropTypes.node
};

export default MaskModeFrame;
