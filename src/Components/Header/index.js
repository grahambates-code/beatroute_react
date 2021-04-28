import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import NewAsset from '../NewAsset';

const Header = (props) => {
    const [assetOpen, setAssetOpen] = useState(false);

    return (
        <AppBar position="sticky" color="primary" elevation={4}>
            <Toolbar>
                <Grid container={true} alignItems="center" justify="space-between">
                    <Typography variant="h4" color="inherit">
                        {props.title}
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={() => setAssetOpen(true)}>
                        Add new asset
                    </Button>
                </Grid>
            </Toolbar>
            {assetOpen && (
                <NewAsset onClose={() => setAssetOpen(false)} />
            )}
        </AppBar>
    );
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header;