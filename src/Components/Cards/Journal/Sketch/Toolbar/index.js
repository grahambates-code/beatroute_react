import React from 'react'
import Rotation from './Rotation'
import Scale from './Scale'

import AddAsset from './AddAsset'

import './index.less'

export default ({refetch, slide, selectedAsset, setSelectedAsset, viewState}) => {

    //if (!selectedAsset) return null;

    return <div className={'Toolbar'}>

        <AddAsset viewState={viewState} slide={slide} type={'/textures/arrow2.glb'} refetch={refetch}/>

        {selectedAsset && <div>
            <Rotation selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset}/>
            <Scale selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset}/>
        </div>}

    </div>

}
