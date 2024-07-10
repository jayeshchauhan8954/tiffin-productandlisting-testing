import React, { useState } from 'react'
import { Grid, TextField, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { apiRequest } from '@/utils/config/apiRequest'
import { _apiUrls } from '@/utils/endPoints/apiUrls'

export default function Discount({ cartId, couponCode = {}, setCouponCode = () => { } }) {
    const theme = useTheme()

    const [coupon, setCoupon] = useState(couponCode?.code)
    const [load, setLoad] = useState(false)

    const handleApplyCoupon = async () => {
        setLoad(true)
        const { status, data } = await apiRequest({
            endUrl: _apiUrls.user.couponPrice,
            method: 'POST',
            body: {
                cartId,
                couponCode: coupon
            },
            showMsg: true
        })
        setLoad(false)
        if (status) {
            setCouponCode(data)
        }
    }
    return (
        <>
            <Grid container>
                <Grid xs={12} md={12}>
                    <TextField
                        disabled={Boolean(couponCode?.code)}
                        fullWidth
                        placeholder='Enter discount code or gift card'
                        sx={{ backgroundColor: theme.palette.primary.lighterGray }}
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <LoadingButton
                        disabled={Boolean(couponCode?.code) || !coupon}
                        loading={load}
                        sx={{ mt: 2, height: 56 }}
                        fullWidth
                        variant='contained'
                        onClick={handleApplyCoupon}
                    >Apply</LoadingButton>
                </Grid>
            </Grid>
        </>
    )
}
