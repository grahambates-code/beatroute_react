import React, {Fragment, Component } from 'react';
import Page         from "./../Page"
import PhotoLookup  from "./../PhotoLookup"
import Deck         from "../../../Common/Deck";

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedAsset: null,
            viewState: props.chapter.camera
        }

    }

    render() {

        let { viewState } = this.state;

        let {font, client, chapter, refetch, width, trip, card, updateSlideCamera, gps_data} = this.props;

        let setViewState = (p) => this.setState({viewState: p});

        return <Fragment>
                <PhotoLookup viewState={viewState}>
                    <Deck    chapter={chapter}
                             client={client}
                             refetch={refetch}
                             updateSlideCamera={updateSlideCamera}
                             font={font}
                             viewState={viewState}
                             setViewState={setViewState}
                             width={width}
                             trip={trip}
                             gps_data={gps_data}
                             card={card}/>
                </PhotoLookup>

            <div>
               {chapter.pages.map(p => <Page page={p} /> )}
            </div>
        </Fragment>

    }
}
