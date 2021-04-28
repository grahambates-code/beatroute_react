import React from 'react';
import Rotation from './Rotation';
import Scale from './Scale';

import AddAsset from './AddAsset';
import AddText from './AddText';
import { Button } from './Button';

import './index.less';

export default ({ refetch, slide, selectedAsset, setSelectedAsset, viewState }) => {
    //if (!selectedAsset) return null;

    return (
        <div className={'Toolbar'}>
            {/*<Button/>*/}
            {/*<AddAsset viewState={viewState} slide={slide} file={'/textures/arrow2.glb'} refetch={refetch}/>*/}
            {/*<AddText  viewState={viewState} slide={slide} refetch={refetch}/>*/}

            {selectedAsset && (
                <div>
                    <Rotation selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
                    <Scale selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
                </div>
            )}
        </div>
    );
};
