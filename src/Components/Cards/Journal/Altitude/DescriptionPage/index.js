import React, { useRef, useState } from 'react';
import { Box, IconButton, TextField, Tooltip } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeletePage from '../DeletePage';
import UpdatePage from '../UpdatePage';
import './index.less';

const DescriptionPage = ({ page, refetch }) => {
    const [isEditting, setIsEditting] = useState(false);
    const [text, setText] = useState(page.text);

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
                            value={text}
                            fullWidth={true}
                            autoFocus={true}
                            size="small"
                            variant="outlined"
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key.toLowerCase() === 'escape') {
                                    setText(page.text);
                                    setIsEditting(false);
                                }
                            }}
                        />
                    )}
                </Box>
                <Box className="description-page-actions">
                    {!isEditting && (
                        <Tooltip title="Edit page" placement="right-end">
                            <IconButton size="small" onClick={() => setIsEditting(true)}>
                                <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {isEditting && (
                        <UpdatePage 
                            page={page}
                            refetch={refetch}
                            onCompleted={() => {
                                setIsEditting(false);
                                refetch();
                            }}
                            text={text}
                        />
                    )}
                    <DeletePage pageId={page.id} refetch={refetch} />
                </Box>
            </Box>
        </div>
    );
};

export default DescriptionPage;