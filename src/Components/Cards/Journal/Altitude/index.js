import React, {Fragment} from 'react'
import AddGPS from './AddGPS'
import AddGPS2 from './AddGPS2'
import Overlay from "../../Common/Overlay";
import {Button} from "../Toolbar/Button";
import DeleteCard from "../Toolbar/DeleteCard";
import Frame from "../../Common/Frame";
import Chart from './TopScrollGraphic';

export default ({card, refetch}) => {
    const actions = [
        { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
        { icon: <AddGPS2 refetch={refetch} card={card}/>, name: 'Add gps' },
    ];

    return <Fragment>

        <Overlay card={card} button={ <Button actions={actions}/>}>
            <Frame width={350}  height={600} >

                <Chart card={card }/>

            </Frame>
        </Overlay>

    </Fragment>

}
