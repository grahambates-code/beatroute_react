import React, {Fragment} from 'react'
import {WebMercatorViewport} from '@deck.gl/core';

export default ({viewState, children}) => {

    const viewport = new WebMercatorViewport(viewState);

    const nw = viewport.unproject([0, 0]);
    const se = viewport.unproject([viewport.width, viewport.height]);


    return <Fragment>

        <pre>{JSON.stringify([nw,se])}</pre>

        {children}</Fragment>

}
