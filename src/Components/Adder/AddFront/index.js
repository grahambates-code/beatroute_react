import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD_FRONT = gql`

mutation MyMutation($trip_id : Int, $type : String) {
  insert_card(objects: {trip_id: $trip_id, type: $type}) {
    returning {
      id
    }
  }
}
`;

export default ({trip, refetch, type}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add front card')}
            onCompleted={() => refetch()}
            mutation={ADD_FRONT}
            variables={{trip_id : trip.id, type}}
        >

            {(addFront, {loading, error}) => {

                return <wired-button elevation="2" onClick={ addFront }>
                            Add Front
                        </wired-button>

            }}
        </Mutation>

    </div>
}
