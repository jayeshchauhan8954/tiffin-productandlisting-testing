'use client';
import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, Typography, Grid, useTheme, Autocomplete, FormHelperText, Chip } from '@mui/material';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { showMessage } from '@/utils/helpers/toastHelpers';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { _businessTypes } from '@/utils/constants/constants';
import { useFormik } from 'formik';
import { _onboardSchema } from './validationSchema';

// Business Types
const list = [
  { id: 1, value: _businessTypes.td },
  { id: 2, value: _businessTypes.vd },
  { id: 3, value: _businessTypes.sd }
]

export default function SellerForm() {
  const theme = useTheme()

  // States
  const [load, setLoad] = useState(false)
  const [countryList, setCountryList] = useState([]);
  const [businessId, setBusinessId] = useState([])

  useEffect(() => {
    getCountry()
  }, [])


  // formik
  const initialValues = {
    businessName: '',
    email: '',
    country: '',
    dialCode: '',
    phone: '',
    businessModel: [],
  }

  const { values, setValues, setFieldValue, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues,
    validationSchema: _onboardSchema,
    onSubmit: () => handleOnboardSubmit()
  })

  const getCountry = async () => {
    const { data, status } = await apiRequest({
      endUrl: _apiUrls.seller.getCountryCode,
      method: "GET",
    })
    if (status) {
      setCountryList(data.rows)
      setFieldValue("dialCode", data?.rows?.[0]?.dialCode)
    }
  }

  const handleOnboardSubmit = async () => {
    const payload = {
      firstName:'Seller Onboard',
      businessName: values.businessName,
      email: values.email,
      dialCode: values.dialCode,
      phone: values.phone,
      businessModel: values.businessModel?.map(item => item?.id),
    }
    setLoad(true)
    const { status } = await apiRequest({
      endUrl: _apiUrls.seller.sellerOnbord,
      method: "POST",
      body: payload,
      showMsg: true
    })
    setLoad(false)
  }

  const handleBusinessModel = (_, newValue) => setFieldValue("businessModel", newValue)

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.primary.contrastText, borderRadius: 4, p: 3, mt: { xs: 1, md: 7 }, py: 5 }}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid item xs={12} md={12} textAlign={"center"}>
            <Typography variant='title' fontSize={16}>Join us, list your tiffin service, and start selling.</Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              name='businessName'
              variant="outlined"
              fullWidth
              placeholder='Business Name'
              value={values.businessName}
              onChange={handleChange}
              error={Boolean(touched.businessName && errors.businessName)}
              helperText={touched.businessName && errors.businessName}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              name='email'
              variant="outlined"
              fullWidth
              placeholder='Email ID'
              value={values.email}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box display="flex" alignItems="center">
              <Select
                id="simple-select"
                value={values.dialCode}
                onChange={handleChange('dialCode')}
                error={Boolean(touched.dialCode && errors?.dialCode)}
                sx={{
                  ...useStyles.selectFeild,
                  backgroundColor: theme.palette.primary.primaryGray5,
                  width: 80
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
                sx={{ ...useStyles.phoneFeild }}
                error={Boolean(touched.phone && errors?.phone)}
              />
            </Box>

            <FormHelperText error={Boolean((touched.phone || touched.dialCode) && (errors?.phone || touched.dialCode))}>
              {(touched.phone || touched?.dialCode) && (errors?.phone || errors?.dialCode)}
            </FormHelperText>
          </Grid>

          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              id="business-model"
              options={list}
              getOptionLabel={(option) => option.value}
              value={values.businessModel}
              onChange={handleBusinessModel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select your business type"
                  variant="outlined"
                  error={Boolean(touched.businessModel && errors.businessModel)}
                  helperText={touched.businessModel && errors.businessModel}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={<Typography variant='subtitle' style={{ whiteSpace: 'normal' }}>{option.value}</Typography>}
                    {...getTagProps({ index })}
                    style={{ height: "100%" }}
                  />
                ))
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <LoadingButton
              fullWidth
              onClick={handleSubmit}
              sx={{
                height: '56px',
                mt: 2,
                // backgroundColor: theme.palette.primary.main,
                // color: theme.palette.primary.contrastText,
                // '&:hover': { backgroundColor: theme.palette.primary.main }
              }}
              loading={load}
              variant="contained">
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



const useStyles = {
  selectFeild: {
    borderRadius: 0, width: 150,
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
