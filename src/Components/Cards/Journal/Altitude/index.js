import React, {Fragment} from 'react'
import AddGPS from './AddGPS'
import AddGPS2 from './AddGPS2'
import AddChapter from './AddChapter'
import Overlay from "../../Common/Overlay";
import {Button} from "../Toolbar/Button";
import DeleteCard from "../Toolbar/DeleteCard";
import Frame from "../../Common/Frame";
import Chart from './TopScrollGraphic';

export default ({card, refetch, client}) => {
    const actions = [
        { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
        { icon: <AddChapter refetch={refetch} card={card}/>, name: 'Add chapter' },
        { icon: <AddGPS2 refetch={refetch} card={card}/>, name: 'Add gps' },
    ];

    return <Fragment>

        <Overlay card={card} button={ <Button actions={actions}/>}>
            <Frame width={350}  height={600} >

                Day 1

                <Chart width={500}  card={card } refetch={refetch} client={client}/>

            </Frame>
        </Overlay>

    </Fragment>

}
