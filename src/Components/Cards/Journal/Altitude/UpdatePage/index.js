import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import ErrorDialog from '../../../../Dialogs/ErrorDialog';

const UPDATE_PAGE_MUTATION = gql`
  mutation MyMutation($id: Int!, $text: String!) {
    update_page(where: {id: {_eq: $id}}, _set: {text: $text}) {
      returning {
        id
      }
    }
  }
`;


const UpdatePage = ({ page, text, refetch, onCompleted }) => {
    const [error, setError] = useState(null);

    return (
        <Mutation
            mutation={UPDATE_PAGE_MUTATION}
            variables={{ id: page.id, text }}
            onCompleted={() => {
                onCompleted();
            }}
            onError={(error) => setError(error)}
        >
            {(submitMutation, {  loading, data }) => (
              <>
                <Tooltip title="Save page" placement="right-start">
                    <IconButton size="small" color="primary" onClick={submitMutation} disabled={loading}>
                        <CheckCircleOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {error && (
                    <ErrorDialog 
                        title="Error to update page"
                        message={error.message}
                        onClose={() => setError(null)}
                    />
                )}
              </>  
            )}
        </Mutation>
    )
};

export default UpdatePage;