import React from 'react'
import Frame from "./../../Common/Frame";
import './index.less'
import {Button} from "../Map/Toolbar/Button";
import MapOverlay from "../../Common/Overlay";
export default ({trip}) => <div className={'Front'}>

                            <MapOverlay button={<Button/>}>
                                <Frame width={450} height={600}>
                                    <h1>Lake District 2021</h1>
                                    <img style={{width : '300px' , height : 'auto'}} src={'/textures/title.png'}/>
                                </Frame>
                            </MapOverlay>
                        </div>
