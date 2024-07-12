import { Box, ButtonBase, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function FaqDetail({ onBackPress, data }) {
    const theme = useTheme()

    return (
        <>
            <Container>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Typography variant='small1' color={theme.palette.primary.primaryDmain}>Home</Typography>
                            <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 15, px: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryDmain}>Get Help</Typography>
                            <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 15, px: 1 }} />
                            <ButtonBase onClick={onBackPress} >
                                <Typography component={"p"} variant='small1' color={theme.palette.primary.primaryDmain}>FAQs</Typography>
                            </ButtonBase>
                            <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 15, px: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryDmain}>{data?.question} </Typography>
                        </Stack>

                    </Grid>

                    <Grid item xs={12} md={10}>
                        {/* <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>Frequently Asked Questions(FAQs)</Typography> */}
                        <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>{data?.question}</Typography>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryDmain}>
                            <div dangerouslySetInnerHTML={{ __html: data?.answer }}></div>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
