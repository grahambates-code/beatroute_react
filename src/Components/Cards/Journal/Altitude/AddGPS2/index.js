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

export default ({refetch, card}) => {

    const [showModal, setModal] = useState(false);

    return <Fragment>

        <Dialog open={showModal} fullWidth={true}>

            <DialogTitle>

                <Toolbar>
                    <Grid container={true} alignItems="center" justify="space-between">
                        <Box display="flex" alignItems="center">

                            <Box marginRight={1}>
                                <AddGPS refetch={refetch} card={card}/>
                            </Box>

                            <Typography variant="h4" color="inherit">
                              Add
                            </Typography>
                        </Box>

                    </Grid>
                </Toolbar>

            </DialogTitle>

            <DialogContent>

                <Grid container={true} justify="flex-end">

                    <Button variant="contained">
                        Cancel
                    </Button>

                </Grid>
            </DialogContent>
        </Dialog>

        <Button variant="outlined" color="inherit" onClick={() => setModal(true)}>
            Add gps
        </Button>

    </Fragment>
}
