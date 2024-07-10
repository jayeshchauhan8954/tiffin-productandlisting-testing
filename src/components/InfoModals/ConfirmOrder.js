import { Box, Button, Container, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

export default function ConfirmOrder() {
    const theme = useTheme()

    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <Box component={"img"} src='/assets/icons/clock.svg' />
                <Typography component={"p"} variant='heading2' color={theme.palette.primary.main} >Confirm schedule order</Typography>
                <Typography sx={{ mt: 3 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='cardHeading'>You’re about to schedule your order delivery for </Typography>
                <Typography component={"p"} color={theme.palette.primary.primaryDmain2} variant='cardHeading'>Tomorrow</Typography>

                <Button fullWidth sx={{ height: 56, width: { xs: "100%", md: "70%" }, mt: 3 }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Yes, Confirm Schedule Order</Typography>
                </Button>
                <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardHeading'>No, Cancel</Typography>
            </Box>
        </>
    )
}
