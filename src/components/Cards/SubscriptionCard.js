import { Box, Stack, Typography, useTheme, } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';

import CustomChip from '../Common/CustomChip';
import { fontName } from '@/utils/fonts/Font';
import { _deliveryTimes, _subscription } from '@/utils/constants/constants';
import moment from 'moment';

export default function SubscriptionCard({ data }) {
    const theme = useTheme();

    const getPlan = (planName) => {
        let find = data?.mealplansInfo?.find(plan => plan?.name === planName)
        return find ? `${find?.days} Days` : '---'
    }
    const getDeliveryTime = (delName) => {
        let find = data?.deliveryTimeIds?.find(del => del?.name === delName)
        return find ? `${moment(find?.from).format('hh:mm a')} - ${moment(find?.to).format('hh:mm a')}` : '---'
    }
    const getOpenDays = () => {
        let len = data?.deliveryDays?.length // 2
        return data?.deliveryDays?.reduce((str, day, index) => {
            str += day
            str += index !== len - 1 ? index === len - 2 ? ' & ' : ', ' : ''
            return str;
        }, '')
    }
    return (
        <>
            <Box sx={{ width: "100%", backgroundColor: theme.palette.primary.lighterGray, p: 2, borderRadius: 1, }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography variant={"cardHeading"} color={theme.palette.primary.primaryGrey90} >SUBSCRIPTION</Typography>
                        <Grid container spacing={2} sx={{ mt: 0, }} >
                            <Grid item md={6} xs={6}>
                                <Stack direction="row" sx={{ alignItems: 'center', }}>
                                    <Box component={"img"} alt="" src="/assets/images/calendar-tick.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                                    <Typography color={theme.palette.primary.primaryDmain} variant={"cardText"}>Weekly Plan : {getPlan(_subscription.Weekly)}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <Stack direction="row" sx={{ alignItems: 'center', }}>
                                    <Box component={"img"} alt="" src="/assets/images/calendar-tick.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                                    <Typography color={theme.palette.primary.primaryDmain} variant={"cardText"}>Monthly Plan : {getPlan(_subscription.Monthly)}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant={"cardHeading"} color={theme.palette.primary.primaryGrey90}>LUNCH & DINNER</Typography>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item md={6} xs={6}>
                                <Stack direction="row" sx={{ alignItems: 'center', }}>
                                    <Box component={"img"} alt="" src="/assets/images/daytiffin.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                                    <Typography color={theme.palette.primary.primaryDmain} variant={"cardText"}>{getDeliveryTime(_deliveryTimes.Lunch)}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <Stack direction="row" sx={{ alignItems: 'center', }}>
                                    <Box component={"img"} alt="" src="/assets/images/nighttiffin.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                                    <Typography color={theme.palette.primary.primaryDmain} variant={"cardText"}>{getDeliveryTime(_deliveryTimes.Dinner)}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12} >
                        <Typography variant={"cardHeading"} color={theme.palette.primary.primaryGrey90}>DELIVERY DAYS</Typography>
                        <Stack direction="row" sx={{ alignItems: 'center', mt: 1 }}>
                            <Box component={"img"} alt="" src="/assets/images/calendar-2.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography color={theme.palette.primary.primaryDmain} sx={{ mr: 1 }} variant={"cardText"}>{getOpenDays()}</Typography>
                            {
                                data?.deliveryDays?.length === 5 && <CustomChip sx={{ fontFamily: fontName.PoppinsSemiBold, }} label={"Open All Days"} />
                            }

                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
