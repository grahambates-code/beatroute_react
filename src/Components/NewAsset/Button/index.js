import React, {useState, useEffect, Fragment} from 'react';
import gql from "graphql-tag";
import {Mutation} from "react-apollo";

import 'react-dropzone-uploader/dist/styles.css'
import {Button, Grid} from "@material-ui/core";

const SAVE_PHOTO = gql`
  mutation AddPhoto($objects: [media_insert_input!]!) {

  insert_media(objects: $objects) {
    returning {
      id
    }
  }
}

`;

function AddPhoto({path, thumbnail, close, refetch}) {

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }

    const upload = (thumbnail) => {

        const file = DataURIToBlob(thumbnail);

        const body = new FormData()
        body.append('file', file)
        body.append('upload_preset', "ml_default")

        return fetch("https://api.cloudinary.com/v1_1/db8uwhsbg/upload",
            {
                body: body,
                method: "post"
            });

    }

    return (

        <div>

            <Mutation
                onError={() => alert( 'Could not add photo')}
                onCompleted={()=> {refetch && refetch()}}
                mutation={SAVE_PHOTO}
            >

                {(addphoto, {loading, error}) => {

                    const doIt = async () => {

                        let response = await upload(thumbnail);
                        let data     = await response.json();

                        addphoto({variables : {objects :  [{type : 'THUMBNAIL', json : {...data, path}}]}}).then(close);

                    }

                    return  <Button variant="contained" onClick={() => doIt()}>
                                    Save
                            </Button>

                }}
            </Mutation>

        </div>

    );
}

export default AddPhoto;

