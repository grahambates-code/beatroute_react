import {GeoJsonLayer} from '@deck.gl/layers';
import GL from '@luma.gl/constants';
import {Matrix4} from 'math.gl';
import {CompositeLayer} from "@deck.gl/core";

class WellLayerCombined extends CompositeLayer {

    initializeState(p) {
        let self = this;

        // console.log(this. context.timeline.playing);

        if ( !this.state.full && !self.state.timer) {

            self.state.timer = window.setTimeout(d=> {
                self.setState({full : true})
            }, 1000);

        }
    }

    renderLayers() {

        const underground = new GeoJsonLayer({
            id: 'underground' + this.props.id,
            data: this.props.data,

            transitions: {
                getElevation: {
                    duration: 1000,
                },
            },

            updateTriggers : { getElevation   : [this.state.full] },

            extruded : true,
            elevationScale: 1000,
            getElevation: () => {
                return this.state.full ? -5  : 0
            },
           // modelMatrix : new Matrix4().makeTranslation(0,0, -20 ),

            parameters: {
                [GL.DEPTH_TEST]: true,
            },

            getFillColor: (feature, isSelected) => {
                return [0x55, 0xE2, 0xC2, 0x44] ;
            },
            getLineColor: (feature, isSelected) => {
                return [0x00, 0x20, 0x90, 0xff]
            },
        })

        const ontop = new GeoJsonLayer({
            id: 'ontop' + this.props.id,
            data: this.props.data,
            extruded : false,
            pickable : true,

            parameters: {
                // prevent flicker from z-fighting
                [GL.DEPTH_TEST]: false,

                // turn on additive blending to make them look more glowy
                [GL.BLEND]: true,
            },

            getFillColor: (feature, isSelected) => {
                return [0x55, 0xE2, 0xC2, 0x44] ;
            },
            getLineColor: (feature, isSelected) => {
                return [0x00, 0x20, 0x90, 0xff]
            },
        })

        return [ underground, ontop];
    }
}

WellLayerCombined.layerName = 'WellLayer';

export default WellLayerCombined;
