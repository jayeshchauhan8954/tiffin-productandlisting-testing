import React from 'react'

// Redux
import { useSelector } from 'react-redux'
import { isLoad } from '@/redux/selectors/appSelectors'
import { Box, CircularProgress } from '@mui/material'

export default function Loader() {
    const isLoading = useSelector(isLoad)

    if (!isLoading) return <></>
    return (
        <Box sx={{
            display: "flex",
            justifyContent: 'center',
            alignItems:'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height:'100%',
            zIndex: 1,
            border:'1px solid red'
        }}>
            <CircularProgress size={40} />
        </Box>
    )
}

