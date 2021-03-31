import React, {Fragment} from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const SET = gql`

mutation MyMutation($slide_id : Int, $data : jsonb) {
  update_card_slide(where: {id: {_eq: $slide_id}}, _set: {data: $data}) {
    returning {
      id
    }
  }
}

`;

export default ({slide, media, refetch,  closeModal, pointB}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add title card')}
            onCompleted={() => closeModal() && refetch && refetch() }
            mutation={SET}
            variables={{slide_id : slide.id, data : {...slide.data, pointB : pointB, photo : media.json.url} }}>

            {(set, {loading, error}) => {

                return <wired-button elevation="2" onClick={ set }>
                   Set photo
                </wired-button>

            }}
        </Mutation>

    </div>
}
