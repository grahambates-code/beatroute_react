import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD = gql`

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
            onError={() => alert('Could not add title card')}
            onCompleted={() => refetch()}
            mutation={ADD}
            variables={{trip_id : trip.id, type}}
        >

            {(add, {loading, error}) => {

                return <wired-button elevation="2" onClick={ add }>
                            Add Title
                        </wired-button>

            }}
        </Mutation>

    </div>
}
