import React, { Component, useState, useRef, useEffect } from 'react';
import Procedural from 'procedural-gl';
import './index.less';

export default (props) => {
    const containerRef = useRef(null);

    const didMountRef = useRef(false);

    const [camera, setCamera] = useState(null);
    const [moved, setMoved] = useState(false);

    useEffect(() => {
        Procedural.init({
            container: containerRef.current,
            datasource: {
                elevation: {
                    apiKey: '1b045ec93f5b94db894037db8d297128e',
                },
                imagery: {
                    urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=cZQg2QaktSnI18BSAxZX',
                    attribution:
                        '<a href="https://www.maptiler.com/copyright/">Maptiler</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                },
            },
        });

        if (props.card?.landscapecamera) {
            Procedural.displayLocation(props.card.landscapecamera);
            //window.setTimeout(() => Procedural.focusOnLocation( props.card.landscapecamera ), 1000);
        }
    }, []);

    useEffect(() => {
        if (props.card && props.card.landscapecamera) {
            Procedural.displayLocation(props.card.landscapecamera);
            window.setTimeout(() => {
                Procedural.focusOnLocation(props.card.landscapecamera);
                setMoved(true);
            }, 3000);
        }

        Procedural.onCameraChange = function (location) {
            setCamera(location);
        };
    }, [props.card?.landscapecamera]);

    return (
        <div>
            <a
                className={'balloon'}
                onClick={() =>
                    props.updateLandscape({
                        variables: {
                            card_id: props.card.id,
                            landscapecamera: camera,
                        },
                    })
                }
            >
                {' '}
                Save camera{' '}
            </a>

            <img className={'balloon'} src={'/textures/balloon.png'} />

            {/*<code>{camera && JSON.stringify(camera.bearing)}</code>*/}

            <div className="map-mode-container">
                <div>
                    <div className="mask-mode">
                        <div>
                            <div ref={containerRef} className={'Procedural'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
