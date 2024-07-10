import CustomDialog from '@/components/Common/CustomDialog';
import { getAuth } from '@/redux/selectors/authSelectors';
import { getUser } from '@/redux/selectors/userSelectors';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Divider, FormHelperText, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { _userNameSchema } from './validationSchema';
import { updateUser } from '@/redux/slicers/user';
import VerifyNumber from '@/components/AuthScreens/VerifyNumber';
import VerifyOTP from './VerifyOTP';
import { showMessage } from '@/utils/helpers/toastHelpers';

const Names = {
    accountname: "Account Name",
    phone: "Phone Number",
    email: "Email Address",
    dob: "Date of Birth",
    verifyOtpPhone: "Verify Phone No",
    verifyOtpEmail: "Verify Email"
};

export default function Account() {
    const theme = useTheme()

    // Redux
    const { firstName, lastName, email, phone, dob, dialCode } = useSelector(getUser)
    const [openModal, setOpenModal] = useState({ name: "", open: false });

    const [load, setLoad] = useState(false)
    const [countries, setCountries] = useState([])


    const dispatch = useDispatch()

    // Sideeffects
    useEffect(() => {
        getCountries()
    }, [])

    // Formik
    let initialValues = {
        firstName, lastName,
        dialCode, phone, email
    }

    const getCountries = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.seller.getCountryCode
        })
        if (status) {
            setCountries(data?.rows?.map(country => ({ label: country?.dialCode, value: country?.dialCode })))
        }
    }

    const { values, handleChange, touched, errors, handleSubmit } = useFormik({
        initialValues,
        validationSchema: _userNameSchema,
        onSubmit: handleUpdate
    })

    async function handleUpdate() {
        setLoad(true)
        const { status, message } = await apiRequest({
            method: "PUT",
            endUrl: _apiUrls.user.userDetails,
            body: values
        })
        setLoad(false)
        if (status) {
            if (openModal.name === Names.phone) {
                handleOpenModal(Names.verifyOtpPhone)
            } else if (openModal.name === Names.email) {
                handleOpenModal(Names.verifyOtpEmail)
            } else {
                handleCloseModal()
                dispatch(updateUser(values))
                showMessage({ message })
            }
        }
    }

    // Helpers
    const handleOpenModal = (name) => setOpenModal({ name, open: true });
    const handleCloseModal = () => setOpenModal({ name: "", open: false });

    const handleVerification = () => {
        dispatch(updateUser(values))
        handleCloseModal()
    }

    return (
        <>
            <Container >
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='boldtext'> Profile Details</Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Box sx={{ position: 'relative', width: 100, }}>
                            <Box sx={{ backgroundColor: "#FFF0E7", p: 3, alignItems: 'center', justifyContent: 'center', display: 'flex', width: 100, height: 100, borderRadius: 1 }}>
                                <Typography color={"#DE5200"} variant='boldtext'>{firstName?.substr(0, 1)}{lastName?.substr(0, 1)}</Typography>
                            </Box>
                            <Box component="img" src="/assets/icons/edit.svg" sx={{ position: 'absolute', top: 52, right: -22, }} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                        <Typography variant='title' color={theme.palette.primary.primaryDmain}> Basic Info </Typography>
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ mt: 3 }}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Account name</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> {firstName} {lastName} </Typography>
                            </Box>
                            <IconButton>
                                <Box component="img" src="/assets/images/arrow-right.svg"
                                    onClick={() => handleOpenModal(Names.accountname)}
                                    sx={{ height: 20, width: 20, }} />
                            </IconButton>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Phone number</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'>{dialCode} {phone}</Typography>
                            </Box>
                            <IconButton>
                                <Box component="img" src="/assets/images/arrow-right.svg"
                                    onClick={() => handleOpenModal(Names.phone)}
                                    sx={{ height: 20, width: 20, }} />
                            </IconButton>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Email Id</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> {email} </Typography>
                            </Box>
                            <IconButton>
                                <Box component="img" src="/assets/images/arrow-right.svg"
                                    onClick={() => handleOpenModal(Names.email)}
                                    sx={{ height: 20, width: 20, }} />
                            </IconButton>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ mb: 5 }}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Date of birth</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'>{dob ? moment(dob).format("MMMM Do") : '---'}</Typography>
                            </Box>
                            <IconButton>
                                <Box component="img" src="/assets/images/arrow-right.svg"
                                    onClick={() => handleOpenModal(Names.dob)}
                                    sx={{ height: 20, width: 20, }} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            {/* Dialogs */}
            <CustomDialog
                maxWidth="md"
                heading={openModal.name}
                open={openModal.name}
                showBorderBottom={true}
                onClose={handleCloseModal} >

                {/* Account Name */}
                {
                    openModal?.name === Names.accountname &&
                    <>
                        <Typography color={theme.palette.primary.blackColor} sx={{ mb: 1, }} variant='cardText'>First Name</Typography>
                        <TextField
                            name='firstName'
                            sx={{ backgroundColor: theme.palette.primary.textFeildGrey, borderRadius: 1, my: 1, mb: 3 }}
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder='first name'
                            onChange={handleChange}
                            defaultValue={firstName}
                            error={Boolean(touched.firstName && errors?.firstName)}
                            helperText={touched.firstName && errors?.firstName}
                            maxLength={20}
                        />
                        <Typography color={theme.palette.primary.blackColor} sx={{ mb: 1, }} variant='cardText'>Last Name</Typography>
                        <TextField
                            name='lastName'
                            sx={{ backgroundColor: theme.palette.primary.textFeildGrey, borderRadius: 1, my: 1 }}
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder='last name'
                            onChange={handleChange}
                            defaultValue={lastName}
                            error={Boolean(touched.lastName && errors?.lastName)}
                            helperText={touched.lastName && errors?.lastName}
                            maxLength={20}
                        />

                        <LoadingButton loading={load} fullWidth sx={{ height: 56, width: "100%", mt: 5 }} variant="contained" onClick={handleSubmit}>
                            <Typography sx={{ fontSize: 16, }} variant='heading2'>Update account name</Typography>
                        </LoadingButton>
                    </>}

                {/* Phone */}
                {openModal?.name === Names.phone &&
                    <>
                        <Typography color={theme.palette.primary.blackColor} variant='cardText'>Phone Number</Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                            <Select
                                name="dialCode"
                                sx={{
                                    ...useStyles.selectFeild,
                                    backgroundColor: theme.palette.primary.textFeildGrey,
                                    pl: 1,
                                }}
                                defaultValue={dialCode}
                                onChange={handleChange}>
                                {
                                    countries?.map((country) => <MenuItem key={country?.label} value={country?.label}>{country?.label}</MenuItem>)
                                }
                            </Select>
                            <TextField
                                name="phone"
                                sx={{
                                    ...useStyles.phoneFeild,
                                    backgroundColor: theme.palette.primary.textFeildGrey,
                                }}
                                variant="outlined"
                                fullWidth
                                type='number'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                defaultValue={phone}
                                error={Boolean(touched.phone && errors?.phone)}
                                helperText={touched.phone && errors?.phone}
                                maxLength={14}
                            />
                        </Box>
                        {Boolean(errors.phone || errors.dialCode) && <FormHelperText style={{ paddingHorizontal: 0, paddingVertical: 0 }} type="error" visible={Boolean(errors?.phone || errors?.dialCode)}>{errors?.phone || errors?.dialCode}</FormHelperText>}

                        <LoadingButton loading={load} fullWidth sx={{ height: 56, width: "100%", mt: 5 }} variant="contained" onClick={handleSubmit}>
                            <Typography sx={{ fontSize: 16, }} variant='heading2'>Update phone number</Typography>
                        </LoadingButton>
                    </>}

                {/* Email */}
                {openModal.name === Names.email &&
                    <>
                        <Typography color={theme.palette.primary.blackColor} sx={{ mb: 1, }} variant='cardText'>Email Address</Typography>
                        <TextField
                            name="email"
                            sx={{ backgroundColor: theme.palette.primary.textFeildGrey, borderRadius: 1, my: 1 }}
                            variant="outlined"
                            fullWidth
                            placeholder='example@email.com'
                            onChange={handleChange}
                            defaultValue={email}
                            error={Boolean(touched.email && errors?.email)}
                            helperText={touched.email && errors?.email}
                            maxLength={25}
                        />
                        <LoadingButton loading={load} fullWidth sx={{ height: 56, width: "100%", mt: 5 }} variant="contained" onClick={handleSubmit}>
                            <Typography sx={{ fontSize: 16, }} variant='heading2'>Update email address</Typography>
                        </LoadingButton>
                    </>}

                {/* Email */}
                {openModal.name === Names.verifyOtpPhone &&
                    <VerifyOTP
                        dialCode={values.dialCode}
                        phone={values.phone}
                        onVerifyOTP={handleVerification}
                    />}

                {openModal.name === Names.verifyOtpEmail &&
                    <VerifyOTP
                        email={values.email}
                        onVerifyOTP={handleVerification}
                    />}
            </CustomDialog>
        </>
    )
}


const useStyles = {
    selectFeild: {
        borderRadius: 0, width: 120,
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