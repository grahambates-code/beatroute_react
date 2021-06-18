import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Box, Button, Typography } from '@material-ui/core';

const INSERT_PAGE_MUTATION = gql`
    mutation MyMutation($camera: jsonb, $chapter_id: Int!, $text: String!) {
        insert_page(objects: {camera: $camera, chapter_id: $chapter_id, text: $text}) {
            returning {
                id
            }
        }
    }
`;

const AddPage = ({ chapterId, text, camera, refetch }) => {
    return (
        <Mutation
            mutation={INSERT_PAGE_MUTATION}
            variables={{
                camera,
                text,
                chapter_id: chapterId
            }}
            onCompleted={() => refetch()}
        >
            {(submitMutation, { loading, error, data }) => (
                <Box>
                    <Button
                        variant="outlined"
                        color="default"
                        onClick={submitMutation}
                        disabled={loading}
                    >
                        {loading ? 'Adding...': 'Add a page'}
                    </Button>

                    {error && (
                        <Box marginTop={2}>
                            <Typography variant="caption" color="secondary">
                                {error.message}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Mutation>
    );
};

export default AddPage;
