import React, {useState, Fragment} from 'react'
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";

import AddGPS from "../AddGPS";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

export default ({refetch, card}) => {

    const [showModal, setModal] = useState(false);

    return <Fragment>

        <Dialog open={showModal} fullWidth={true}>

            <DialogTitle>

                <Toolbar>
                    <Grid container={true} alignItems="center" justify="space-between">
                        <Box display="flex" alignItems="center">
                                <AddGPS close={() => setModal(false)} refetch={refetch} card={card}/>
                        </Box>

                    </Grid>
                </Toolbar>

            </DialogTitle>

            <DialogContent>

                <Grid container={true} justify="flex-end">

                    <Button variant="contained" onClick={() => setModal(false)}>
                        Cancel
                    </Button>

                </Grid>
            </DialogContent>
        </Dialog>

        <AddToPhotosIcon onClick={() => setModal(true)}></AddToPhotosIcon>

    </Fragment>
}
