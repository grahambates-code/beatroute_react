import React from "react";
import { Item, AppContainer, Code } from "./components";
import Carousel from "./Carousel";
import MaskModeFrame from "../../../Polaroids/MaskModeFrame";
import * as TransformUtils from "../../../../../../util/transform";

function App() {
    return (
        <AppContainer>

            <Carousel title="Carousel">
                <Item>
                    <MaskModeFrame
                        imgSource="https://unsplash.it/475/405"
                        rotateDeg={TransformUtils.getRandomDeg(0)}
                    />
                </Item>
                <Item>
                    <MaskModeFrame
                        imgSource="https://unsplash.it/476/405"
                        rotateDeg={TransformUtils.getRandomDeg(1)}
                    />
                </Item>
                <Item>
                    <MaskModeFrame
                        imgSource="https://unsplash.it/477/405"
                        rotateDeg={TransformUtils.getRandomDeg(2)}
                    />
                </Item>
                <Item>
                    <MaskModeFrame
                        imgSource="https://unsplash.it/478/405"
                        rotateDeg={TransformUtils.getRandomDeg(3)}
                    />
                </Item>
                <Item>
                    <MaskModeFrame
                        imgSource="https://unsplash.it/479/405"
                        rotateDeg={TransformUtils.getRandomDeg(4)}
                    />
                </Item>
            </Carousel>
        </AppContainer>
    );
}

export default App;
