import React, {Fragment} from 'react'
import AddGPS from './AddGPS'
import Chart from './Chart'
import Overlay from "../../Common/Overlay";
import {Button} from "../Toolbar/Button";
import DeleteCard from "../Toolbar/DeleteCard";
import AddAsset from "../Toolbar/AddAsset";
import Frame from "../../Common/Frame";

export default ({card, refetch}) => {
    const actions = [
        { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
        { icon: <AddGPS refetch={refetch} card={card}/>, name: 'Add gps' },
    ];

    return <Fragment>

        <Overlay card={card} button={ <Button actions={actions}/>}>
            <Frame width={350}  height={600} >
                NO GPS DATA ADDED YET
            </Frame>
        </Overlay>

    </Fragment>

}
