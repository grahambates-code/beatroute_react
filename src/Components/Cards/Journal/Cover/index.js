import React from 'react'
import Frame from "./../../Common/Frame";
import './index.less'
import {Button} from "../Toolbar/Button";
import Overlay from "../../Common/Overlay";

import DeleteCard from './../Toolbar/DeleteCard'



export default ({card, trip, refetch}) => {

    const actions = [
        { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
    ];

    return <div className={'Front'}>

        <Overlay card={card} button={<Button actions={actions}/>}>
            <Frame width={450} height={600}>
                <h1>Lake District 2021</h1>
                <img style={{width : '300px' , height : 'auto'}} src={'/textures/title.png'}/>
            </Frame>
        </Overlay>
    </div>
}
