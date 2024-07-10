import CustomTable from '@/components/Common/CustomTable'
import Label from '@/components/Common/Label'
import { apiRequest } from '@/utils/config/apiRequest'
import { _profileStatus, _status, _toastVariants } from '@/utils/constants/constants'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import { showMessage } from '@/utils/helpers/toastHelpers'
import { Autocomplete, Box, Button, ButtonGroup, Card, Chip, Divider, Grid, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'

// Icons
import { Delete as DeleteIcon } from '@mui/icons-material'
import CustomDialog from '@/components/Common/CustomDialog'
// import AddVaraints from './AddVaraints'
// import VariantCard from './VariantCard'
import NoData from '@/components/Common/NoData'
import AddVaraints from './AddVariant'
import VariantCard from './VariantCard'

let _activePlanName = {
    trial: 'Trial',
    weekly: 'Weekly',
    monthly: 'Monthly'
}

export default function ProductVariants({ productId, mealPlans = [], availableCities = [], deliveryTimes = [], seller }) {
    const theme = useTheme()

    const [model, setModel] = useState({ open: false, data: {} })
    const [variants, setVariants] = useState([])
    const [filteredVariants, setFilteredVariants] = useState([])

    const [activePlan, setActivePlan] = useState(_activePlanName.trial)

    useEffect(() => {
        fetchProductVariants()
    }, [])

    const fetchProductVariants = async () => {
        handleModelClose()
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.products.getVariants,
            query: { productId, paginate: 0 }
        })

        if (status) {
            setFilteredVariants(formatResponse(data)?.filter(vrt => vrt?.mealPlans?.some(item => item?.name === activePlan)))
            setVariants(formatResponse(data))
        }
    }

    // Helpers
    const handleModelClose = () => setModel({ ...model, open: false })
    const handleModelOpen = (data) => setModel({ ...model, open: true, data })

    const handleActivePlan = (name) => () => {
        setFilteredVariants(variants?.filter(vrt => vrt?.mealPlans?.some(item => item?.name === name)))
        setActivePlan(name)
    }


    const formatResponse = (data) => {
        return data?.map(vrt => ({
            _id: vrt?._id,
            deliveryTimes: vrt?.deliveryTimes?.map(item => ({
                _id: item?._id?._id,
                name: item?._id?.name,
                from: item?._id?.from,
                to: item?._id?.to,
                availableCities: item?.availableCities
            })),
            items: vrt?.items,
            mealPlans: vrt?.mealPlans?.map(item => ({
                _id: item?._id?._id,
                name: item?._id?.name,
                rate: item?.rate,
                targetMargin: item?.targetMargin
            })),
            mealTypeId: vrt?.mealTypeId,
            media: vrt?.media,
            productId: vrt?.productId,
            sku: vrt?.sku,
            stock: vrt?.stock
        }))
    }

    return (
        <Card sx={{ p: 2 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='subtitle1'>Variants</Typography>
                <Button size='small' onClick={handleModelOpen}>Add Variant</Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            {/* Tabbing */}
            <ButtonGroup>
                <Button onClick={handleActivePlan(_activePlanName.trial)} size='small' variant={activePlan === _activePlanName.trial ? 'contained' : 'outlined'}>Trial</Button>
                <Button onClick={handleActivePlan(_activePlanName.weekly)} size='small' variant={activePlan === _activePlanName.weekly ? 'contained' : 'outlined'}>Weekly</Button>
                <Button onClick={handleActivePlan(_activePlanName.monthly)} size='small' variant={activePlan === _activePlanName.monthly ? 'contained' : 'outlined'}>Monthly</Button>
            </ButtonGroup>

            {/* Variants */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {
                    filteredVariants?.length ? filteredVariants?.map((vrt, i) => <Grid key={`var_${i}`} item md={6} sx={12}>
                        <VariantCard mealPlan={activePlan} itemInfo={vrt} onEdit={() => handleModelOpen(vrt)} />
                    </Grid>) :
                        <NoData text={'No variant added yet.'} />
                }
            </Grid>

            {/* Model  */}
            <CustomDialog open={model.open} heading={'Variants'} onClose={handleModelClose}>
                <AddVaraints
                    seller={seller}
                    productId={productId}
                    mealPlans={mealPlans}
                    availableCities={availableCities}
                    deliveryTimes={deliveryTimes}
                    onAction={fetchProductVariants}
                    itemInfo={model?.data}
                />
            </CustomDialog>
        </Card>
    )
}
