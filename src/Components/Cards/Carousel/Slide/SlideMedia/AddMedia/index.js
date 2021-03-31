import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {WebMercatorViewport} from '@deck.gl/core';
import * as turf from '@turf/turf'

const ADD = gql`

mutation UpdateSlide($slide_id : Int, $data : jsonb) {
  update_card_slide(where: {id: {_eq: $slide_id }}, _set: {data: $data}) {
    returning {
      id
    }
  }
}
`;

export default ({viewState,  slide, refetch}) => {

   // const test = (add, refetch) => {

        const viewport  = new WebMercatorViewport(viewState);
        //const center    = viewport.unproject([viewport.width/2,viewport.height/2])
        const tl    = viewport.unproject([0,0])
        const br    = viewport.unproject([viewport.width/2,viewport.width/2], {topLeft : true}) // make a square

        var pointA = turf.point(tl);
        var pointB = turf.point(br);
        //create a bbox that extends to include all the features
        var bbx = turf.bbox(turf.featureCollection([pointA, pointB]));
        var pgn = turf.bboxPolygon(bbx);  //convert it to Polygon feature

        //code for making a square around center
     //   add({onCompleted : () =>{alert(refetch);refetch()}, variables  : {slide_id : slide.id, data : {...slide.data, geojson : {"type": "FeatureCollection", "features": [ pgn]}}}});
    //}

    return <div>

        <Mutation
            onError={() => alert('Could not add slide photo')}
            mutation={ADD}
            variables={{slide_id : slide.id, data : {...slide.data, geojson : {"type": "FeatureCollection", "features": [ pgn]}}}}
            onCompleted={() => {
                //alert(refetch);
                refetch && refetch()}}
        >

            {(add, {loading, error}) => {

                return <button onClick={ () => add() }>
                  Add slide photo
                </button>
            }}
        </Mutation>
    </div>
}
