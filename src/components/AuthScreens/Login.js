
import React, { useState } from 'react';
import { Box, Button, Grid, Stack, TextField, Typography, useTheme, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { setAuth } from '@/redux/slicers/auth';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { _loginSchema } from './Validation';
import { LoadingButton } from '@mui/lab';
import { setAuthCookie } from '@/utils/helpers/authHelpers';
import { _routes } from '@/utils/endPoints/routes';
import { useDispatch } from 'react-redux';

export default function Login({ isRedirect, onMobileVerify = () => { }, onClose = () => { } }) {
    const router = useRouter()
    const theme = useTheme()

    const dispatch = useDispatch()

    // states
    const [showPassword, setShowPassword] = useState(false);
    const [load, setLoad] = useState(false)

    // helpers
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    let initialValues = {
        email: '',
        password: ''
    }

    const { values, handleChange, handleSubmit, touched, errors } = useFormik({
        initialValues,
        validationSchema: _loginSchema,
        onSubmit: () => handleLogin()
    })

    const handleLogin = async () => {
        setLoad(true)
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.auth.login,
            method: 'POST',
            body: values,
            showMsg: true
        })
        setLoad(false)
        if (status) {
            if (data?.isMobileVerify) {
                onClose()
                setAuthCookie(data?.token)   // Save token in cookie
                dispatch(setAuth({ token: data?.token, isAuth: true, userType: data?.userType })) // Save token in Redux

                if (isRedirect) {
                    if (data.userType === 1) {
                        router.push(_routes.user.products)
                    } else {
                        router.push(_routes.seller.dashboard)
                    }
                }
            } else {
                onMobileVerify(data?.dialCode, data?.phone)
            }
        }
    }

    return (
        <>
            <Grid container sx={{ mt: 5, }}>

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
                            or Log in
                        </Typography>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: theme.palette.primary.lightGrey5 }} />
                    </Stack>
                </Grid>

                <Grid xs={12} md={12} >
                    <Typography color={theme.palette.primary.blackColor} sx={{ mb: 1, }} variant='cardText'>
                        Email address <span style={{ color: theme.palette.error.main }}>*</span></Typography>
                    <TextField
                        name="email"
                        sx={{ my: 1 }}
                        variant="outlined"
                        fullWidth
                        placeholder='example@email.com'
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </Grid>
                <Grid xs={12} md={12} sx={{ mt: 2 }}>
                    <Typography sx={{ mb: 1 }} color={theme.palette.primary.blackColor} variant='cardText'>
                        Password <span style={{ color: theme.palette.error.main }}>*</span></Typography>
                    <TextField
                        name="password"
                        sx={{ my: 1 }}
                        variant="outlined"
                        fullWidth
                        value={values.password}
                        onChange={handleChange}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='enter password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid xs={12} md={12} sx={{ my: 3, justifyContent: 'center', display: 'flex' }}>
                    <Typography variant='cardHeading'>Recover Password</Typography>
                </Grid>

                <Grid xs={12} md={12}>
                    <LoadingButton
                        loading={load}
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ height: 56 }}
                        variant="contained">
                        Log in
                    </LoadingButton>
                </Grid>

                <Grid xs={12} md={12} sx={{ mt: 3, }}>
                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography color={theme.palette.primary.textGray1} variant='small1'>By signing up with email, or continuing with Facebook, Google or Apple, you agree to the Terms of Service & Privacy Policy.</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
