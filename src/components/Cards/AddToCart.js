import React, { useState } from 'react'
import { Avatar, Box, Button, ButtonGroup, Divider, Grid, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'
import CustomChip from '../Common/CustomChip'
import { fontName } from '@/utils/fonts/Font';
import CounterButton from '../Common/CounterButton';
import CustomDialog from '../Common/CustomDialog';
import SellerMessage from '../InfoModals/SellerMessage';
import RiderMessage from '../InfoModals/RiderMessage';
import Discount from '../InfoModals/Discount';


export default function AddToCart() {

    const theme = useTheme();
    const [count, setCount] = useState(0);
    const [selectedValue, setSelectedValue] = useState('a');

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={10} md={10}>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <Avatar alt="" src="/assets/images/img2.png" />
                            <Stack sx={{ ml: 2 }}>
                                <Typography component={"p"} variant={"heading2"}>Avsar Foods</Typography>
                                <Typography component={"p"} variant={"cardHeading"}>1373a Bathurst Street</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={2} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box component={"img"} alt="" src="/assets/images/arrow-right.svg" sx={{ height: 20, width: 20 }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                    </Grid>

                    <Grid item xs={8} md={8} sx={{ alignItems: 'center', display: 'flex', }}>
                        <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"cardText"}>Basic -- Trial</Typography>
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Stack direction="row" sx={{ alignItems: 'center', border: 1, borderRadius: 10, p:1, borderColor: theme.palette.primary.primaryGray2 }}>
                                <Box component={"img"} alt="" src="/assets/images/edit.svg" sx={{ height: 13, width: 13, mr: 1 }} />
                                <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"small1"}>Edit Order</Typography>
                            </Stack>
                            <Avatar alt="" src="/assets/images/delete.svg" sx={{ height: 30, width: 30, ml: 1 }} />
                        </Box>
                    </Grid>

                    <Grid item xs={7} md={9}>
                        <Box sx={{ whiteSpace: 'pre-line' }}>
                            <Typography component={"p"} color={theme.palette.primary.primaryGray3} variant={"cardHeading"}>
                                8 Roti
                                1 Veg (12 Oz)
                                1 Kathod (12 Oz)
                                1 Dal   {'\n'} (12 Oz)
                                1 Rice (12 Oz) {'\n'}
                                1 Sweet (Complimentary)
                            </Typography>
                        </Box>
                        <Typography component={"p"} sx={{ mt: 2 }} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>
                            $50</Typography>
                    </Grid>

                    <Grid item xs={5} md={3} >
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CounterButton
                                value={count}
                                onIncrement={() => setCount(count + 1)}
                                onDecrement={() => setCount(count - 1)}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Box sx={{ backgroundColor: theme.palette.primary.primaryGray5, p: 2, borderRadius: 1 }}>
                            <Grid container>
                                <Grid item xs={8} md={8}>
                                    <Stack direction="row" sx={{ alignItems: 'center', }}>
                                        <Avatar alt="" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                                        <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant={"small1"}>Delivery Start Date</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"heading4"}>Friday, April 7th</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <CustomChip
                            borderRadius={30}
                            color={theme.palette.primary.main}
                            bgcolor={theme.palette.primary.lightPink} label={"+ add another tiffin"}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                        <TextField fullWidth placeholder='Don’t make it oily'
                            sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                        <Box sx={{ border: 1, backgroundColor: theme.palette.primary.primaryGray7, borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: theme.palette.primary.primaryGray6, p: 2 }}>
                            <Stack>
                                <Typography component={"p"} fontSize={14} color={theme.palette.primary.blackColor} variant={"heading2"}>Leave a message for the tiffin seller</Typography>
                                <Typography component={"p"} sx={{ mt: 1 }} color={theme.palette.primary.primaryGray8} variant={"cardHeading"}>Specify skip days, alternate days, and one or....</Typography>
                            </Stack>
                            <Typography onClick={handleOpenModal} component={"p"} color={theme.palette.primary.blackColor} variant={"heading2"}>+</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={8} md={8}>
                        <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"heading2"}>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"heading2"}>$245</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Button
                            variant="contained"
                            sx={{
                                height: 56,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography sx={{ fontSize: 16, }} variant='heading2'>Proceed to checkout</Typography>
                            <Typography sx={{ fontSize: 16, }} variant='heading2'>$245</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>


            <CustomDialog
                maxWidth="md"
                heading={"Leave a message for the tiffin seller"}
                // heading={"Note for the rider"}
                // heading={"Discount code or gift card"}
                showBorderBottom={true}
                open={openModal}
                onClose={handleCloseModal}
                actions={
                    <>
                    {/* Save Btn  */}
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Button sx={{ height: 56, width: "100%", }} variant="contained">
                                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Save</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Discount Btn  */}

                        {/* <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Button sx={{ height: 56, width: "100%", }} variant="contained">
                                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Apply</Typography>
                                </Button>
                            </Grid>
                        </Grid> */}
                    </>
                }
            >

                <SellerMessage />
                {/* <RiderMessage /> */}
                {/* <Discount /> */}

            </CustomDialog>
        </>
    )
}
