import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack, Tooltip } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

export default function LoadMore({ children, page = 1, limit = 10, count = 0, load = false, onLoad = () => { } }) {
    if (!count || count === 0 || (page * limit >= count)) return null;
    return (
        <Stack gap={1} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ mt: 2 }}>
            <Tooltip title="load more">
                <LoadingButton size={"small"} loading={load} onClick={onLoad}>
                    <CachedIcon fontSize='medium' />
                </LoadingButton>
            </Tooltip>
            {children}
        </Stack>
    )
}
