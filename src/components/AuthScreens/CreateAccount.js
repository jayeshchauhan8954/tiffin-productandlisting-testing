import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { fontName } from '@/utils/fonts/Font';

export default function CreateAccount({ onSignup = () => { } }) {
    const theme = useTheme()

    return (
        <>
            <Grid container sx={{ mt: 5 }}>
                <Grid xs={12} md={12}>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: theme.palette.primary.blueColor, height: 56,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.blueColor,
                            }
                        }}
                        variant="contained">
                        <Box component={"img"} src='/assets/images/facebook.svg' sx={{ height: 18, width: 18, mr: 1, }} />
                        Continue with Google
                    </Button>
                </Grid>
                <Grid xs={12} md={12}>
                    <Button
                        fullWidth
                        sx={{
                            my: 2, backgroundColor: theme.palette.primary.darkBlue, height: 56,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.darkBlue,
                            }
                        }}
                        variant="contained">
                        <Box component={"img"} src='/assets/images/facebook.svg' sx={{ height: 18, width: 18, mr: 1, }} />
                        Continue with Facebook
                    </Button>
                </Grid>
                <Grid xs={12} md={12}>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.primary.primaryDmain2, height: 56,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.primaryDmain2,
                            }
                        }}
                        fullWidth
                        variant="contained">
                        <Box component={"img"} src='/assets/images/apple.svg' sx={{ height: 18, width: 18, mr: 1, }} />
                        Continue with Apple
                    </Button>
                </Grid>

                <Grid xs={12} md={12} >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 3 }}>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: theme.palette.primary.lightGrey5 }} />
                        <Typography variant="cardHeading">
                            Or
                        </Typography>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: theme.palette.primary.lightGrey5 }} />
                    </Stack>
                </Grid>

                <Grid xs={12} md={12}>
                    <Button
                        onClick={onSignup}
                        fullWidth
                        sx={{
                            height: 56, backgroundColor: theme.palette.primary.primaryGray5,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.primaryGray5,  // Change this to your desired hover color
                            }, color: theme.palette.primary.primaryDmain
                        }}
                        variant="contained">
                        Sign Up With Email
                    </Button>
                </Grid>

                <Grid xs={12} md={12} sx={{ mt: 3, }}>
                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography color={theme.palette.primary.textGray1} variant='small1'>
                            By signing up with email, or continuing with Facebook,
                            Google or Apple, you agree to the <span style={{ color: theme.palette.error.primaryDmain, fontFamily: fontName.PoppinsMedium }}>Terms of Service</span> & <span style={{ color: theme.palette.error.primaryDmain, fontFamily: fontName.PoppinsMedium }}>Privacy Policy</span></Typography>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
