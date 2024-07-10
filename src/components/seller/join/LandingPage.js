'use client'
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { fontName } from '@/utils/fonts/Font';
import Faq from './SellerBanner/faq';
import SellerForm from './SellerBanner/SellerForm';
import FullWidthTabs from './SellerBanner/SellerTabs';
import Footer from '@/components/Common/Footer';

export default function LandingPage() {
    const theme = useTheme()

    return (
        <>
            <Box sx={{
                width: '100%',
                height: {
                    xs: 'auto',
                    // md: '95vh',
                },
                position: 'relative',
                backgroundImage: 'url(/assets/images/dashboard.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: 5,
            }}>
                <Container>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={12} md={7}>
                            <Box component="img" src="/assets/logo/tiffin-logo.png" sx={{ height: 40 }} />
                            <Typography component={"p"} variant='heading3' color={theme.palette.primary.contrastText}>PARTNER WITH TIFFINSTASH</Typography>
                            <Typography component={"p"} variant='heading1' fontSize={50} color={theme.palette.primary.contrastText}>Grow your tiffin business online</Typography>
                            <Box component="img" src="/assets/images/time-line.png" />
                        </Grid>

                        <Grid item xs={12} md={5} sx={{ mt: { xs: 0, md: 3 } }}>
                            <SellerForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Part 1 ----------------------------- */}

            <Box sx={{
                background: 'hsla(22, 100%, 98%, 1)',
                py: 6
            }}>
                <Container>
                    <Grid container spacing={2} sx={{ alignItems: 'center', }}>
                        <Grid item xs={12} md={12} textAlign={"center"} sx={{ py: { xs: 2, md: 5, } }}>
                            <Typography fontSize={24} variant='title' sx={{ textAlign: 'center' }}>Sellers in Canada are growing with TiffinStash</Typography>
                        </Grid>

                        <Grid item xs={12} md={10} sx={{ margin: "auto" }}>
                            <Box sx={{
                                display: 'flex', justifyContent: 'space-between', overflowX: {
                                    xs: 'auto',
                                    md: 'hidden',
                                },
                                flexWrap: {
                                    xs: 'nowrap',
                                    md: 'wrap',
                                },
                            }}>
                                {[1, 2, 3, 4, 5].map((item, index) => (
                                    <Box sx={{
                                        backgroundColor: 'primary.contrastText',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mx: { xs: 2, md: 3, },
                                        height: 111,
                                        width: 111,
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                    }}>
                                        <Box component="img" src="/assets/logo/tiffin-logo.png" sx={{ height: 40 }} />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Part 2 --------------------------- */}

            <Container>
                <Grid container spacing={2} sx={{ alignItems: 'center', mt: 4 }}>
                    <Grid item xs={12} md={12} textAlign={"center"} sx={{ py: { xs: 1, md: 2 } }}>
                        <Typography fontSize={24} variant='title' sx={{ textAlign: 'center' }}>Choose the right service for your business</Typography>
                    </Grid>
                </Grid>
            </Container>
            <FullWidthTabs />


            {/* Part 3 -------------------------------------- */}

            <Box sx={{
                background: 'hsla(22, 100%, 98%, 1)',
                py: 6
            }}>
                <Container>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={12} md={12} textAlign={"center"} sx={{ py: { xs: 2, md: 2 } }} >
                            <Typography fontSize={24} variant='title'>Sellers in Canada are growing with TiffinStash</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <ul style={{ margin: 0, paddingLeft: "20px", alignItems: 'center', }}>
                                <li style={{ color: "hsla(229, 8%, 27%, 1)", fontWeight: 400, fontFamily: fontName.PoppinsRegular, fontSize: "15px !impostant" }}>
                                    <span style={{ fontFamily: fontName.PoppinsBold, fontWeight: 700, }}>One-Stop Shop :</span> One-Stop Shop : Our seller portal is 360 solution for seamless management of your partnership. </li>

                                <li style={{ color: "hsla(229, 8%, 27%, 1)", marginTop: "35px", fontWeight: 400, fontFamily: fontName.PoppinsRegular, fontSize: "15px !impostant" }}>
                                    <span style={{ fontFamily: fontName.PoppinsBold, fontWeight: 700, }}>Effortless Management</span>  Manage listings, track orders, view payouts, and more – all through our user- web and mobile app </li>

                                <li style={{ color: "hsla(229, 8%, 27%, 1)", marginTop: "35px", fontWeight: 400, fontFamily: fontName.PoppinsRegular, fontSize: "15px !impostant" }}>
                                    <span style={{ fontFamily: fontName.PoppinsBold, fontWeight: 700, }}>Streamlined Operations</span> Manage On-Request Delivery orders and track your customer’s deliveries—all from one convenient platform. </li>
                            </ul>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box component={'img'} sx={{ width: "100%" }} src="/assets/images/manage.png" alt="Wider Reach" />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Part 4--------------------------------------- */}

            <Faq />
            <Footer />
        </>
    )
}
