import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Box } from '@material-ui/core';

const ErrorDialog = ({ onClose, title, message }) => {
    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle color="secondary" >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Box width="100%" textAlign="center">
                    <Button variant="contained" color="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
};

export default ErrorDialog;