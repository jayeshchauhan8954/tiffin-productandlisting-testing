'use client';
import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Typography, ListItemIcon, Grid, useTheme, NativeSelect, Autocomplete } from '@mui/material';
import { fontName } from '@/utils/fonts/Font';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { showMessage } from '@/utils/helpers/toastHelpers';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

export default function BusinessFrom() {
    const theme = useTheme()

    const list = [
        {
            id: 1,
            value: "Sell on TiffinStash, Delivered by TiffinStash (TD)",
        },
        {
            id: 2,
            value: "Sell on TiffinStash, Self-Delivery (VD)",
        },
        {
            id: 3,
            value: "Sell on your own Channel, Delivered by TiffinStash Delivery Network Inc. (SD)",
        }
    ]

    const countryCodes = [
        { name: 'US', code: '+1' },
        { name: 'CA', code: '+2' },
        { name: 'GB', code: '+44' },
        { name: 'IN', code: '+91' },
    ]

    const [state, setState] = useState({
        businessName: '',
        email: '',
        countryCode: '',
        phone: '',
        businessModel: [],
    })

    const [load, setLoad] = useState(false)

    const [businessId, setBusinessId] = useState([])
    const handleBusinessModel = (selectedModels) => {
        const ids = selectedModels.map(model => model.id);
        setBusinessId(ids);
    };


    console.log("business ids--", businessId)


    const Login = async () => {
        const reqData = {
            businessName: state.businessName,
            email: state.email,
            countryCode: state.countryCode,
            phone: state.phone,
            businessModel: businessId,
        }
        console.log(reqData, "sdas")
        setLoad(true)
        const { data, message, status } = await apiRequest({
            endUrl: _apiUrls.sellerLogin,
            method: "POST",
            body: reqData,
        })
        setLoad(false)
        console.log("data------->>", data, message, success)
        if (status) {
            showMessage({ message: message, })
        }
    }


    return (
        <>
            <Box
                component="form"
                sx={{
                    p: 3,
                    boxShadow: 3,
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, my: 1 }}
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder='Business Name'
                            value={state.businessName}
                            onChange={(e) => setState({ ...state, businessName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <TextField
                            sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, }}
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder='Email ID'
                            value={state.email}
                            onChange={(e) => setState({ ...state, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6} md={7}>
                        <Box display="flex" alignItems="center">
                            <FormControl fullWidth>
                                <NativeSelect
                                    defaultValue={30}
                                    value={state.countryCode}
                                    onChange={(e) => setState({ ...state, countryCode: e.target.value })}
                                    inputProps={{
                                        id: 'uncontrolled-native',
                                    }}
                                    sx={{
                                        height: 56,
                                        backgroundColor: theme.palette.primary.primaryGray5, pl: 1,
                                        '& select': {
                                            borderBottom: 'none',
                                            borderRadius: "10px",
                                        },
                                        '&:before, &:after': {
                                            borderBottom: 'none !important',
                                            borderRadius: "10px"
                                        },
                                    }}
                                >
                                    {countryCodes.map((country) => (
                                        <option key={country.code} value={country.code}>{country.name}</option>
                                    ))}
                                </NativeSelect>
                            </FormControl>
                            <TextField
                                sx={{
                                    backgroundColor: theme.palette.primary.primaryGray5,
                                    borderRadius: 1,
                                    flexGrow: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "0px !important",
                                        borderTopRightRadius: "10px !important",
                                        borderBottomRightRadius: "10px !important"
                                    },
                                }}
                                variant="outlined"
                                fullWidth
                                type='number'
                                placeholder='Phone Number'
                                value={state.phone}
                                onChange={(e) => setState({ ...state, phone: e.target.value })}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Autocomplete
                            multiple
                            id="business-model"
                            options={list}
                            getOptionLabel={(option) => option.value}
                            value={state.businessModel}
                            onChange={(event, newValue) => {
                                setState({ ...state, businessModel: newValue });
                                handleBusinessModel(newValue); console.log("value---", event)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Business Model"
                                    placeholder="Select your business type"
                                    variant="outlined"
                                    sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1 }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <LoadingButton
                            fullWidth
                            onClick={Login}
                            sx={{
                                height: '56px', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText,
                                '&:hover': { backgroundColor: theme.palette.primary.main, }
                            }}
                            loading={load}
                            variant="outlined">
                            Get Started
                        </LoadingButton>
                    </Grid>

                    <Typography sx={{ textAlign: 'center', mt: 3, ml: 2 }} variant="small1" color={theme.palette.primary.textGray1}>
                        By clicking "Get Started," I agree to receive marketing communications via electronic means from TiffinStash
                    </Typography>
                </Grid>
            </Box>
        </>
    )
}
