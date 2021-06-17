import { CompositeLayer } from '@deck.gl/core';
import * as turf from "@turf/turf";
import { EditableGeoJsonLayer, TransformMode, TranslateMode } from "nebula.gl";
import gql from "graphql-tag";
import { ScenegraphLayer} from '@deck.gl/mesh-layers';

const VISIBLE = 1;

const SAVE_ASSET_POSITION = gql `mutation MyMutation($id : Int, $position : jsonb) {
  update_asset(where: {id: {_eq: $id}}, _set: {position: $position}) {
    returning {
      id
    }
  }
}
`

export default class EditLayer extends CompositeLayer {

    initializeState() {
        const { asset } = this.props;

        //console.log(turf.feature(([  -2.8729248046875, 54.54339315407258 ])));
        this.setState({position : turf.featureCollection([turf.point(asset.position)])});
    }

    renderLayers() {

       const { asset } = this.props;

     // console.log(this.state.position);

       const edit = new EditableGeoJsonLayer({
              id: 'mask-editor',
              data:  this.state.position,
              opacity : VISIBLE,
              mode: TranslateMode,
              selectedFeatureIndexes: [0],

              _subLayerProps: {
                  geojson: {
                      getFillColor: () => [255,0,255,255],
                      getLineColor: () => [255,255,255,255],
                      pointRadiusMinPixels : 20,
                      pointRadiusMaxPixels : 20
                  }
              },

              onEdit: (event) => {

                  const { updatedData, editType } = event;

                  this.setState({position : updatedData});

                  if (editType === 'rotated' || editType === 'translated') {
                      //alert(JSON.stringify(this.props));
                      this.props.client && this.props.client.mutate({mutation: SAVE_ASSET_POSITION, variables : {id : asset.id, position : updatedData.features[0].geometry.coordinates } }).then(() => this.props.refetch());
                  }

              }
          })

        console.log(this.state.position);

        const ll = new ScenegraphLayer({ data : [asset],

            scenegraph: asset.data.file,

            opacity : 1,

            getPosition: asset => this.state.position.features[0].geometry.coordinates,

            getTranslation : asset=> [0,0, 0],

            getOrientation: asset => [0, 0, 90 ],

            getScale: (asset) =>[asset.scale,asset.scale,asset.scale],

            sizeScale: 10,

            _lighting: 'pbr'
        });

        return [  edit, ll ];
    }
}

EditLayer.componentName = 'EditLayer';
