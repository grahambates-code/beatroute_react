import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SAVE_TABLE = gql`
    mutation($card_id: Int, $camera: jsonb) {
        update_cards(where: { id: { _eq: $card_id } }, _set: { camera: $camera }) {
            returning {
                camera
                id
            }
        }
    }
`;
const SAVE_SLIDE = gql`
    mutation($slide_id: Int, $camera: jsonb, $data: jsonb) {
        update_card_slide(where: { id: { _eq: $slide_id } }, _set: { data: $data, camera: $camera }) {
            returning {
                data
                camera
                id
            }
        }
    }
`;

const SAVE_SLIDE_MEDIA = gql`
    mutation($slidemedia_id: Int, $json: jsonb) {
        update_slide_media(where: { id: { _eq: $slidemedia_id } }, _set: { json: $json }) {
            returning {
                id
            }
        }
    }
`;

const SAVE_MAP = gql`
    mutation($card_id: Int, $map: jsonb) {
        update_cards(where: { id: { _eq: $card_id } }, _set: { map: $map }) {
            returning {
                camera
                id
            }
        }
    }
`;

const SAVE_ANNOTATION = gql`
    mutation($card_id: Int, $annotations: jsonb) {
        update_cards(where: { id: { _eq: $card_id } }, _set: { annotations: $annotations }) {
            returning {
                camera
                id
            }
        }
    }
`;

const SAVE_LANDSCAPE = gql`
    mutation($card_id: Int, $landscapecamera: jsonb) {
        update_cards(where: { id: { _eq: $card_id } }, _set: { landscapecamera: $landscapecamera }) {
            returning {
                camera
                id
            }
        }
    }
`;

export default ({ refetch, children }) => {
    return (
        <div>
            <Mutation onError={() => alert('Could not save slide media')} onCompleted={() => refetch()} mutation={SAVE_SLIDE_MEDIA}>
                {(updateSlideMedia, { loading, error }) => {
                    return (
                        <Mutation onError={() => alert('Could not save slide')} mutation={SAVE_SLIDE}>
                            {(updateSlide, { loading, error }) => {
                                return (
                                    <Mutation onError={() => alert('Could not save map')} mutation={SAVE_MAP}>
                                        {(updateMap, { loading, error }) => {
                                            return (
                                                <Mutation onError={() => alert('Could not save camera')} mutation={SAVE_TABLE}>
                                                    {(updateCamera, { loading, error }) => {
                                                        return (
                                                            <Fragment>
                                                                <Mutation
                                                                    onError={() => alert('Could not save camera')}
                                                                    mutation={SAVE_ANNOTATION}
                                                                    onCompleted={() => refetch()}
                                                                >
                                                                    {(updateAnnotation, { loading, error }) => {
                                                                        return (
                                                                            <Fragment>
                                                                                <Mutation
                                                                                    onError={() => alert('Could not save landscaape')}
                                                                                    mutation={SAVE_LANDSCAPE}
                                                                                    onCompleted={() => refetch()}
                                                                                >
                                                                                    {(updateLandscape, { loading, error }) => {
                                                                                        return (
                                                                                            <Fragment>
                                                                                                {children(
                                                                                                    updateSlide,
                                                                                                    updateCamera,
                                                                                                    updateMap,
                                                                                                    updateAnnotation,
                                                                                                    updateLandscape,
                                                                                                    updateSlideMedia,
                                                                                                    loading,
                                                                                                    error,
                                                                                                )}
                                                                                            </Fragment>
                                                                                        );
                                                                                    }}
                                                                                </Mutation>
                                                                            </Fragment>
                                                                        );
                                                                    }}
                                                                </Mutation>
                                                            </Fragment>
                                                        );
                                                    }}
                                                </Mutation>
                                            );
                                        }}
                                    </Mutation>
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Mutation>
        </div>
    );
};
