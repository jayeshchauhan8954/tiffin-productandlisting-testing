import { Box, Button, Container, Divider, Grid, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import CustomChip from '../Common/CustomChip'
import CustomDialog from '../Common/CustomDialog';
import ModifyOrder from '../OrderCard/ModifyOrder';
import OrderDetail from '../OrderCard/OrderDetail';
import { fontName } from '@/utils/fonts/Font';
import ReviewOrder from '../user/orders/ReviewOrder';

export default function PastOrder() {

    const theme = useTheme()
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                        <Box component="img" src="/assets/images/orderimg.svg" sx={{ height: 160, borderRadius: 1, }} />
                        <Box sx={{ ml: 3 }}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Typography variant='heading2' fontSize={20} color={theme.palette.primary.blackColor}>Avsar Foods</Typography>
                                <CustomChip
                                    label="4.0"
                                    borderRadius={10}
                                    bgcolor={theme.palette.primary.greenColor}
                                    color={theme.palette.primary.contrastText}
                                    sx={{ fontSize: 14, marginLeft: "10px", height: 26, width: 56 }}
                                />
                            </Stack>

                            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 1 }}>
                                <Typography variant='cardHeading' color={theme.palette.primary.primaryGray4}>Basic • Trial • $545</Typography>
                                <Typography variant='cardText' color={theme.palette.primary.primaryDmain2} sx={{ mx: 1, textDecorationLine: 'underline' }}>View Details</Typography>
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} sx={{ my: 2 }}>
                                <Box component="img" src="/assets/images/receipt.svg" />
                                <Typography variant='cardText' color={theme.palette.primary.primaryDmain2} sx={{ mx: 1, }}>Order ID : <span style={{ color: theme.palette.primary.primaryGray4, fontFamily: fontName.PoppinsRegular }}>#34567</span></Typography>
                                <CustomChip
                                    label="Completed (10/10 delivered)"
                                    borderRadius={40}
                                    bgcolor={theme.palette.primary.lightGreen}
                                    color={theme.palette.primary.greenColor}
                                    sx={{ fontSize: 12, padding: 2, }}
                                />
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box component="img" src="/assets/images/calendar-2.svg" />
                                <Typography variant='cardText' color={theme.palette.primary.primaryDmain2} sx={{ mx: 1, }}>Next Delivery Date : <span style={{ color: theme.palette.primary.primaryGray4, fontFamily: fontName.PoppinsRegular }}>Friday, April 7th, 2024</span> </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack direction="row" alignItems={"center"} spacing={2} sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <CustomChip
                            onClick={handleOpenModal}
                            label="Reorder"
                            borderRadius={40}
                            bgcolor={theme.palette.primary.lightGrey3}
                            color={theme.palette.primary.primaryDmain2}
                            sx={{ fontSize: 14, padding: 20, marginRight: 10, }}
                        />
                        <CustomChip
                            onClick={handleOpenModal}
                            label="Rate Order"
                            borderRadius={40}
                            bgcolor={theme.palette.primary.lightGrey3}
                            color={theme.palette.primary.primaryDmain2}
                            sx={{ fontSize: 14, padding: 20, }}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 5, borderColor: theme.palette.primary.dividerColor }} />
                </Grid>
            </Grid>

            <CustomDialog
                maxWidth="md"
                open={openModal}
                // dialogContentBgColor="green" 
                // dialogContentProps={{ sx: { padding: 0, margin: 0} }}
                heading={"Write a Review"}
                showBorderBottom={true}
                onClose={handleCloseModal}>

                {/* Rate Order -------------- */}

                {/* <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography component={"p"} variant='heading3' color={theme.palette.primary.blackColor}>Rate Order</Typography>

                        <CustomChip
                            label="4.0"
                            borderRadius={10}
                            bgcolor={theme.palette.primary.greenColor}
                            color={theme.palette.primary.contrastText}
                            sx={{ fontSize: 14, height: 26, marginTop: "10px", width: 56 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <CustomChip
                            label="Correct items"
                            borderRadius={50}
                            bgcolor={theme.palette.primary.lighterGray}
                            color={theme.palette.primary.primaryDGrey60}
                            sx={{ fontSize: 14, padding: 22, }}
                        />
                        <CustomChip
                            label="Highly recommend "
                            borderRadius={50}
                            bgcolor={theme.palette.primary.greenColor}
                            color={theme.palette.primary.contrastText}
                            sx={{ fontSize: 14, padding: 22, marginLeft: "10px" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                        <Typography component={"p"} variant='heading2' color={theme.palette.primary.blackColor}>Share Feedback</Typography>

                        <TextField
                            sx={{ backgroundColor: theme.palette.primary.primaryGray7, borderRadius: 1, my: 1 }}
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                            placeholder='Lorem ipsum dolor sit amet consectetur. Elementum in nullam porta id et at dictum dui tempus. Lorem ipsum dolor sit amet consectetur. Elementum in nullam porta id et at dictum dui tempus. '
                        />
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 2, }}>
                        <Button
                            fullWidth
                            sx={{ height: 56 }}
                            variant="contained">
                            Submit Review
                        </Button>
                    </Grid>


                </Grid> */}

                <ReviewOrder />


                {/* <OrderDetail /> */}






            </CustomDialog>
        </>
    )
}
