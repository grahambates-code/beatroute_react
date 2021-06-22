import React, { useState } from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import DeletePage from '../DeletePage';
import './index.less';

const DescriptionPage = ({ page, refetch }) => {
    const [isEditting, setIsEditting] = useState(false);
    return (
        <div className="description-page">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box flex={1}>
                    {!isEditting && (
                        <h6>
                            {page.id} - {page.text}
                        </h6>
                    )}
                    {isEditting && (
                        <TextField 
                            multiline={true}
                            rows={2}
                            defaultValue={page.text}
                            fullWidth={true}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>
                <Box className="description-page-actions">
                    {!isEditting && (
                        <IconButton size="small" onClick={() => setIsEditting(true)}>
                            <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                    )}
                    {isEditting && (
                        <IconButton color="primary" size="small" onClick={() => setIsEditting(false)}>
                            <CheckCircleOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                    )}
                    <DeletePage pageId={page.id} refetch={refetch} />
                </Box>
            </Box>
        </div>
    );
};

export default DescriptionPage;