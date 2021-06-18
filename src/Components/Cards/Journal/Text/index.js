import React, {useState, useEffect, Fragment} from 'react'
import './index.less'
import Frame from "./../../Common/Frame";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Overlay from "../../Common/Overlay";
import {Button} from "../Toolbar/Button";
import DeleteCard from "../Toolbar/DeleteCard";
const SAVE_TITLE = gql`

mutation( $card_id : Int,  $data : jsonb){
                update_card(where: {id: {_eq: $card_id}}, _set: {data: $data}) {
                    returning {
                                id
                              }
                    }
                }
`;

export default ({card, i, refetch}) => {

    const actions = [
        { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
    ];

    const [seconds, setSeconds] = useState(170);

    const T = ({card}) => <Frame width={350}  height={seconds} >

        <Mutation onError={() => alert('Could not save title')} mutation={SAVE_TITLE} >

            {(updateTitle, {loading, error}) => {

                return <div onBlur={(e) => updateTitle({
                    variables: {
                        data: e.currentTarget.textContent,
                        card_id: card.id
                    }
                })}
                           contentEditable suppressContentEditableWarning={true}>
                    <div className="add-journal-text clearfix">
                        <div className="add-journal-circle" />
                        <p>
                            {card.data}
                        </p>
                    </div>

                </div>

            } }

        </Mutation>

    </Frame>
    return  <div className={'Text'}>

                <Overlay card={card} button={<Button actions={actions}/>}>
                    <T card={card} i={i}/>
                </Overlay>

            </div>

}
