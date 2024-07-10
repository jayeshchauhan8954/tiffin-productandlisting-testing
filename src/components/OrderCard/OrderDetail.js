import { Box, Button, Divider, Grid, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import CustomChip from '../Common/CustomChip'
import CommonCalender from '../Common/CommonCalender';

export default function OrderDetail() {

    const theme = useTheme()

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8} md={8}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/img2.png" sx={{ height: 30, width: 30, }} />
                        <Stack sx={{ ml: 2 }}>
                            <Typography variant='heading2' fontSize={14} color={theme.palette.primary.blackColor}>Avsar Foods</Typography>
                            <Typography variant='cardHeading' color={theme.palette.primary.primaryGray4}>Basic • Monthly • Lunch • $245</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={4} md={4} sx={{ textAlign: 'right' }}>
                    <CustomChip
                        label="PURE VEG"
                        borderRadius={40}
                        bgcolor={theme.palette.primary.lightGreen}
                        color={theme.palette.primary.greenColor}
                        sx={{ fontSize: 14, border: "2px solid green" }}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Box component="img" src="/assets/images/receipt.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Order #34567</Typography>
                        </Box>
                        {/* <Typography variant='cardText' fontSize={12} color={theme.palette.primary.primaryDmain}>Apr 7, 2024 - May 7, 2024</Typography> */}
                        <CustomChip
                            label="Completed (10/10 delivered)"
                            borderRadius={40}
                            bgcolor={theme.palette.primary.lightGreen}
                            color={theme.palette.primary.greenColor}
                            sx={{ fontSize: 12, padding: 2, }}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Box component="img" src="/assets/images/calendar-2.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Start Date - End Date</Typography>
                        </Box>
                        <Typography variant='cardText' fontSize={12} color={theme.palette.primary.primaryDmain}>Apr 7, 2024 - May 7, 2024</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Box component="img" src="/assets/images/calendar-2.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Next Delivery Date</Typography>
                        </Box>
                        <Typography variant='cardText' fontSize={12} color={theme.palette.primary.primaryDmain}>Friday, April 7th, 2024</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Box component="img" src="/assets/images/receipt.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Order Date</Typography>
                        </Box>
                        <Typography variant='cardText' fontSize={12} color={theme.palette.primary.primaryDmain}>Friday, April 1st, 2024</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Box component="img" src="/assets/images/call.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Contact Number</Typography>
                        </Box>
                        <Typography variant='cardText' fontSize={12} color={theme.palette.primary.primaryDmain}>+1 (416) 555-1212</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"space-between"}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Box component="img" src="/assets/images/locationgrey.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Address</Typography>
                        </Box>
                        <Typography variant='cardText' fontSize={12} color={theme.palette.primary.primaryDmain}> 1373a Bathurst Street Toronto, M5R 3H8</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Delivery Days</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <CommonCalender />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={7} md={8}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Subscription Schedule</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={5} md={4} sx={{ textAlign: 'right' }}>
                    <Typography variant='heading3' fontSize={14} color={theme.palette.primary.main}>View Calendar</Typography>
                </Grid>
            </Grid>


            <Grid container spacing={2} sx={{ mb: 3, mt: 2, alignItems: 'center' }}>
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/shop1.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='small1' color={theme.palette.primary.primaryGrey90}>Seller Note</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, }}
                        multiline
                        variant="outlined"
                        fullWidth
                        placeholder='Please make the food less spicy and less oily. Avoid eggplants.'
                    />
                </Grid>
            </Grid>

            {/* Part 5 ----------------- */}

            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/greyscooter.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='small1' color={theme.palette.primary.primaryGrey90}>Delivery Note</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, }}
                        multiline
                        variant="outlined"
                        fullWidth
                        placeholder=' Please call me 5 minutes before you arrive.'
                    />
                </Grid>


                <Grid item xs={12} sx={{ mt: 2 }}>
                    {/* <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Button
                            sx={{
                                height: 56, mt: 4, width: "50%",
                                boxShadow: 0, backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.contrastText, boxShadow: 0,
                                }
                            }}
                            variant="contained">
                            Get Help
                        </Button>
                        <Button
                            sx={{ height: 56, mt: 4, width: "50%", }}
                            variant="contained">
                            Modify
                        </Button>
                    </Stack> */}

                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Button
                            sx={{
                                height: 56, mt: 4, width: "50%",
                                boxShadow: 0, backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.contrastText, boxShadow: 0,
                                }
                            }}
                            variant="contained">
                            Rate Order
                        </Button>
                        <Button
                            sx={{ height: 56, mt: 4, width: "50%", }}
                            variant="contained">
                            Reorder
                        </Button>
                    </Stack>
                </Grid>
            </Grid>


        </>
    )
}
