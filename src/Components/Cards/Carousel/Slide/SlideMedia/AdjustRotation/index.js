import {Popover, Button, Slider} from 'antd';
import React from "react";

export default ({setLocked, slidePhotoRotation, setSlidePhotoRotation}) => {

    const content = (
        <div>
            <Slider min={-90} max={90} defaultValue={0} onChange={(e) => setSlidePhotoRotation({...slidePhotoRotation, rotation : e})} />
            <Slider min={0} max={500} defaultValue={10} onChange={(e) => setSlidePhotoRotation({...slidePhotoRotation, scale : e})} />
        </div>
    );

    return <div>
        <Popover content={content} title="Title" trigger="click" >
            <Button onClick={() => setLocked(true)}>Click me</Button>
        </Popover>
    </div>

}
