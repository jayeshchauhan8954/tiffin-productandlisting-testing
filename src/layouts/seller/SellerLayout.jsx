import Scrollbar from '@/components/Scrollbar'
import React from 'react'
import { Container, styled } from '@mui/material'

let NAV_HEIGHT = 12

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: theme.palette.background.neutral,
}));

export default function SellerLayout({ children }) {
    return (
        <RootStyle>
            <Scrollbar sx={{ maxHeight: '98vh' }}>
                <Container sx={{ marginTop: NAV_HEIGHT }}>{children} </Container>
            </Scrollbar>
        </RootStyle>
    )
}
