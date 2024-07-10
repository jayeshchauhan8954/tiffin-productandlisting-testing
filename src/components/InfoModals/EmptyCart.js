import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function EmptyCart() {

    const theme = useTheme()

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{textAlign: 'center'}}>
                    <Box component={"img"} src='/assets/icons/blankcart.svg'/>
                    <Typography component={"p"} variant='heading2' fontSize={18} color={theme.palette.primary.primaryDmain2}>Add tiffins to start a cart</Typography>
                    <Typography component={"p"}  variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Once you add a tiffin from a tiffin service, your cart will appear here.</Typography>
                </Grid>
            </Grid>
        </>
    )
}
