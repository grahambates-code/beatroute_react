import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer} from '@deck.gl/mesh-layers';

export default class AssetLayer extends CompositeLayer {

    initializeState() {

        let self = this;

        this.setState({ });
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        //const {  } = this.state;
        const { scenegraph, asset } = this.props;

        return [

            new ScenegraphLayer({

                id: 'scenegraph-layer' + asset.id,

                data : [asset.data],

                pickable: true,

                scenegraph,

                getPosition: d => d.position,

                getTranslation : d=> d.translation,

                getOrientation: d => [0, d.angle, 90 ],

                getScale: (d) =>[d.scale,d.scale,d.scale],

                sizeScale: 4,

                // _lighting: 'flat'
            })

        ];
    }
}

AssetLayer.componentName = 'AssetLayer';
