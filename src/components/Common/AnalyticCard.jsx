import React from 'react'

// mui
import { Box, Stack, Typography, styled, useTheme } from '@mui/material'

// Icons
import ArticleIcon from '@mui/icons-material/ArticleOutlined';

// Style
const RootStyle = styled('div')(({ theme }) => ({
    background: theme.palette.background.default,
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
    borderRadius: 10,
}));

const Dot = styled('div')(({ theme }) => ({
    borderRadius: 10,
    height: 12,
    width: 12,
}));

export default function AnalyticCard({ count, version = 1, title = "" }) {
    const theme = useTheme()

    const getBG = () => {
        switch (version) {
            case 1:
                return theme.palette.custom.card1
            case 2:
                return theme.palette.custom.card2
            case 3:
                return theme.palette.custom.card3
            case 4:
                return theme.palette.custom.card4
            case 5:
                return theme.palette.custom.card5
        }
    }

    const getShadow = () => {
        switch (version) {
            case 1:
                return `drop-shadow(0px 0px 10px ${theme.palette.custom.card1})`
            case 2:
                return `drop-shadow(0px 0px 10px ${theme.palette.custom.card2})`
            case 3:
                return `drop-shadow(0px 0px 10px ${theme.palette.custom.card3})`
            case 4:
                return `drop-shadow(0px 0px 10px ${theme.palette.custom.card4})`
            case 5:
                return `drop-shadow(0px 0px 10px ${theme.palette.custom.card5})`
        }
    }

    return (
        <RootStyle>
            <Stack direction={'row'} gap={2} sx={{ height: '100%' }}>
                <Box sx={{
                    p: 0.5,
                    width: 40,
                    backgroundColor: getBG(),
                    borderRadius: '10px 0 0 10px',
                }}>
                    <ArticleIcon sx={{ color: theme.palette.common.white }} />
                </Box>
                <Stack spacing={2} p={1}>
                    <Typography variant='h3'>{count}</Typography>
                    <Stack direction={'row'} display={'flex'} alignItems={'center'} spacing={2}>
                        <Dot sx={{ filter: getShadow(), backgroundColor: getBG() }} />
                        <Typography variant='subtitle2'>{title}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </RootStyle>
    )
}
