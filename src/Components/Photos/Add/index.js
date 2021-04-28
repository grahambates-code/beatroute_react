import React, { useState, useEffect, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './index.less';
import exifr from 'exifr';

const SAVE_PHOTO = gql`
    mutation AddPhoto($objects: [media_insert_input!]!) {
        insert_media(objects: $objects) {
            returning {
                id
            }
        }
    }
`;

function AddPhoto({ card, refetch }) {
    const getUploadParams = ({ file, meta }) => {
        const body = new FormData();
        body.append('file', file);
        body.append('upload_preset', 'ml_default');
        return {
            url: 'https://api.cloudinary.com/v1_1/db8uwhsbg/upload',
            body,
        };
    };

    return (
        <div>
            <Mutation
                onError={() => alert('Could not add photo')}
                onCompleted={() => {
                    refetch && refetch();
                }}
                mutation={SAVE_PHOTO}
            >
                {(addphoto, { loading, error }) => {
                    const handleChangeStatus = (a, status) => {
                        if ('done' === status) {
                            exifr.gps(a.file).then((geo) => {
                                const object = {
                                    type: 'PHOTO',
                                    geo: geo,
                                    data: { ...JSON.parse(a.xhr.response) },
                                };

                                addphoto({
                                    variables: { objects: [object] },
                                }).then(() => {
                                    a.remove();
                                });
                            });
                        }
                    };

                    return (
                        <div className={'PhotoUpload'}>
                            <Dropzone
                                getUploadParams={getUploadParams}
                                onChangeStatus={handleChangeStatus}
                                onSubmit={null}
                                accept="image/*"
                                inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                            />
                        </div>
                    );
                }}
            </Mutation>
        </div>
    );
}

export default AddPhoto;
