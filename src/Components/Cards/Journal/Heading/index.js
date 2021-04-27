import React, {useState, useEffect, Fragment} from 'react'
import './index.less'
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Overlay from "../../Common/Overlay";
import {Button} from "../Map/Toolbar/Button";
import Frame from "../../Common/Frame";

const SAVE_TITLE = gql`

mutation( $card_id : Int,  $data : jsonb){
                update_card(where: {id: {_eq: $card_id}}, _set: {data: $data}) {
                    returning {
                                id
                              }
                    }
                }
`;

export default ({card, i}) => {

    const T = ({card, i}) => <Mutation onError={() => alert('Could not save title')} mutation={SAVE_TITLE} >

        {(updateTitle, {loading, error}) => {

            return <h1 onBlur={(e) => updateTitle({
                variables: {
                    data: {...card.data, text : e.currentTarget.textContent},
                    card_id: card.id
                }
            })}
                       contentEditable suppressContentEditableWarning={true}>
                { card.data?.text || 'Enter Text'}
            </h1>

        } }

    </Mutation>

    return <div className={'blue paper'}>

        <Overlay card={card} button={<Button/>}>
            <T card={card} i={i}/>
        </Overlay>

    </div>

}
