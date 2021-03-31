import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {WebMercatorViewport} from '@deck.gl/core';
import * as turf from '@turf/turf'

const ADD = gql`

mutation MyMutation($slide_id : Int) {
  delete_card_slide(where: {id: {_eq: $slide_id}}) {
     returning {
      id
    }
  }

}

`;

export default ({viewState,  slide, refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add slide photo')}
            onCompleted={() => window.location.reload()}
            mutation={ADD}
            variables={{slide_id : slide.id}}
        >

            {(del, {loading, error}) => {

                return <button onClick={ () => del() }>
                 Delete
                </button>
            }}
        </Mutation>
    </div>
}
