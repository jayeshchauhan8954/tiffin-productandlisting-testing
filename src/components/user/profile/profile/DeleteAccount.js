import { Box, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomDialog from '@/components/Common/CustomDialog';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { setAuth } from '@/redux/slicers/auth';
import { removeAuthCookie } from '@/utils/helpers/authHelpers';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';

export default function DeleteAccount() {
    const theme = useTheme()
    const dispatch = useDispatch()

    // States
    const [openModal, setOpenModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [load, setLoad] = useState(false)

    // Helpers
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleDeleteAccount = async () => {
        setLoad(true)
        let { success } = await apiRequest({
            method: "DELETE",
            endUrl: _apiUrls.auth.deleteAccount,
            showMsg: true
        })
        setLoad(false)
        if (success) {
            handleLogout()
        }
    }

    const handleLogout = () => {
        dispatch(setAuth({ token: '', isAuth: false, userType: '' }))
        removeAuthCookie()
    }

    return (
        <>
            <Container >
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>Account Security</Typography>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                        <Typography variant='title' color={theme.palette.primary.primaryDmain}> Delete Account </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{}}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component={"img"} src='/assets/icons/trash.svg' sx={{ mr: 1 }} />
                            <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.lightGrey4}>This action will erase your data from our database, and you cease to be a TiffinStash user.</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{}}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component={"img"} src='/assets/icons/rotate-left.svg' sx={{ mr: 1 }} />
                            <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.lightGrey4}>You’ll have to create a new account to undo this action after the recovery period and use our services again.</Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                        <Typography variant='title'>Before you go, you can </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{}}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component={"img"} src='/assets/icons/chat.svg' sx={{ mr: 1 }} />
                            <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.lightGrey4}>Chat with us</Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <TextField
                            sx={{ backgroundColor: theme.palette.primary.primaryGray7, borderRadius: 1, my: 1 }}
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            placeholder='Tell us your reasons for leaving'
                        />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Box sx={{ border: 1, p: 2, borderRadius: 1, borderColor: "#E3E4E9" }}>
                            <Stack direction={"row"} alignItems={"flex-start"}>
                                <Box component={"img"} src='/assets/icons/wish.svg' sx={{ mr: 1 }} />
                                <Stack>
                                    <Typography component={"p"} variant='heading4' color={theme.palette.primary.primaryDmain2}>We’re sad to see you go</Typography>
                                    <Typography component={"p"} variant='small1' color={theme.palette.primary.primaryDmain} sx={{ mt: 1 }}>TiffinStash will keep your account information for a recovery period of 30 days, and any login access will activate it. If you do not log in within the next 30 days, we will permanently delete your account. Please note that any balance in your wallet or rewards account will also be permanently deleted.</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={10} sx={{ mt: 2, mb: 5 }}>
                        <LoadingButton
                            onClick={handleOpenModal}
                            fullWidth
                            sx={{ height: 56 }}
                            variant="contained">
                            Delete My Account
                        </LoadingButton>
                    </Grid>



                </Grid>
            </Container>


            {/* Delete account confirmation */}
            <CustomDialog
                maxWidth="md"
                heading={"Delete Confirmation"}
                open={openModal}
                showBorderBottom={true}
                onClose={handleCloseModal}>

                <Typography variant='cardHeading' color={theme.palette.primary.primaryDmain} >You are about to delete your TiffinStash account, for security reasons, you are required to enter your password and verify your identity in order to request account deletion. </Typography>
                <Typography sx={{ mb: 1, mt: 3 }} component={"p"} color={theme.palette.primary.primaryDmain2} variant='cardText'>Password *</Typography>
                <TextField
                    sx={{ backgroundColor: theme.palette.primary.contrastText, borderRadius: 1, my: 1 }}
                    variant="outlined"
                    fullWidth
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
                <LoadingButton fullWidth sx={{ height: 56, width: "100%", mt: 5 }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Confirm Delete</Typography>
                </LoadingButton>
            </CustomDialog>
        </>
    )
}
