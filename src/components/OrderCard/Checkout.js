'use client'
import React, { useState } from 'react'
import Header from '../Common/Header'
import { Avatar, Box, Button, Container, Divider, Grid, Radio, Stack, Typography, useTheme } from '@mui/material'
import CustomChip from '../Common/CustomChip'
import CounterButton from '../Common/CounterButton'
import { Padding } from '@mui/icons-material'

export default function Checkout() {
    const theme = useTheme()

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedCard, setSelectedCard] = useState('');
    const [count, setCount] = useState(0);

    const [state, setState] = useState(false);
    const toggleCardVisibility = () => setState(!state);


    return (
        <>

            <Header />

            <Box sx={{ backgroundColor: theme.palette.primary.primaryGray5, pt: 4, pb: 5 }}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={10} md={10} sx={{ margin: 'auto', }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={7}>
                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, borderRadius: "10px", }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Delivery Details</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction={"row"} alignItems={"center"}>
                                                        <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                                                        <Box>
                                                            <Typography color={theme.palette.primary.primaryGrey90} variant='heading3'>Canada</Typography>
                                                            <Typography component={"p"} color={theme.palette.primary.blackColor} variant='small1'>1373a Bathurst Street</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <CustomChip
                                                        label="Edit"
                                                        borderRadius={20}
                                                        bgcolor={theme.palette.primary.lightGrey3}
                                                        color={theme.palette.primary.blackColor}
                                                        sx={{ fontSize: 12, }}
                                                    />
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Divider sx={{ my: 1, borderColor: theme.palette.primary.dividerColor }} />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction={"row"} alignItems={"center"}>
                                                        <Box component="img" src="/assets/icons/scooter.svg" sx={{ mr: 1 }} />
                                                        <Box>
                                                            <Typography color={theme.palette.primary.primaryGrey90} variant='heading3'>Note for the rider</Typography>
                                                            <Typography component={"p"} color={theme.palette.primary.blackColor} variant='small1'>Leave in Lobby - Please be careful</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <CustomChip
                                                        label="Edit"
                                                        borderRadius={20}
                                                        bgcolor={theme.palette.primary.lightGrey3}
                                                        color={theme.palette.primary.blackColor}
                                                        sx={{ fontSize: 12, }}
                                                    />
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Divider sx={{ my: 1, borderColor: theme.palette.primary.dividerColor }} />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Delivery / Start Date</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                                                    sx={{
                                                        border: 1,
                                                        borderColor: theme.palette.primary.primaryGray8,
                                                        borderRadius: 1, p: 2,
                                                    }} >
                                                    <Box>
                                                        <Typography color={theme.palette.primary.primaryGrey90} variant='cardText'>Deluxe rice -- Monthly -- Lunch & Dinner</Typography>
                                                        <Stack direction={"row"} alignItems={"center"}>
                                                            <Box component="img" src="/assets/icons/calendar-edit.svg" sx={{ mr: 1 }} />
                                                            <Typography color={theme.palette.primary.lightGrey4} variant='small1'>Friday, April 7th, 2024</Typography>
                                                        </Stack>
                                                    </Box>
                                                    <CustomChip
                                                        label="Edit"
                                                        borderRadius={20}
                                                        bgcolor={theme.palette.primary.lightGrey3}
                                                        color={theme.palette.primary.blackColor}
                                                        sx={{ fontSize: 12, }}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 2, borderRadius: "10px", }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Payment Method</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>

                                                {/* Wallet Method--------------------------------- */}

                                                <Box sx={{
                                                    border: 1,
                                                    borderColor: theme.palette.primary.primaryGray8,
                                                    borderRadius: 1,
                                                }}>
                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 2 }}>
                                                        <Stack direction={"row"} alignItems={'flex-start'} >
                                                            <Box component="img" src="/assets/icons/calendar-edit.svg" sx={{ mr: 1 }} />
                                                            <Stack>
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>$255</Typography>
                                                                <Typography color={theme.palette.primary.primaryGrey90} variant='small1'>Wallet</Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Radio
                                                            sx={{ p: 0 }}
                                                            checked={selectedValue === 'a'}
                                                            onChange={(e) => setSelectedValue(e.target.value)}
                                                            value="a"
                                                            name="radio-buttons"
                                                        />
                                                    </Stack>

                                                    {selectedValue === 'a' && (
                                                        <>
                                                            <Divider sx={{ mx: 3, mb: 2, borderColor: theme.palette.primary.lightGrey5 }} />
                                                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ mx: 3, pb: 2, }}>
                                                                <Typography component={"p"} color={theme.palette.primary.greenColor} variant='small1'>Remaining balance</Typography>
                                                                <Typography component={"p"} color={theme.palette.primary.greenColor} variant='semiBoldText'>$300</Typography>
                                                            </Stack>
                                                            <Box sx={{ backgroundColor: theme.palette.primary.lightPink2, p: 2, }}>
                                                                <Stack direction={"row"} alignItems={"center"} sx={{ py: 2 }}>
                                                                    <Radio
                                                                        sx={{ p: 0, mr: 1 }}
                                                                        checked={selectedCard === 'f'}
                                                                        onChange={(e) => setSelectedCard(e.target.value)}
                                                                        value="f"
                                                                        name="radio-buttons"
                                                                    />
                                                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Use with Pay Online</Typography>
                                                                </Stack>
                                                                <Stack direction={"row"} alignItems={"center"} sx={{ py: 2 }}>
                                                                    <Radio
                                                                        sx={{ p: 0, mr: 1 }}
                                                                        checked={selectedCard === 'g'}
                                                                        onChange={(e) => setSelectedCard(e.target.value)}
                                                                        value="g"
                                                                        name="radio-buttons"
                                                                    />
                                                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Use with Email Money Transfer</Typography>
                                                                </Stack>
                                                            </Box>
                                                            <Box sx={{ backgroundColor: theme.palette.primary.lightYellow, p: 2, ...useStyles.pinkBox }}>
                                                                <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant='cardText'>Send money from your bank app to etransfer@tiffinstash.com </Typography>
                                                            </Box>
                                                        </>
                                                    )}
                                                </Box>

                                                {/* Online Method--------------------------------- */}

                                                <Box sx={{ border: 1, borderColor: theme.palette.primary.primaryGray8, borderRadius: 1, mt: 2 }}>
                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 2, }}>
                                                        <Stack direction={"row"} alignItems={'flex-start'} >
                                                            <Box component="img" src="/assets/icons/global.svg" sx={{ mr: 1 }} />
                                                            <Typography color={theme.palette.primary.primaryDmain} variant='cardHeading'>Pay online</Typography>
                                                        </Stack>
                                                        <Radio
                                                            sx={{ p: 0 }}
                                                            checked={selectedValue === 'b'}
                                                            onChange={(e) => setSelectedValue(e.target.value)}
                                                            value="b"
                                                            name="radio-buttons"
                                                        />
                                                    </Stack>

                                                    {selectedValue === 'b' && (
                                                        <Box sx={{ backgroundColor: theme.palette.primary.lightPink2, p: 2, ...useStyles.pinkBox }}>
                                                            <Typography component={"p"} color={theme.palette.primary.main} variant='cardText'>Select card</Typography>
                                                            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 1 }}>
                                                                <Radio
                                                                    sx={{ p: 0 }}
                                                                    checked={selectedCard === 'd'}
                                                                    onChange={(e) => setSelectedCard(e.target.value)}
                                                                    value="d"
                                                                    name="radio-buttons"
                                                                />
                                                                <Box component="img" src="/assets/icons/visa.svg" sx={{ mx: 1 }} />
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Visa ••••2141</Typography>
                                                            </Stack>

                                                            <Divider sx={{ my: 2, borderColor: theme.palette.primary.contrastText }} />

                                                            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 1 }}>
                                                                <Radio
                                                                    sx={{ p: 0 }}
                                                                    checked={selectedCard === 'e'}
                                                                    onChange={(e) => setSelectedCard(e.target.value)}
                                                                    value="e"
                                                                    name="radio-buttons"
                                                                />
                                                                <Box component="img" src="/assets/icons/visa.svg" sx={{ mx: 1 }} />
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Visa ••••2141</Typography>
                                                            </Stack>

                                                            <Divider sx={{ my: 2, borderColor: theme.palette.primary.contrastText }} />

                                                            <CustomChip
                                                                borderRadius={30}
                                                                color={theme.palette.primary.main}
                                                                bgcolor={theme.palette.primary.contrastText} label={"+ add a card"}
                                                            />
                                                        </Box>
                                                    )}
                                                </Box>


                                                {/* Email Method--------------------------------- */}

                                                <Box sx={{ border: 1, borderColor: theme.palette.primary.primaryGray8, borderRadius: 1, mt: 2 }}>

                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 2, }}>
                                                        <Stack direction={"row"} alignItems={'flex-start'} >
                                                            <Stack direction={"row"} alignItems={'flex-start'} >
                                                                <Box component="img" src="/assets/icons/moneys.svg" sx={{ mr: 1 }} />
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardHeading'>Email Money Transfer</Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Radio
                                                            sx={{ p: 0 }}
                                                            checked={selectedValue === 'c'}
                                                            onChange={(e) => setSelectedValue(e.target.value)}
                                                            value="c"
                                                            name="radio-buttons"
                                                        />
                                                    </Stack>

                                                    {selectedValue === 'c' && (
                                                        <Box sx={{ backgroundColor: theme.palette.primary.lightPink2, p: 2, ...useStyles.pinkBox }}>
                                                            <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant='cardText'>Send money from your bank app to etransfer@tiffinstash.com </Typography>
                                                        </Box>
                                                    )}

                                                </Box>

                                            </Grid>
                                        </Grid>

                                    </Box>

                                    <Grid item xs={12} md={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ height: 56, mt: 2 }}
                                        >
                                            <Typography variant='cardText'>Make Payment</Typography>
                                        </Button>
                                    </Grid>
                                </Grid>

                                {/* Carts ---------------------------------------- */}

                                <Grid item xs={12} md={5}>
                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Box display={"flex"} alignItems={"center"}>
                                                        <Avatar alt="" src="/assets/images/img2.png" />
                                                        <Stack sx={{ ml: 2 }}>
                                                            <Typography component={"p"} variant={"heading2"}>Avsar Foods</Typography>
                                                            <Typography component={"p"} variant={"cardHeading"}>1373a Bathurst Street</Typography>
                                                        </Stack>
                                                    </Box>
                                                    <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ height: 56, }}
                                                >
                                                    <Typography variant='cardText'>Make Payment</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 0.5, }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction="row" alignItems={"center"}>
                                                        <Box component={"img"} alt="" src="/assets/icons/shopping-cart.svg" sx={{ mr: 1 }} />
                                                        <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant={"regularText"}>Cart summary(1 items)</Typography>
                                                    </Stack>
                                                    <Box onClick={toggleCardVisibility} component={"img"} alt="" src="/assets/icons/arrow-right.svg" sx={{ mr: 1 }} />
                                                </Stack>
                                            </Grid>

                                            {state && (
                                                <>
                                                    <Grid item xs={7} md={8} sx={{ alignItems: 'center', display: 'flex', }}>
                                                        <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"cardText"}>Deluxe rice -- Monthly</Typography>
                                                    </Grid>

                                                    <Grid item xs={5} md={4}>
                                                        <Stack direction="row" sx={{ alignItems: 'center', border: 1, borderRadius: 10, p: 1, borderColor: theme.palette.primary.primaryGray2 }}>
                                                            <Box component={"img"} alt="" src="/assets/images/edit.svg" sx={{ height: 13, width: 13, mr: 1 }} />
                                                            <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"small1"}>Edit Order</Typography>
                                                        </Stack>
                                                    </Grid>

                                                    <Grid item xs={12} md={12}>
                                                        <Box sx={{ whiteSpace: 'pre-line' }}>
                                                            <Typography component={"p"} color={theme.palette.primary.primaryGray3} variant={"cardHeading"}>
                                                                8 Roti • 1 Veg (12 Oz) • 1 Kathod (12 Oz) • 1 Dal (12 Oz) • 1 Rice (12 Oz) • 1 Sweet (Complimentary)
                                                            </Typography>
                                                        </Box>
                                                        <Typography component={"p"} sx={{ mt: 2 }} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>
                                                            $50</Typography>
                                                    </Grid>

                                                    <Grid item xs={12} md={12}>
                                                        <Box sx={{ backgroundColor: theme.palette.primary.primaryGray5, p: 2, borderRadius: 1 }}>
                                                            <Grid container>
                                                                <Grid item xs={6} md={8}>
                                                                    <Stack direction="row" sx={{ alignItems: 'center', }}>
                                                                        <Avatar alt="" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                                                                        <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant={"small1"}>Delivery Start Date</Typography>
                                                                    </Stack>

                                                                </Grid>
                                                                <Grid item xs={6} md={4}>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                        <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"heading4"}>Friday, April 7th</Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Grid>
                                                </>)}
                                        </Grid>
                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 0.5, }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Discount</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction="row" alignItems={"center"}>
                                                        <Box component={"img"} alt="" src="/assets/icons/discount.svg" sx={{ mr: 1 }} />
                                                        <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant={"regularText"}>Discount code or gift card</Typography>
                                                    </Stack>
                                                    <Box component={"img"} alt="" src="/assets/images/arrow-right.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 0.5, borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Payment Summary</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Sub-total (1 items)</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>$545</Typography>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Estimated Taxes</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>$5</Typography>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Delivery Fee</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>$5</Typography>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"semiBoldText"}>Total</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"semiBoldText"}>$555</Typography>
                                                </Stack>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Grid>


                            </Grid>




                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    )
}


const useStyles = {
    pinkBox: {
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
    }
}