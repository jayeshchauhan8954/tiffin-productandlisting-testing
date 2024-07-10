import Scrollbar from '@/components/Scrollbar'
import React from 'react'
import Navbar from './Navbar'
import { Box } from '@mui/material'

export default function OnboardLayout({ children }) {
    return (
        <Scrollbar sx={{ maxHeight: '100vh' }}>
            <Box>{children} </Box>
        </Scrollbar>
    )
}
