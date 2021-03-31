import React, {useState, useEffect, Fragment} from 'react';
import gql from "graphql-tag";
import {Mutation} from "react-apollo";

const INSERT_SLIDE = gql`
    mutation MyMutation($card_id : Int, $data : jsonb) {
    
      insert_card_slide(objects: {card_id: $card_id, data : $data}) {
        returning {
          id
        }
      }
    }
`;

export default function ({card, refetch, slideIndex, setSlideIndex}) {

    return (

        <div>
        {/*we deliberately do not put a camera object in thee data as we dont know if we want to move the camera, which is a slide based action*/}
            <Mutation
                onError={() => alert('Could not add slide')}
                onCompleted={()=> {refetch(); setSlideIndex(slideIndex + 1) }}
                variables={{ data : {"text" : "Write here"}}}
                mutation={INSERT_SLIDE}
            >

                {(add, {loading, error}) => {

                    return <Fragment>
                        <button onClick={() => {add({variables : {card_id : card.id}})}}>New slide</button>
                    </Fragment>

                }}
            </Mutation>


        </div>

    );
}
