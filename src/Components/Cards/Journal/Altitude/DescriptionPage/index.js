import React, { useRef, useState } from 'react';
import { Box, IconButton, TextField } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeletePage from '../DeletePage';
import UpdatePage from '../UpdatePage';
import './index.less';

const DescriptionPage = ({ page, refetch }) => {
    const [isEditting, setIsEditting] = useState(false);
    const textRef = useRef(null);

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
                            ref={textRef}
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
                        <UpdatePage 
                            page={page}
                            refetch={refetch}
                            onSubmit={() => {
                                setIsEditting(false);
                            }}
                            text={textRef.current ? textRef.current.value : page.text}
                        />
                    )}
                    <DeletePage pageId={page.id} refetch={refetch} />
                </Box>
            </Box>
        </div>
    );
};

export default DescriptionPage;