import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NewAsset from '../NewAsset';
import SideBar from '../SideBar';

const Header = (props) => {
    const [assetOpen, setAssetOpen] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <AppBar position="sticky" color="primary" elevation={4}>
            <Toolbar>
                <Grid container={true} alignItems="center" justify="space-between">
                    <Box display="flex" alignItems="center">
                        <Box marginRight={1}>
                            <IconButton color="inherit" onClick={() => setSideBarOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="h4" color="inherit">
                            {props.title}
                        </Typography>
                    </Box>
                    <Button variant="outlined" color="inherit" onClick={() => setAssetOpen(true)}>
                        Add new asset
                    </Button>
                </Grid>
            </Toolbar>
            
            {assetOpen && (
                <NewAsset onClose={() => setAssetOpen(false)} />
            )}

            <SideBar open={sideBarOpen} onClose={() => setSideBarOpen(false)} />
        </AppBar>
    );
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header;