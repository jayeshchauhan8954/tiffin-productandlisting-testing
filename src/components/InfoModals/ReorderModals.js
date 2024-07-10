import { Box, Button, Container, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import CustomDialog from '@/components/Common/CustomDialog';


export const Switch = () => {

    const theme = useTheme();

    return (
        <Grid container spacing={2} sx={{ textAlign: 'center', px: 8, }}>
            <Grid item xs={12} md={12}>
                <Box component="img" src="/assets/icons/switch.svg" />
                <Typography component={"p"} variant='heading2' color={theme.palette.primary.primaryDmain2} >Switch Seller</Typography>
                <Typography sx={{ mt: 2 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='small1'>Please reach out to our customer support for assistance in switching your current Tiffin seller seamlessly.</Typography>

                <Button startIcon={<PhoneIcon />} fullWidth sx={{ height: 56, width: { xs: "100%", md: "90%" }, mt: 3 }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Talk to customer support</Typography>
                </Button>
                <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardText'>Cancel</Typography>
            </Grid>
        </Grid>
    )
}


export const Skip = () => {

    const theme = useTheme();

    return (
        <Grid container spacing={2} sx={{ textAlign: 'center', px: 8, }}>
            <Grid item xs={12} md={12}>
                <Box component="img" src="/assets/icons/skip.svg" />
                <Typography component={"p"} variant='heading2' color={theme.palette.primary.primaryDmain2} >Skip Confirmation</Typography>
                <Typography sx={{ mt: 2 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='small1'>You are about to skip your subscription Wednesday, March 9.</Typography>

                <Button fullWidth sx={{ height: 56, width: { xs: "100%", md: "90%" }, mt: 3 }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Yes, Confirm</Typography>
                </Button>
                <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardText'>Cancel</Typography>
            </Grid>
        </Grid>
    )
}


export const Resume = () => {

    const theme = useTheme();

    return (
        <Grid container spacing={2} sx={{ textAlign: 'center', px: 8, }}>
            <Grid item xs={12} md={12}>
                <Box component="img" src="/assets/icons/play.svg" />
                <Typography component={"p"} variant='heading2' color={theme.palette.primary.primaryDmain2} >Resume Confirmation</Typography>
                <Typography sx={{ mt: 2 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='small1'>You are about to resume your subscription. Your next {"\n"} delivery date will be Wednesday, March 9.</Typography>

                <Button fullWidth sx={{ height: 56, width: { xs: "100%", md: "90%" }, mt: 3 }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Yes, Confirm</Typography>
                </Button>
                <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardText'>Cancel</Typography>
            </Grid>
        </Grid>
    )
}


export const Pause = () => {

    const theme = useTheme();

    return (
        <Grid container spacing={2} sx={{ textAlign: 'center', px: 8, }}>
            <Grid item xs={12} md={12}>
                <Box component="img" src="/assets/icons/pause1.svg" />
                <Typography component={"p"} variant='heading2' color={theme.palette.primary.primaryDmain2} >Pause Confirmation</Typography>
                <Typography sx={{ mt: 2, mx: 4 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='small1'>You are about to pause your subscription from
                    Mon, Mar 7  to  Wed, Mar 9.</Typography>

                <Button fullWidth sx={{ height: 56, width: { xs: "100%", md: "90%" }, mt: 3 }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Yes, Confirm</Typography>
                </Button>
                <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardText'>Cancel</Typography>
            </Grid>
        </Grid>
    )
}
