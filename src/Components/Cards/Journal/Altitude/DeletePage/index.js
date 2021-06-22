import React, {Fragment, useState} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {Box, Button, IconButton, Tooltip } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ErrorDialog from '../../../../Dialogs/ErrorDialog';

const DELETE_PAGE_MUTATION = gql`
   mutation MyMutation($pageId : Int) {
      delete_page(where: {id: {_eq: $pageId}}) {
        returning {
          id
        }
      }
}
`;

const DeletePage = ({ pageId, refetch }) => {
    const [error, setError] = useState(null);

    return (
        <Mutation
            mutation={DELETE_PAGE_MUTATION}
            variables={{
                pageId
            }}
            onCompleted={() => refetch()}
            onError={(error) => setError(error)}
        >
            {(submitMutation, { loading, data }) => (
                <Fragment>
                    <Tooltip title="Delete page" placement="right-start">
                        <IconButton
                            size="small"
                            onClick={() => {
                                submitMutation();
                            }}
                            disabled={loading}
                        >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {error && (
                        <ErrorDialog 
                            title="Page Error"
                            message={error.message}
                            onClose={() => setError(null)}
                        />
                    )}
                </Fragment>
            )}
        </Mutation>
    );
};

export default DeletePage;
