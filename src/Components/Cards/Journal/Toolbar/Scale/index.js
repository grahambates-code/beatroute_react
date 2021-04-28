import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../index.less';
import { Slider } from 'antd';

const ADD = gql`
    mutation MyMutation($id: Int, $scale: numeric) {
        update_asset(where: { id: { _eq: $id } }, _set: { scale: $scale }) {
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
                variables={{ id: selectedAsset.id, scale: selectedAsset.scale }}
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
                            min={0}
                            max={10000}
                            value={selectedAsset.scale}
                            onChange={(e) => setSelectedAsset({ ...selectedAsset, scale: e })}
                        />
                    );
                }}
            </Mutation>
        </div>
    );
};
