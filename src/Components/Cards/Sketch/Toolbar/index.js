import React from 'react'
import Rotation from './Rotation'
import Scale from './Scale'
import './index.less'

export default ({selectedAsset, setSelectedAsset}) => {

    if (!selectedAsset) return null;

    return <div className={'Toolbar'}>
        <Rotation selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset}/>
        <Scale selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset}/>
    </div>

}
