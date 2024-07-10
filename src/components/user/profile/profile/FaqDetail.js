import { Box, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function FaqDetail() {
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
                            <Typography variant='small1' color={theme.palette.primary.primaryDmain}>FAQs</Typography>
                            <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 15, px: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryDmain}>How do I place an order with TiffinStash? </Typography>

                        </Stack>

                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>Frequently Asked Questions(FAQs)</Typography>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryDmain}>Explore - TiffinStash lets you browse various tiffin service providers. Use filters to narrow your search by cuisine or seller, and initiate your order once you find a meal you like. </Typography>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryDmain}>Order - Choose your meal type, plan, start date, city and time. Provide delivery instructions, adjust the quantity, and add it to your cart along with any extras or additional tiffins. </Typography>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryDmain}>Checkout - Review your cart and proceed to checkout. If you're not logged in, you'll need to do so or create an account. Enter your delivery address, check the total bill with taxes, and complete payment to place your order.</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
