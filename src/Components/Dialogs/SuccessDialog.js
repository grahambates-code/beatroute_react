import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core';

const SuccessDialog = ({ onClose, title, message }) => {
    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default SuccessDialog;