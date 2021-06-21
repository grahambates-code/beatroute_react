import React, {Fragment} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {Box, Button, IconButton, Tooltip, Typography} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const DELETE_PAGE_MUTATION = gql`
   mutation MyMutation($pageId : Int) {
      delete_page(where: {id: {_eq: $pageId}}) {
        returning {
          id
        }
      }
}
`;

const AddPage = ({ pageId, refetch }) => {
    return (
        <Mutation
            mutation={DELETE_PAGE_MUTATION}
            variables={{
                pageId
            }}
            onCompleted={() => refetch()}
        >
            {(submitMutation, { loading, error, data }) => (
                <Fragment>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => {alert(1);submitMutation()}}
                        disabled={loading}
                    >
                        <DeleteForeverIcon fontSize="small" />
                    </IconButton>

                    {error && (
                        <Box marginTop={2}>
                            <Typography variant="caption" color="secondary">
                                {error.message}
                            </Typography>
                        </Box>
                    )}
                </Fragment>

            )}
        </Mutation>
    );
};

export default AddPage;
