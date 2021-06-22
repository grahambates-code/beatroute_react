import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

const UpdatePage = ({ page, text, refetch, onSubmit }) => {
    const handleSubmit = () => {
        console.log('text for page', text);
        onSubmit();
    };

    return (
        <Tooltip title="Save page" placement="right-start">
            <IconButton size="small" color="primary" onClick={handleSubmit}>
                <CheckCircleOutlineOutlinedIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    )
};

export default UpdatePage;