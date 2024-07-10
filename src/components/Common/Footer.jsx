import { _routes } from '@/utils/endPoints/routes'
import { Box, Button, Container, Divider, Grid, Stack, TextField, Link, Typography, useTheme } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'

export default function Footer() {

    const theme = useTheme()

    return (
        <>
            <Box sx={{ backgroundColor: theme.palette.primary.primaryDmain, color: theme.palette.primary.contrastText, py: 5 }}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Box sx={{ mb: 2 }} component={"img"} src="/assets/images/logo-white.png" alt="Orders" />
                            <Typography component={"p"} variant="footerTxt" color={theme.palette.primary.contrastText}>
                                TiffinStash is an e-commerce marketplace platform for tiffin services in Canada. Customers can easily order a single tiffin or subscribe to weekly or monthly tiffin plans from curated tiffin sellers on the platform. TiffinStash ensures everyday delivery of freshly prepared tiffins. Sellers can expand their reach and grow their business by listing their tiffin services on the marketplace.
                            </Typography>

                            <Grid item xs={12} md={12}>
                                <Box sx={{ display: "flex", alignItems: "center", marginTop: { sm: 12, xs: 3 } }}>
                                    <Link sx={{ mr: 3 }} href="#">
                                        <Box component={'img'} sx={{ width: "100%" }} src="/assets/images/google.png" />
                                    </Link>
                                    <Link href="#">
                                        <Box component={'img'} sx={{ width: "100%" }} src="/assets/images/apple.png" />
                                    </Link>
                                </Box>

                                <Link href="#" color={theme.palette.primary.contrastText}>
                                    <Stack direction={"row"} alignItems={"center"} sx={{ mt: 3 }}>
                                        <Typography variant='heading3' color={theme.palette.primary.contrastText} >Invite Friends, Get 5% Discount</Typography>
                                        <Box component={"img"} src="/assets/images/arrow-right.png" alt="Orders" sx={{ ml: 1 }} />
                                    </Stack>
                                </Link>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Grid sx={{ mb: 2 }} container spacing={2}>
                                <Grid item xs={4} md={4}>
                                    <Typography variant="title" fontSize={24} color={theme.palette.primary.contrastText} gutterBottom>
                                        QUICK LINKS
                                    </Typography>

                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service near me</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Get help</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Sign up to deliver</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Customer FAQs</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Career</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Rewards</Link>
                                </Grid>

                                <Grid item xs={4} md={4}>
                                    <Typography variant="title" fontSize={24} color={theme.palette.primary.contrastText} gutterBottom>
                                        Delivery Areas
                                    </Typography>

                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service in Brampton</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service in Brampton</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service in Brampton</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service in Brampton</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service in Brampton</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service in Brampton</Link>
                                </Grid>

                                <Grid item xs={4} md={4}>
                                    <Typography variant="title" fontSize={24} color={theme.palette.primary.contrastText} gutterBottom>
                                        Delivery Areas
                                    </Typography>

                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Tiffin service near me</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Get help</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Sign up to deliver</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Customer FAQs</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Career</Link>
                                    <Link sx={{ fontSize: "14px !important", lineHeight: 3, }} color={theme.palette.primary.contrastText} href="#" underline="none" display="block">Rewards</Link>
                                </Grid>

                                {/* News Letter ------------- */}

                                <Grid item xs={12} md={12} sx={{ mt: 1 }}>
                                    <Typography variant='heading3' color={theme.palette.primary.contrastText}>Newsletter</Typography>

                                    <Stack sx={{ mt: 2 }} direction={"row"} alignItems={"center"}>
                                        <TextField variant="outlined" placeholder="Email address" sx={{ ...useStyles.textField, width: { xs: "100%", md: "48%" } }} />
                                        <Button variant="contained" color="primary" sx={{ height: 56, borderRadius: 0, borderTopRightRadius: 8, borderBottomRightRadius: 8 }} >Subscribe</Button>
                                    </Stack>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 1, borderColor: theme.palette.primary.footerDark }} />
                        </Grid>

                        <Grid item xs={12} md={8} sx={{ textAlign: { xs: "center", md: "left", } }}>
                            <Stack flexDirection={"row"} divider={<Divider orientation="vertical" flexItem sx={{ mx: 1 }} />}>
                                <Typography component={NextLink} NextLink href={_routes.legalPages.termsConditions} color={theme.palette.primary.contrastText} variant="cardHeading"> Terms Of Service </Typography>
                                <Typography component={NextLink} href={_routes.legalPages.privacy} color={theme.palette.primary.contrastText} variant="cardHeading"> Privacy Policy  </Typography>
                                <Typography component={NextLink} href={_routes.legalPages.deleteAccount} color={theme.palette.primary.contrastText} variant="cardHeading"> Account Delete  </Typography>
                                <Typography color={theme.palette.primary.contrastText} variant="cardHeading"> Subscription Policy  </Typography>
                                <Typography color={theme.palette.primary.contrastText} variant="cardHeading"> Delivery Policy  </Typography>
                                <Typography color={theme.palette.primary.contrastText} variant="cardHeading"> Refunds and Cancelation Policy  </Typography>
                                <Typography color={theme.palette.primary.contrastText} variant="cardHeading"> Rewards  </Typography>

                            </Stack>
                            {/* <Typography color={theme.palette.primary.contrastText} variant="cardHeading">
                                Terms Of Service | Privacy Policy | Subscription Policy | Delivery Policy | Refunds and Cancelation Policy | Rewards
                            </Typography> */}
                        </Grid>

                        <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right", } }}>
                            <Box sx={{ display: 'flex', justifyContent: { sm: "end", xs: "center" } }}>
                                <Link href="#" sx={{ mr: 2 }}><img src="/assets/images/facebook.png" alt="facebook" /></Link>
                                <Link href="#" sx={{ mr: 2 }}><img src="/assets/images/insta.png" alt="Instagram" /></Link>
                                <Link href="#" sx={{ mr: 2 }}><img src="/assets/images/youtube.png" alt="Instagram" /></Link>
                                <Link href="#" sx={{ mr: 2 }}><img src="/assets/images/linked.png" alt="linked" /></Link>
                                <Link href="#"><img src="/assets/images/whatapp.png" alt="whatsapp" /></Link>
                            </Box>
                            <Typography variant="cardHeading" sx={{ marginRight: { xs: "0", md: "72px" }, mt: 1 }} >&copy; 2024, Tiffin Stash Inc.</Typography>
                        </Grid>




                    </Grid>
                </Container>
            </Box>
        </>
    )
}


const useStyles = {
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            border: 'none',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        border: 0,
        backgroundColor: "white",
        borderColor: "transparent",
        borderRadius: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    }
}
