import { CompositeLayer } from '@deck.gl/core';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {CustomGeometry} from "./CustomGeometry";

export default class PolaroidAndPhotoLayer extends CompositeLayer {

    initializeState() {
        let self = this;
        let meshes = this.props.data.map((d) => ({id : d.id, mesh : new CustomGeometry({ text : d.file, font : this.props.font,  holed  : false})}))
        self.setState({meshes : meshes});
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const { } = this.state;
        const { data } = this.props;

        return data.map(d => new SimpleMeshLayer({
            getOrientation: d => [0, 0,0],
            getTranslation : [1,1,1],
            getScale: [700,700,700],
            opacity: 1,
            data : data,
            mesh: this.state.meshes.find(m => m.id === d.id).mesh,
            getColor : [0,0,0],
            getPosition : (d) => { return d.position},
        }))

    }
}

PolaroidAndPhotoLayer.componentName = 'PolaroidAndPhotoLayer';
