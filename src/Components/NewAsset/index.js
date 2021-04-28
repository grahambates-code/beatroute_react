import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, Input, Box, DialogActions, Button, TextField, Grid } from '@material-ui/core';

const NewAsset = (props) => {
    return (
        <Dialog open={true}>
            <DialogTitle>
                Add New Asset
            </DialogTitle>
            <DialogContent>
                <TextField type="file" variant="outlined" fullWidth={true} size="small" />
                <Box height={300} bgcolor="#eee" marginY={3} />
                <Grid container={true} justify="flex-end">
                    <Button variant="contained" onClick={props.onClose}>
                        Cancel
                    </Button>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

NewAsset.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default NewAsset;