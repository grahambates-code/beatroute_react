import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import AssignPhotoToSlide from '../AssignPhotoToSlide';

const GETMEDIA = gql`
    {
        media {
            id
            json
            location
        }
    }
`;

const App = ({ slide, closeModal, pointB }) => {
    return (
        <div>
            <Query query={GETMEDIA}>
                {({ loading, error, data, refetch }) => {
                    if (loading || !data) return null;

                    return (
                        <Fragment>
                            <ul>
                                {data.media.map((m) => (
                                    <li>
                                        <img
                                            style={{
                                                height: '140px',
                                                width: 'auto',
                                            }}
                                            src={m.json.url}
                                        />
                                        <AssignPhotoToSlide media={m} slide={slide} closeModal={closeModal} pointB={pointB} />
                                    </li>
                                ))}
                            </ul>
                        </Fragment>
                    );
                }}
            </Query>
        </div>
    );
};

export default App;
