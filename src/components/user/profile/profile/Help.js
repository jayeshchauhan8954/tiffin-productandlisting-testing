'use client'
import { Box, Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function Help() {

    const theme = useTheme()

    return (
        <>
            <Container>
                <Grid item xs={12} md={10} sx={{ mt: 3 }}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component="img" src="/assets/icons/whatsapp.svg" sx={{ mr: 1 }} />
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>New Tiffin</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> Begin a self-help journey to find your perfect tiffin.</Typography>
                            </Box>
                        </Stack>
                        <Box component="img" src="/assets/images/arrow-right.svg" />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={10}>
                    <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
                </Grid>

                <Grid item xs={12} md={10}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component="img" src="/assets/icons/chat.svg" sx={{ mr: 1 }} />
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Ongoing Tiffin</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> Get assistance with your current tiffin order(s). </Typography>
                            </Box>
                        </Stack>
                        <Box component="img" src="/assets/images/arrow-right.svg" />
                    </Stack>
                </Grid>
            </Container>
        </>
    )
}
