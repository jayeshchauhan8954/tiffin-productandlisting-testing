import { Box, Grid, Stack, TextField, Typography, useTheme, IconButton, InputAdornment, MenuItem, Select, FormHelperText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { fontName } from '@/utils/fonts/Font';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { useFormik } from 'formik';
import { _signupSchema } from './Validation';
import { LoadingButton } from '@mui/lab';
import { getNumbersOnly } from '@/utils/helpers/appHelpers';

export default function Signup({ onSuccess = (email) => { } }) {
    const theme = useTheme()

    // states
    const [load, setLoad] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        getCountry();
    }, [])


    // helpers
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    let initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        dialCode: '',
        password: ''
    }

    const { values, setFieldValue, handleChange, handleSubmit, touched, errors } = useFormik({
        initialValues,
        validationSchema: _signupSchema,
        onSubmit: () => handleSignup()
    })

    // Country
    const getCountry = async () => {
        const { data, message, status } = await apiRequest({
            endUrl: _apiUrls.seller.getCountryCode,
            method: "GET",
        })
        if (status) {
            setCountryList(data.rows)
            setFieldValue("dialCode", data?.rows?.[0]?.dialCode)
        }
    }

    const handleSignup = async () => {
        setLoad(true)
        const {status } = await apiRequest({
            endUrl: _apiUrls.auth.register,
            method: 'POST',
            body: values,
            showMsg:true
        })
        setLoad(false)
        if (status) {
            onSuccess(values.dialCode, values.phone)
        }
    }

    return (
        <>
            <Grid container>
                <Grid xs={12} md={12}>
                    <Typography color={theme.palette.primary.blackColor} sx={{ mb: 1 }} variant='cardText'>Email address <span style={{ color: theme.palette.error.main }}>*</span></Typography>
                    <TextField
                        name="email"
                        variant="outlined"
                        fullWidth
                        placeholder='example@email.com'
                        value={values.email}
                        onChange={handleChange}
                        sx={{ my: 1 }}
                        error={Boolean(touched.email && errors?.email)}
                        helperText={touched.email && errors?.email}
                        inputProps={{ maxLength: 40 }}
                    />
                </Grid>
                <Grid xs={12} md={12} sx={{ mt: 1 }}>
                    <Typography sx={{ mb: 1 }} color={theme.palette.primary.blackColor} variant='cardText'>First name <span style={{ color: theme.palette.error.main }}>*</span></Typography>
                    <TextField
                        name='firstName'
                        variant="outlined"
                        fullWidth
                        placeholder='enter first name'
                        value={values.firstName}
                        onChange={handleChange}
                        sx={{ my: 1 }}
                        inputProps={{ maxLength: 20 }}
                        error={Boolean(touched.firstName && errors?.firstName)}
                        helperText={touched.firstName && errors?.firstName}
                    />
                </Grid>
                <Grid xs={12} md={12} sx={{ mt: 1 }}>
                    <Typography color={theme.palette.primary.blackColor} sx={{ mb: 1, }} variant='cardText'> Last name</Typography>
                    <TextField
                        name="lastName"
                        variant="outlined"
                        fullWidth
                        placeholder='enter last name'
                        value={values.lastName}
                        onChange={handleChange}
                        sx={{ my: 1 }}
                        inputProps={{ maxLength: 20 }}

                    />
                </Grid>
                <Grid xs={12} md={12} sx={{ mt: 1 }}>
                    <Typography color={theme.palette.primary.blackColor} variant='cardText'>Phone number <span style={{ color: theme.palette.error.main }}>*</span></Typography>
                    <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                        <Select
                            id="demo-simple-select"
                            value={values.dialCode}
                            onChange={handleChange('dialCode')}
                            error={Boolean(touched.dialCode && errors?.dialCode)}
                            sx={{
                                ...useStyles.selectFeild,
                                backgroundColor: theme.palette.primary.primaryGray5,
                                pl: 1,
                            }}
                        >
                            {
                                countryList.map(country => (
                                    <MenuItem key={country._id} value={country.dialCode}>
                                        {country.dialCode}
                                    </MenuItem>
                                ))}
                        </Select>

                        <TextField
                            name='phone'
                            variant="outlined"
                            fullWidth
                            placeholder='Phone Number'
                            value={values.phone}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                    handleChange(e)
                                }
                            }}
                            inputProps={{ maxLength: 12 }}
                            sx={{ my: 1, ...useStyles.phoneFeild }}
                            error={Boolean(touched.phone && errors?.phone)}
                        />
                    </Box>

                    <FormHelperText error={Boolean((touched.phone || touched.dialCode) && (errors?.phone || touched.dialCode))}>
                        {(touched.phone || touched?.dialCode) && (errors?.phone || errors?.dialCode)}
                    </FormHelperText>
                </Grid>

                <Grid xs={12} md={12} sx={{ mt: 1 }}>
                    <Typography sx={{ mb: 1 }} color={theme.palette.primary.blackColor} variant='cardText'>Password <span style={{ color: theme.palette.error.main }}>*</span></Typography>
                    <TextField
                        name='password'
                        variant="outlined"
                        fullWidth
                        value={values.password}
                        onChange={handleChange}
                        error={Boolean(touched.password && errors?.password)}
                        helperText={touched.password && errors?.password}
                        placeholder='enter password'
                        type={showPassword ? 'text' : 'password'}
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
                            )
                        }}
                        sx={{ my: 1 }}
                        inputProps={{ maxLength: 30 }}
                    />
                </Grid>

                <Grid xs={12} md={12}>
                    <LoadingButton
                        loading={load}
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ height: 56, my: 2 }}
                        variant="contained">
                        Sign Up
                    </LoadingButton>
                </Grid>

                <Grid xs={12} md={12}>
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

const useStyles = {
    selectFeild: {
        borderRadius: 0, width: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    phoneFeild: {
        borderRadius: 1,
        flexGrow: 1,
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px !important",
            borderTopRightRadius: "10px !important",
            borderBottomRightRadius: "10px !important"
        },
    }
}
