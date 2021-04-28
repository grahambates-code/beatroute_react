import React from 'react';
import MaskModeFrame from '../MaskModeFrame';
import * as TransformUtils from '../../../../../util/transform';

import './index.less';

export default function Index({ card, refetch }) {
    return (
        <div>
            <div className="mask-mode-container">
                {card.assets.map((asset, i) => (
                    <MaskModeFrame
                        key={i}
                        imgSource={asset.data ? asset.data.info.url : ''}
                        rotateDeg={TransformUtils.getRandomDeg(i)}
                        ActionComponent={() => (
                            <div className={'Add'}>
                                <div contentEditable={true} suppressContentEditableWarning={true}>
                                    TEST
                                </div>
                            </div>
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
