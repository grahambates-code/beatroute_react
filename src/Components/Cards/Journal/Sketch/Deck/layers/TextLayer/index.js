import { CompositeLayer } from '@deck.gl/core';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {CustomGeometry} from "./CustomGeometry";

export default class PolaroidAndPhotoLayer extends CompositeLayer {

    initializeState() {
        let self = this;
        const plane = new CustomGeometry({ text : this.props. text, font : this.props.font,  holed  : false});
        self.setState({plane : plane})
    }

    shouldUpdateState(a) {

        let self = this;

        if (a.oldProps.text != a.props.text) {
            const plane = new CustomGeometry({ text : this.props. text, font : this.props.font,  holed  : false});
            self.setState({plane : plane})
        }


        return a.changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const { } = this.state;
        const { id , text } = this.props;

        return [

            new SimpleMeshLayer({
                id: 'photo' + id,
                getOrientation: d => [0, 0,0],
                getTranslation : [1,1,1],
                getScale: [700,700,700],
                opacity: 1,
                data : [1],
                mesh: this.state.plane,
                getColor : [0,0,0],
                getPosition : (d) => {
                    return [ 39.111328125, 28.8831596093235]},
            })
        ];
    }
}

PolaroidAndPhotoLayer.componentName = 'PolaroidAndPhotoLayer';
