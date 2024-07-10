import { apiRequest } from '@/utils/config/apiRequest';
import { _otpTypes } from '@/utils/constants/constants';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'

export default function VerifyNumber({ phone, dialCode, onVerifyOTP = () => { } }) {
    const theme = useTheme()

    // Refs
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [otp, setOtp] = useState(['', '', '', ''])
    const [load, setLoad] = useState(false)

    const handleVerifyOTP = async () => {
        setLoad(true)
        const { status } = await apiRequest({
            method: 'POST',
            endUrl: _apiUrls.auth.verifyOTP,
            body: { type: _otpTypes.sms, otp: otp?.join(""), phone },
            showMsg: true
        })
        setLoad(false)
        if (status) {
            onVerifyOTP()
        }
    }

    const handleResendOTP = async () => {
        setLoad(true)
        await apiRequest({
            method: 'POST',
            endUrl: _apiUrls.auth.resendOTP,
            body: { type: _otpTypes.sms, phone },
            showMsg: true
        })
        setLoad(false)
    }

    // helper
    const handleValueChange = (text, index) => {
        let tmp = [...otp]
        tmp[index] = text
        setOtp(tmp)

        if (text.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
        else if (text.length === 0 && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <>
            <Grid container>
                <Grid xs={12} md={12}>
                    <Stack sx={{ alignItems: 'center' }}>
                        <Typography variant='title' color={theme.palette.primary.blackColor}>Verify Phone Number</Typography>
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryGray4} sx={{ mt: 1 }}>Please enter the 4 digit code we sent to </Typography>
                        <Typography variant='cardText' color={theme.palette.primary.primaryDmain2}>{dialCode} {phone}</Typography>
                    </Stack>
                </Grid>
                <Grid xs={12} md={8} sx={{ margin: "auto", my: 5 }}>
                    <Stack direction={"row"} spacing={2}>
                        {
                            otp.map((_, index) => <TextField
                                inputRef={inputRefs[index]}
                                key={`otp_${index}`}
                                value={otp[index]}
                                sx={{ backgroundColor: theme.palette.primary.textGray, borderRadius: 1, my: 1, textAlign: 'center' }}
                                variant="outlined"
                                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value)) {
                                        handleValueChange(e.target.value, index)
                                    }
                                }}
                            />
                            )}
                    </Stack>
                </Grid>

                <Grid xs={12} md={12}>
                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography color={theme.palette.primary.main} sx={{ textDecorationLine: 'underline' }} fontSize={16} variant='small1' onClick={handleResendOTP}>Resend Code</Typography>
                    </Stack>
                </Grid>

                <Grid xs={12} md={12}>
                    <LoadingButton
                        disabled={!otp?.every(val => val)}
                        loading={load}
                        fullWidth
                        sx={{ height: 56, mt: 4 }}
                        variant="contained"
                        onClick={handleVerifyOTP}
                    >
                        Verify phone number
                    </LoadingButton>
                </Grid>
            </Grid>
        </>
    )
}
