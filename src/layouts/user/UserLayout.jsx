import React from 'react'

// components
import Header from '@/components/Common/Header'
import Scrollbar from '@/components/Scrollbar';
import Footer from '@/components/Common/Footer';
import Loader from '@/components/Common/Loader';
import { Box } from '@mui/material'

export default function UserLayout({ children }) {
    return (
        <Scrollbar sx={{ maxHeight: '100vh' }}>
            <Loader />
            <Header />
            <Box>{children} </Box>
            <Footer />
        </Scrollbar>
    )
}
