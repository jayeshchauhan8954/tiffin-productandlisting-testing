"use client"
import React, { useState } from 'react'
import { Box, Button, Container, Grid, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
import CustomDialog from '../Common/CustomDialog'
import SearchIcon from '@mui/icons-material/Search';
import Header from '../Common/Header';

export default function EmptyOrder() {

    const theme = useTheme();

    return (
        <>

            <Header />
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} sx={{margin: 'auto', mt: 5, textAlign: 'center'}}>
                    <Box component="img" src="/assets/icons/Group.svg" sx={{mb: 3}} />
                    <Typography component={"p"} variant='heading2' sx={{mb: 1}} fontSize={18} color={theme.palette.primary.primaryDmain2}>No order yet</Typography>
                    <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Your tiffin is empty... time to fill it up!</Typography>

                    <Button
                        sx={{ height: 56, mt: 4, width: "60%", }}
                        variant="contained">
                        Start an order
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
