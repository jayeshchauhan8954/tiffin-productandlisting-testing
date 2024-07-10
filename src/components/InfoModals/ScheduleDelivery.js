import React from 'react'
import CommonCalender from '../Common/CommonCalender'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Grid, Typography, useTheme } from '@mui/material'

export default function ScheduleDelivery() {

    const theme = useTheme();

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{ my: 1 }}>
                    <CommonCalender />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography component={"p"} variant={"cardText"} color={theme.palette.primary.blackColor}>Customize Date</Typography>
                    <DatePicker fullWidth sx={{ pt: 1, width: "100%" }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Button sx={{ height: 56, width: "100%", mt: 4 }} variant="contained">
                        <Typography sx={{ fontSize: 16, }} variant='heading2'>Confirm</Typography>
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}
