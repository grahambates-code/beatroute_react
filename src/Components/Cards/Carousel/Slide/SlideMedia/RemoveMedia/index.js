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

    const test = (add) => {

        //code for making a square around center
        add({variables  : {slide_id : slide.id, data : {...slide.data, geojson : {"type": "FeatureCollection", "features": [ ]}}}});
    }

    return <div>

        <Mutation
            onError={() => alert('Could not remove slide photo')}
            onCompleted={() => refetch && refetch() }
            mutation={ADD}
        >

            {(add, {loading, error}) => {

                return <button onClick={ () => test(add) }>
                  remove slide photo
                </button>
            }}
        </Mutation>
    </div>
}
