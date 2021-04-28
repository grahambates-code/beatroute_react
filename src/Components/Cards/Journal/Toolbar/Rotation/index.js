import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../index.less';
import { Slider } from 'antd';

const ADD = gql`
    mutation MyMutation($id: Int, $rotation: numeric) {
        update_asset(where: { id: { _eq: $id } }, _set: { rotation: $rotation }) {
            returning {
                id
            }
        }
    }
`;

export default ({ setSelectedAsset, selectedAsset, refetch }) => {
    return (
        <div>
            <Mutation
                onError={() => alert('Could not update asset')}
                mutation={ADD}
                variables={{
                    id: selectedAsset.id,
                    rotation: selectedAsset.rotation,
                }}
                onCompleted={() => {
                    refetch && refetch();
                }}
            >
                {(update, { loading, error }) => {
                    return (
                        <Slider
                            onAfterChange={() => {
                                update();
                            }}
                            min={-90}
                            max={90}
                            value={selectedAsset.rotation}
                            onChange={(e) =>
                                setSelectedAsset({
                                    ...selectedAsset,
                                    rotation: e,
                                })
                            }
                        />
                    );
                }}
            </Mutation>
        </div>
    );
};
