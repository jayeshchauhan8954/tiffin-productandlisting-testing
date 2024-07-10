import { Box, Button, ButtonBase, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import CustomChip from '@/components/Common/CustomChip'

import CustomDialog from '@/components/Common/CustomDialog';
import ModifyOrder from '@/components/OrderCard/ModifyOrder';

import { fontName } from '@/utils/fonts/Font';
import { getS3Url } from '@/utils/helpers/fileHelper';
import moment from 'moment';
import { RatingChip } from './ReviewOrder';

export default function OrderCard({ item, status, onView = () => { }, onPrimaryAction = () => { }, onSecondaryAction = () => { } }) {
    const theme = useTheme()

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                        <Box component="img" src={getS3Url(item?.orderDetails?.productDetails?.thumbNail)} sx={{ height: 160, borderRadius: 1, }} />
                        <Box sx={{ ml: 3 }}>
                            <Typography variant='heading2' fontSize={20} color={theme.palette.primary.blackColor}>{item?.orderDetails?.productDetails?.name}</Typography>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Typography variant='cardHeading' color={theme.palette.primary.primaryGray4}>{item?.orderDetails?.itemInfo?.mealType?.name} • {item?.orderDetails?.itemInfo?.mealPlan?.name}  • ${item?.orderDetails?.netAmount}</Typography>
                                <ButtonBase variant='text'>
                                    <Typography onClick={() => onView(item)} variant='cardText' color={theme.palette.primary.primaryDmain2} sx={{ mx: 1, textDecorationLine: 'underline' }}>View Details</Typography>
                                </ButtonBase>
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} sx={{ my: 3 }}>
                                <Box component="img" src="/assets/images/receipt.svg" />
                                <Typography variant='cardText' color={theme.palette.primary.primaryDmain2} sx={{ mx: 1, }}>Order ID : <span style={{ color: theme.palette.primary.primaryGray4, fontFamily: fontName.PoppinsRegular }}>#{item?.orderNo}</span></Typography>
                                <CustomChip
                                    label={`Completed (${item?.orderDetails?.noOfDoneDeliveries}/${item?.orderDetails?.noOfDeliveries} delivered)`}
                                    borderRadius={40}
                                    bgcolor={theme.palette.primary.lightGreen}
                                    color={theme.palette.primary.greenColor}
                                    sx={{ fontSize: 12, padding: 2, }}
                                />
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box component="img" src="/assets/images/calendar-2.svg" />
                                <Typography variant='cardText' color={theme.palette.primary.primaryDmain2} sx={{ mx: 1, }}>Next Delivery Date : <span style={{ color: theme.palette.primary.primaryGray4, fontFamily: fontName.PoppinsRegular }}>{moment(item?.orderDetails?.nextDelivery?.deliveryDate).format("dddd, MMMM Do, YYYY")}</span> </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack direction="row" alignItems={"center"} spacing={2} sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>

                        {
                            status === "Active" ? <>
                                <CustomChip
                                    label="Modify"
                                    onClick={onPrimaryAction}
                                    borderRadius={40}
                                    bgcolor={theme.palette.primary.lightGrey3}
                                    color={theme.palette.primary.primaryDmain2}
                                    sx={{ fontSize: 14, padding: 20, marginRight: 10, }}
                                />
                                <CustomChip
                                    onClick={onSecondaryAction}
                                    label="Get Help"
                                    borderRadius={40}
                                    bgcolor={theme.palette.primary.lightGrey3}
                                    color={theme.palette.primary.primaryDmain2}
                                    sx={{ fontSize: 14, padding: 20, }}
                                />
                            </> :
                                <>
                                    <CustomChip
                                        onClick={onPrimaryAction}
                                        label="Reorder"
                                        borderRadius={40}
                                        bgcolor={theme.palette.primary.lightGrey3}
                                        color={theme.palette.primary.primaryDmain2}
                                        sx={{ fontSize: 14, padding: 20, marginRight: 10, }}
                                    />

                                    {
                                        Boolean(item.orderDetails?.ratingDetails?.rating) ?
                                            <RatingChip active={true} rating={item.orderDetails?.ratingDetails?.rating} /> :
                                            <CustomChip
                                                onClick={onSecondaryAction}
                                                label="Rate Order"
                                                borderRadius={40}
                                                bgcolor={theme.palette.primary.lightGrey3}
                                                color={theme.palette.primary.primaryDmain2}
                                                sx={{ fontSize: 14, padding: 20, }}
                                            />
                                    }

                                </>
                        }

                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ my: 5, borderColor: theme.palette.primary.dividerColor }} />
                </Grid>
            </Grid>


            {/* <CustomDialog
                maxWidth="md"
                open={openModal}
                showBackButton={true}
                // dialogContentBgColor="green" 
                // dialogContentProps={{ sx: { padding: 0, margin: 0} }}
                heading={"Modify Order"}
                showBorderBottom={true}
                onClose={handleCloseModal}>

                <ModifyOrder />

            </CustomDialog> */}
        </>
    )
}
