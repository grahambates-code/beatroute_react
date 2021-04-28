import { CompositeLayer } from '@deck.gl/core';
import { BitmapLayer } from '@deck.gl/layers';
import GL from '@luma.gl/constants';
import * as turf from '@turf/turf';
import { EditableGeoJsonLayer, TransformMode, TranslateMode } from 'nebula.gl';
import gql from 'graphql-tag';
import AssetLayer from '../AssetLayer';

const VISIBLE = 0;

const SAVE_ASSET_POSITION = gql`
    mutation MyMutation($id: Int, $position: jsonb) {
        update_asset(where: { id: { _eq: $id } }, _set: { position: $position }) {
            returning {
                id
            }
        }
    }
`;

export default class EditLayer extends CompositeLayer {
    initializeState() {
        const { asset } = this.props;

        //console.log(turf.feature(([  -2.8729248046875, 54.54339315407258 ])));
        this.setState({
            position: turf.featureCollection([turf.point(asset.position)]),
        });
    }

    renderLayers() {
        const { asset } = this.props;

        // console.log(this.state.position);

        const edit = new EditableGeoJsonLayer({
            id: 'mask-editor',
            data: this.state.position,
            opacity: VISIBLE,
            mode: TranslateMode,
            selectedFeatureIndexes: [0],

            _subLayerProps: {
                geojson: {
                    getFillColor: () => [255, 0, 255, 255],
                    getLineColor: () => [255, 255, 255, 255],
                    pointRadiusMinPixels: 20,
                    pointRadiusMaxPixels: 20,
                },
            },

            onEdit: (event) => {
                const { updatedData, editType } = event;

                // console.log(updatedData);
                this.setState({ position: updatedData });
                //this.props.setSlidePhotoRotation({ ...this.props.slidePhotoRotation, position : updatedData});
                if (editType === 'rotated' || editType === 'translated') {
                    console.log(updatedData);
                    console.log(this.props.client);
                    this.props.client &&
                        this.props.client
                            .mutate({
                                mutation: SAVE_ASSET_POSITION,
                                variables: {
                                    id: asset.id,
                                    position: updatedData.features[0].geometry.coordinates,
                                },
                            })
                            .then(() => this.props.refetch());
                }
            },
        });

        // const assetL = new AssetLayer({ id : 'fgfdgfsd', type : asset.type, data : [{...asset, position : this.state.position.features[0].geometry.coordinates}] });

        return [edit];
    }
}

EditLayer.componentName = 'EditLayer';
