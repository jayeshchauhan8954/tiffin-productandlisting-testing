import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Chip, Stack, TextField, Typography, useTheme, ButtonBase } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Star } from '@mui/icons-material'
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import * as Yup from 'yup'
import { useFormik } from 'formik';


export default function ReviewOrder({ item ,onAction=()=>{}}) {
    const [load, setLoad] = useState(false)

    // formik
    let initialValues = {
        rating: '',
        description: ''
    }

    const { values, setFieldValue, touched, errors, handleSubmit, handleChange } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            rating: Yup.number().required("Please select rating."),
            description: Yup.string().required("Please share feedback.")
        }),
        onSubmit: () => handleRatingSubmit()
    })

    // api call
    const handleRatingSubmit = async () => {

        setLoad(true)
        const { status } = await apiRequest({
            endUrl: _apiUrls.user.rating,
            method: "POST",
            body: {
                ...values,
                orderDetailId: item.orderDetails?._id,
                productId: item.orderDetails.productDetails._id
            },
            showMessage: true,
        })
        setLoad(false)
        if (status) {
            onAction()
        }
    }

    // Helpers
    const handleRatingChange = (value) => () => setFieldValue("rating", value)


    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant='heading3' >Rate Order</Typography>
            <Stack gap={1} flexDirection={'row'} mb={2} mt={1}>
                {
                    [1, 2, 3, 4, 5].map((rate) => <RatingChip
                        active={values.rating >= parseFloat(rate)}
                        key={rate}
                        rating={parseFloat(rate).toFixed(1)}
                        onClick={handleRatingChange(parseFloat(rate))}
                    />)
                }
            </Stack>

            <Typography variant='heading2'>Share Feedback</Typography>
            <TextField
                name='description'
                multiline
                fullWidth
                placeholder='Please share details of your experience.'
                onChange={handleChange("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                rows={5}
                sx={{ mt: 1 }}
            />

            <LoadingButton
            loading={load}
                fullWidth
                sx={{ mt: 2, height: 53 }}
                variant='contained'
                onClick={handleSubmit}
                >
                Submit Review
            </LoadingButton>
            {/* <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext> */}
        </Box>
    );
}

export const RatingChip = ({ active = false, rating = 1.1, onClick = () => { } }) => {
    const theme = useTheme()

    return (<>
        <ButtonBase onClick={onClick}>
            <Chip
                label={
                    <Stack flexDirection={'row'} alignContent={'center'} gap={1} justifyContent={'center'}>
                        <Typography sx={{ fontSize: 10 }}>{rating}</Typography>
                        <Star fontSize='small' sx={{ fontSize: 10, mt: 0.3 }} />
                    </Stack>
                }
                sx={{
                    height: 24,
                    borderRadius: 0.5,
                    border: `1px solid ${active ? '#5E8726' : theme.palette.primary.primaryDGrey}`,
                    backgroundColor: active ? '#5E8726' : theme.palette.common.white,
                    color: active ? theme.palette.common.white : theme.palette.primary.primaryDGrey
                }} />
        </ButtonBase>
    </>)
}