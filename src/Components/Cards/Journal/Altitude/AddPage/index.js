import React, {Fragment, useState} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, makeStyles } from '@material-ui/core';

const INSERT_PAGE_MUTATION = gql`
    mutation MyMutation($camera: jsonb, $marker: jsonb, $chapter_id: Int!, $text: String!) {
        insert_page(objects: {camera: $camera,marker: $marker, chapter_id: $chapter_id, text: $text}) {
            returning {
                id
            }
        }
    }
`;

const useStyles = makeStyles(() => ({
    paper: {
        minWidth: 400
    }
}))

const AddPage = ({ chapterId, viewState, chapterDataSet, refetch, onClose }) => {
    const classes = useStyles();
    const [text, setText] = useState('');

    return (
        <Dialog 
            open={true} 
            onClose={onClose}
            classes={{
                paper: classes.paper
            }}
            maxWidth="lg"
        >
            <DialogTitle>Add a new page</DialogTitle>
            <DialogContent>
                <Mutation
                    mutation={INSERT_PAGE_MUTATION}
                    variables={{
                        marker : chapterDataSet,
                        camera : viewState,
                        text,
                        chapter_id: chapterId
                    }}
                    onCompleted={() => {
                        refetch();
                        onClose();
                    }}
                >
                    {(submitMutation, { loading, error, data }) => (
                        <>
                            <TextField 
                                variant="outlined"
                                label="Description"
                                multiline={true}
                                rows={2}
                                fullWidth={true}
                                disabled={loading}
                                onChange={(e) => setText(e.target.value)}
                            />
                            {error && (
                                <Box marginTop={2}>
                                    <Typography variant="caption" color="secondary">
                                        {error.message}
                                    </Typography>
                                </Box>
                            )}
                            <Box marginTop={3} marginBottom={2} display="flex" justifyContent="flex-end">
                                <Box marginRight={2}>
                                    <Button variant="text" onClick={onClose}>
                                        Cancel
                                    </Button>
                                </Box>
                                <Button variant="contained" color="primary" disabled={loading || !text} onClick={submitMutation}>
                                    {loading ? 'Adding...' : 'Add'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Mutation>
            </DialogContent>
        </Dialog>
    );
};

export default AddPage;
