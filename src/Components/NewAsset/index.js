import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, Input, Box, DialogActions, Button, TextField, Grid, GridSpacing } from '@material-ui/core';
import Preview from './Preview'
import Add from './Button'

const NewAsset = (props) => {

    const [path, setPath]           = useState(null);
    const [name, setName]           = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

   // console.log(thumbnail);

    return (
        <Dialog open={false}>

            <DialogTitle>
                Add New Asset
            </DialogTitle>

            <DialogContent>

                <TextField label={'Name'} value={name} onChange={(e) => setName(e.target.value)} type="text" variant="outlined" fullWidth={true} size="small" />

                <br/>
                <br/>

                <TextField label={'Path'} value={path} onChange={(e) => setPath(e.target.value)} type="text" variant="outlined" fullWidth={true} size="small" />

                {path && path.includes('.glb') && <Preview path={path} setThumbnail={setThumbnail}/> }

                <Grid container={true} justify="flex-end">
                    <Button variant="contained" onClick={props.onClose}>
                        Cancel
                    </Button>

                    <Add path={path} thumbnail={thumbnail} close={props.onClose}/>

                </Grid>
            </DialogContent>
        </Dialog>
    );
};

NewAsset.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default NewAsset;
