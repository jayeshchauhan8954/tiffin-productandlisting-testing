import { Container, Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { LoadingButton } from '@mui/lab';
import { _passwordSchema } from './validationSchema';

export default function ManagePassword() {
    const theme = useTheme()

    const [load, setLoad] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    // Formik
    let initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const { values, handleChange, touched, errors, handleSubmit } = useFormik({
        initialValues,
        validationSchema: _passwordSchema,
        onSubmit: () => handlePasswordSubmit()
    })

    const handlePasswordSubmit = async () => {
        setLoad(true)
        await apiRequest({
            method: "POST",
            endUrl: _apiUrls.auth.changePassword,
            body: values,
            showMsg: true,
        })
        setLoad(false)
    }

    // Helpers
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <>
            <Container >
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>Manage Password</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                        <Typography variant='title' color={theme.palette.primary.primaryDmain}> Basic Info </Typography>
                        <Typography component={"p"} sx={{ mt: 3 }} variant='cardHeading' color={theme.palette.primary.lightGrey4}>Your password must be at least 8 character long, and contain at least one digit and one non-digit character</Typography>
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ mt: 2 }}>
                        <Typography sx={{ mb: 1 }} color={theme.palette.primary.primaryDmain} variant='cardHeading'>Old Password</Typography>
                        <TextField
                            name="oldPassword"
                            sx={{ my: 1 }}
                            variant="outlined"
                            fullWidth
                            type={passwordVisibility.old ? 'text' : 'password'}
                            placeholder='enter old password'
                            onChange={handleChange}
                            error={Boolean(touched.oldPassword && errors.oldPassword)}
                            helperText={touched.oldPassword && errors.oldPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('old')}
                                            edge="end"
                                        >
                                            {passwordVisibility.old ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Typography sx={{ mb: 1 }} color={theme.palette.primary.primaryDmain} variant='cardHeading'>New Password</Typography>
                        <TextField
                            name="newPassword"
                            sx={{ my: 1 }}
                            variant="outlined"
                            fullWidth
                            type={passwordVisibility.new ? 'text' : 'password'}
                            placeholder='enter new password'
                            onChange={handleChange}
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('new')}
                                            edge="end"
                                        >
                                            {passwordVisibility.new ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Typography sx={{ mb: 1 }} color={theme.palette.primary.primaryDmain} variant='cardHeading'>Confirm password</Typography>
                        <TextField
                            name="confirmPassword"
                            sx={{ my: 1 }}
                            variant="outlined"
                            fullWidth
                            type={passwordVisibility.confirm ? 'text' : 'password'}
                            placeholder='enter confirm password'
                            onChange={handleChange}
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                            edge="end"
                                        >
                                            {passwordVisibility.confirm ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ mt: 2, mb: 5 }}>
                        <LoadingButton
                            loading={load}
                            fullWidth
                            sx={{ height: 56 }}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Update Password
                        </LoadingButton>
                    </Grid>



                </Grid>
            </Container>
        </>
    )
}
