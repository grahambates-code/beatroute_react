import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import {Button, Grid} from "@material-ui/core";

const ADD = gql`

mutation ($content : jsonb, $type : String, $camera : jsonb, $trip_id : Int, $slide_data : jsonb) {

  insert_card(objects: [
                {trip_id: $trip_id, type: $type, data : $content, chapters : {data : [{data : $slide_data, camera : $camera}]}},
              
                ]) {
    returning {
      id
    }
  }
}

`;

export default ({trip, refetch, type}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add altitude')}
            onCompleted={() => refetch()}
            mutation={ADD}
            variables={{  type, trip_id : trip.id , camera : {longitude : 0, latitude : 50, zoom : 10}}}
        >

            {(add, {loading, error}) => {

                return <Button variant="contained" onClick={add}>
                        Add altitude
                    </Button>


            }}
        </Mutation>

    </div>
}
