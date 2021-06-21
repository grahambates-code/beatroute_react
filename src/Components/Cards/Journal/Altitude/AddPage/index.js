import React, {Fragment} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {Box, Button, IconButton, Tooltip, Typography} from '@material-ui/core';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const INSERT_PAGE_MUTATION = gql`
    mutation MyMutation($camera: jsonb, $marker: jsonb, $chapter_id: Int!, $text: String!) {
        insert_page(objects: {camera: $camera,marker: $marker, chapter_id: $chapter_id, text: $text}) {
            returning {
                id
            }
        }
    }
`;

const AddPage = ({ chapterId, text, viewState, chapterDataSet, refetch }) => {
    return (
        <Mutation
            mutation={INSERT_PAGE_MUTATION}
            variables={{
                marker : chapterDataSet,
                camera : viewState,
                text,
                chapter_id: chapterId
            }}
            onCompleted={() => refetch()}
        >
            {(submitMutation, { loading, error, data }) => (
                <Fragment>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={submitMutation}
                        disabled={loading}
                    >
                        <AddCircleOutlineIcon fontSize="small" />
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
