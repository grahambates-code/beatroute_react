import React from 'react'
import Frame from "./../../Common/Frame";
import './index.less'
import {Button} from "../Map/Toolbar/Button";
import Overlay from "../../Common/Overlay";
export default ({card, trip}) => <div className={'Front'}>

                            <Overlay card={card} button={<Button/>}>
                                <Frame width={450} height={600}>
                                    <h1>Lake District 2021</h1>
                                    <img style={{width : '300px' , height : 'auto'}} src={'/textures/title.png'}/>
                                </Frame>
                            </Overlay>
                        </div>
