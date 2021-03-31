import React from 'react'
import Frame from "./../../Common/Frame";
import './index.less'
export default ({trip}) => <div className={'Front'}>
                            <Frame width={450} height={600}>
                                <h1>Lake District 2021</h1>
                                <img style={{width : '300px' , height : 'auto'}} src={'/textures/title.png'}/>
                            </Frame>
                        </div>
