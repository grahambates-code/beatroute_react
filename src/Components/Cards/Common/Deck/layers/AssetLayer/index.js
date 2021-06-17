import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer} from '@deck.gl/mesh-layers';
import _ from 'lodash';
import EditLayer from "../../../../Common/EditLayer";

export default class AssetLayer extends CompositeLayer {

    renderLayers() {

        const { data, file } = this.props;

        let grouped = _(data)
            .groupBy(x => x.data.file)
            .map((values, key) => ({key: key, values: values}))
            .value();

        let edit = data.map(b => new EditLayer({ refetch : this.props.refetch, client : this.props.client, asset : b }))

        let models = grouped.map(a => new ScenegraphLayer({ data : a.values,

            scenegraph : a.key,

            opacity : 1,

            getPosition: asset => asset.position,

            getTranslation : asset=> [0,0, 0],

            getOrientation: asset => [90, 0, 0 ],

            getScale: (asset) =>[asset.scale,asset.scale,asset.scale],

            sizeScale: 50000,

            _lighting: 'pbr'
        }));

        return (edit)

    }
}

AssetLayer.componentName = 'AssetLayer';
