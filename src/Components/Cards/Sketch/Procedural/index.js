import ProceduralMap from 'procedural-gl-react';
import React, {useRef, useEffect} from 'react'
import Procedural from 'procedural-gl'
import './index.less'

const datasource = {
    elevation: {
        apiKey: '1b045ec93f5b94db894037db8d297128e'
    },
    imagery: {
        urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=cZQg2QaktSnI18BSAxZX',
            attribution: '<a href="https://www.maptiler.com/copyright/">Maptiler</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        let that = this
        window.setTimeout(() => {
            //props.setCanvas(that.myRef);
            Procedural.orbitTarget();
            //alert(1);
        }, 3000);



    }

    render() {
        return <div className={'Map'}><ProceduralMap
            ref={this.myRef}
            datasource={datasource}
            compassVisible={false}
            displayLocation={ this.props.location}
        /></div>
    }
}

