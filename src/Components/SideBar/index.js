import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 250
    }
}))

const SideBar = ({ open, onClose }) => {
    const classes = useStyles();

    const handleClickItem = () => {
        onClose();
    };

    return (
        <Drawer
            open={open}
            anchor="left"
            onClose={onClose}
        >
            <List className={classes.root}>
                <ListItem button={true} onClick={handleClickItem}>
                    <ListItemIcon>
                        <AssessmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItem>
                <ListItem button={true} onClick={handleClickItem}>
                    <ListItemIcon>
                        <AccountCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItem>
            </List>
        </Drawer>
    );
};

SideBar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SideBar;

