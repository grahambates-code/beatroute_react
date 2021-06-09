import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Box, Typography, IconButton, GridList, GridListTile, GridListTileBar, makeStyles, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useLayoutEffect } from 'react';

const PhotoList = [
    { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO56VO_tG3QyV0QIV4xhx9MNlOlRGvsm6B1w&usqp=CAU' },
    { id: 2, src: 'https://mediadesknm.com/wp-content/uploads/2018/09/photographer-698908_960_720.jpg' },
    { id: 3, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO56VO_tG3QyV0QIV4xhx9MNlOlRGvsm6B1w&usqp=CAU' },
    { id: 4, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO56VO_tG3QyV0QIV4xhx9MNlOlRGvsm6B1w&usqp=CAU' },
    { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO56VO_tG3QyV0QIV4xhx9MNlOlRGvsm6B1w&usqp=CAU' },
    { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO56VO_tG3QyV0QIV4xhx9MNlOlRGvsm6B1w&usqp=CAU' },
];

const useStyles = makeStyles(theme => ({
    listTitle: {
        cursor: 'pointer',
        transition: 'all 0.2s linear',
        '&:hover': {
            opacity: 0.5,
        }
    }
}));

const PhotoSelectSideBar = ({ open, onClose }) => {
    const classes = useStyles();
    const [selectedPhotos, setSelectedPhotos] = useState({});
    const [opened, setOpened] = useState(false);
    const [unmouted, setUnmounted] = useState(false);

    useLayoutEffect(() => {
        if (open) {
            setUnmounted(false);
            setTimeout(() => setOpened(true), 150);
        } else {
            setOpened(false);
            setTimeout(() => setUnmounted(true), 250);
        }
    }, [open]);

    const handleSelectPhoto = (photoItem) => () => {
        setSelectedPhotos(prev => {
            const newSelectedPhotos = { ...prev };
            const isSelected = !!newSelectedPhotos[photoItem.id];

            if (isSelected) {
                delete newSelectedPhotos[photoItem.id];
            } else {
                newSelectedPhotos[photoItem.id] = photoItem;
            }

            
            return newSelectedPhotos;
        });
    };

    const handleSaveSelectedPhoto = () => {
        alert(`Selected photo ids: ${Object.keys(selectedPhotos)}`);
    };

    if (unmouted) {
        return null;
    }

    return (
        <Drawer
            anchor="left"
            open={opened}
            transitionDuration={250}
            onClose={onClose}
        >
            <Box 
                display="flex" 
                flexDirection="column" 
                width="75vw" 
                height="100%"
                padding={3}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">
                        Select Photos
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CancelIcon />
                    </IconButton>
                </Box>
                <Box marginY={3} maxHeight="100%" flex="1" overflow="scroll">
                    <GridList cellHeight={180} cols={3}>
                        {PhotoList.map((photoItem, index) => (
                            <GridListTile className={classes.listTitle} key={index} onClick={handleSelectPhoto(photoItem)}>
                                <img src={photoItem.src} alt="photos" />
                                <GridListTileBar
                                    title={'Photo ID' + photoItem.id}
                                    actionIcon={
                                        selectedPhotos[photoItem.id] ? (
                                            <IconButton color="primary">
                                                <CheckCircleIcon />
                                            </IconButton>
                                        ) : null
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" onClick={handleSaveSelectedPhoto}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

PhotoSelectSideBar.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

export default PhotoSelectSideBar;
