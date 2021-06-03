import React, {Fragment} from 'react'
import AddGPS from './AddGPS'
import AddGPS2 from './AddGPS2'
import AddChapter from './AddChapter'
import Overlay from "../../Common/Overlay";
import {Button} from "../Toolbar/Button";
import DeleteCard from "../Toolbar/DeleteCard";
import Frame from "../../Common/Frame";
import AltitudeChart from './AltitudeChart';
import {Mutation, Query} from "react-apollo";
import gql from "graphql-tag";

const GET_EXTRA = gql`
    query MyQuery($card_id : Int) {
        gps_data(where: {card_id: {_eq: $card_id}}) {
        card_id
        data
    }
}`

const SAVE_CHAPTER = gql`

mutation( $chapter_id : Int,  $camera : jsonb){
                update_chapter(where: {id: {_eq: $chapter_id}}, _set: { camera : $camera}) {
                    returning {
                                data
                                camera
                                id
                              }
                    }
                }
`;


export default ({card, refetch, client, font}) => {
    const actions = [
        { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
        { icon: <AddGPS2 refetch={refetch} card={card}/>, name: 'Add gps' },
    ];

    return <Fragment>

        <Overlay card={card} button={ <Button actions={actions}/>}>
            <Frame width={350}  height={600} >

                Day {card.id}

                <Query query={GET_EXTRA} variables={{card_id : card.id}} >
                    {({ loading, error, data  }) => {

                        if (loading || !data || !data.gps_data.length) {
                            return null
                        };

                        return <Mutation
                            onError={() => alert('Could not save slide media')}
                            onCompleted={() => refetch()}
                            mutation={SAVE_CHAPTER}
                        >

                            {(updateSlideCamera, {loading, error}) => {
                                return <AltitudeChart updateSlideCamera={updateSlideCamera}
                                                      font={font}
                                                      width={500}
                                                      gps_data={data.gps_data[0]}
                                                      card={card} refetch={refetch} client={client}/>
                            }}
                        </Mutation>
                    }}

                    </Query>


            </Frame>
        </Overlay>

    </Fragment>

}
