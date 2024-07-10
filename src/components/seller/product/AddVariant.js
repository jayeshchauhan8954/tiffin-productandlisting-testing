import CustomSelectFile from '@/components/Common/CustomSelectFile'
import { apiRequest } from '@/utils/config/apiRequest'
import { _s3Directories, _toastVariants } from '@/utils/constants/constants'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import { fileUploadToS3 } from '@/utils/helpers/fileHelper'
import { showMessage } from '@/utils/helpers/toastHelpers'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, Button, Chip, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function AddVaraints({ productId, mealPlans = [], availableCities = [], deliveryTimes = [], onAction = () => { }, itemInfo = {}, seller }) {
    const [load, setLoad] = useState(false)
    // Master listing
    const [mealTypes, setMealTypes] = useState([])
    const [items, setItems] = useState([])
    // Selected values
    const [selMealPlan, setSelMealPlan] = useState(itemInfo?.mealPlans || [])
    const [selMealType, setSelMealType] = useState(itemInfo?.mealTypeId || null)
    const [selItems, setSelItems] = useState(itemInfo?.items || [])
    const [itemDet, setItemDet] = useState({ _id: null, name: '', qty: '', uom: '' })
    const [planDet, setPlanDet] = useState({ _id: null, name: '', days: '', rate: 0, targetMargin: 0 })
    const [media, setMedia] = useState(itemInfo?.media)
    const [itemStatus, setItemStatus] = useState(itemInfo?.status || '')

    const getDefaultDeliveryTime = () => {
        let tmp = []
        deliveryTimes.forEach((time, idx) => {
            tmp.push({ ...time, availableCities: [] })
            availableCities?.forEach((city) => {
                tmp[idx].availableCities.push(city)
            })
        })
        return tmp
    }

    const [selDelTimeDet, setSelDelTimeDet] = useState(itemInfo?.deliveryTimes || getDefaultDeliveryTime())

    useEffect(() => {
        // Masters apis
        fetchMealType()
        fetchItems()
    }, [])

    // Meal Type
    const fetchMealType = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.mealType,
            query: { productId, paginate: 0 }
        })
        if (status) {
            setMealTypes(data?.rows)
        }
    }
    // Meal Plan
    const fetchItems = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.items.getItems,
            query: { sellerId: seller?._id, paginate: 0 }
        })
        if (status) {
            setItems(data?.rows)
        }
    }

    const handleAddVariants = async (_id) => {
        setLoad(true)
        let payload = {
            ...(itemInfo?._id && { _id: itemInfo?._id }),
            productId,
            itemStatus,
            mealTypeId: selMealType?._id,
            mealPlans: selMealPlan,
            media: (await fileUploadToS3([media], _s3Directories.product))?.[0],
            items: selItems,
            deliveryTimes: selDelTimeDet.filter(time => time?.availableCities?.length > 0)
                ?.map((time) => ({
                    ...time,
                    availableCities: time?.availableCities
                        ?.map(city => city?._id)
                }))
        }
        let { status } = await apiRequest({
            method: itemInfo?._id ? "PUT" : "POST",
            endUrl: _apiUrls.masters.products.variant,
            body: payload,
            showMsg: true
        })
        setLoad(false)
        if (status) {
            onAction()
        }
    }

    // Items details
    const handleAddItems = () => {
        if (!itemDet?._id) {
            return showMessage({ message: "Please select items", variant: _toastVariants.Error })
        } else if (!itemDet?.qty || parseFloat(itemDet?.qty) <= 0) {
            return showMessage({ message: "Please enter item quantity", variant: _toastVariants.Error })
        } else if (selItems?.some(item => (item?._id == itemDet._id) && (item?.qty == itemDet.qty))) {
            return showMessage({ message: "Item already exist.", variant: _toastVariants.Error })
        }

        let tmp = [...selItems]
        tmp.push(itemDet)

        setSelItems(tmp) /** Add Items to array */
        setItemDet({}) /** Remove Item */
    }
    const handleItemDelete = (index) => () => {
        let tmp = [...selItems]
        tmp.splice(index, 1)
        setSelItems(tmp)
    }

    // Plan details
    const handleAddPlans = () => {
        if (!planDet?._id) {
            return showMessage({ message: "Please select plan", variant: _toastVariants.Error })
        } else if (!planDet?.rate || parseFloat(planDet?.rate) <= 0) {
            return showMessage({ message: "Please enter plan rate", variant: _toastVariants.Error })
        }

        let tmp = [...selMealPlan]
        tmp.push(planDet)

        setSelMealPlan(tmp) /** Add Items to array */
        setPlanDet() /** Remove Plan */
    }
    const handlePlanDelete = (index) => () => {
        let tmp = [...selMealPlan]
        tmp.splice(index, 1)
        setSelMealPlan(tmp)
    }

    // Handle City Select
    const handleCitySelect = (idx, newValue) => {
        let tmp = [...selDelTimeDet]
        tmp[idx].availableCities = newValue
        setSelDelTimeDet(tmp)
    }
    return (
        <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2'>Meal Type</Typography>
                <Autocomplete
                    name="mealType"
                    fullWidth
                    options={mealTypes?.filter(item => item?._id !== selMealType?._id)}
                    value={selMealType}
                    getOptionLabel={(option) => option?.name}
                    onChange={(_, newValue) => setSelMealType(newValue)}
                    isOptionEqualToValue={(option, value) => option._id === value?.id}
                    renderInput={(params) => <TextField
                        {...params}
                        autoComplete='off'
                        variant="outlined"
                        size="small"
                        placeholder='Meal Types'
                    />}
                    renderOption={(props, option) => (<li {...props} key={option?.name}>{option?.name}</li>)}
                />
            </Grid>

            <Grid item md={6} xs={12}>
                <Typography>Item Status</Typography>
                <Select
                    value={itemStatus}
                    onChange={(e) => setItemStatus(e.target.value)}
                    fullWidth
                    size='small'
                >
                    <MenuItem value={''}>--Select--</MenuItem>
                    <MenuItem key={'inActive'} value={'inActive'}>Inactive</MenuItem>

                </Select>
            </Grid>

            {/* ============= Item Details ============= */}
            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2'>Item Name</Typography>
                <Autocomplete
                    name="itemName"
                    fullWidth
                    options={items}
                    value={itemDet}
                    getOptionLabel={(option) => option?.name || ""}
                    onChange={(_, newValue) => setItemDet(newValue)}
                    isOptionEqualToValue={(option, value) => option._id === value?.id}
                    renderInput={(params) => <TextField
                        {...params}
                        autoComplete='off'
                        variant="outlined"
                        size="small"
                        placeholder='Item Name'
                    />}
                    renderOption={(props, option) => (<li {...props} key={option?.name}>{option?.name}</li>)}
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography variant='subtitle2'>Item  Quantity</Typography>
                <TextField
                    placeholder='Quantity'
                    size='small'
                    value={itemDet?.qty || ''}
                    type='number'
                    onChange={({ target }) => setItemDet({ ...itemDet, qty: target.value })} />
            </Grid>
            <Grid item md={2} xs={12}>
                <Button variant='text' size='small' sx={{ mt: 3 }} onClick={handleAddItems}>Add Item</Button>
            </Grid>
            {
                selItems?.length > 0 && <Grid item md={12} xs={12}>
                    <Stack direction={'row'} alignContent={'center'} gap={1} flexWrap={'wrap'}>
                        {
                            selItems?.map((item, index) => <Chip size='small' key={item?.name} variant='oultined' label={`${item?.name} (${item?.qty}) ${item?.uom}`} onDelete={handleItemDelete(index)} />)
                        }
                    </Stack>
                </Grid>
            }

            {/* ============= Plan Details ============= */}
            <Grid item md={4} xs={12}>
                <Typography variant='subtitle2'>Meal Plan</Typography>
                <Autocomplete
                    name="mealPlan"
                    fullWidth
                    options={mealPlans?.filter(plan => !selMealPlan?.some(item => item?._id === plan._id))}
                    value={planDet}
                    getOptionLabel={(option) => (option?.name + ' ' + option?.days)?.trim() || ''}
                    onChange={(_, newValue) => setPlanDet(newValue)}
                    isOptionEqualToValue={(option, value) => option._id === value?.id}
                    renderInput={(params) => <TextField
                        {...params}
                        autoComplete='off'
                        variant="outlined"
                        size="small"
                        placeholder='Meal Plan'
                    />}
                    renderOption={(props, option) => (<li {...props} key={option?.name}>{option?.name} ({option?.days})</li>)}
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <Typography variant='subtitle2'>Price</Typography>
                <TextField
                    size='small'
                    type='number'
                    onChange={({ target }) => setPlanDet({ ...planDet, rate: target.value })}
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <Typography variant='subtitle2'>Target Margin</Typography>
                <TextField
                    size='small'
                    type='number'
                    onChange={({ target }) => setPlanDet({ ...planDet, targetMargin: target.value })}
                />
            </Grid>
            <Grid item md={2} xs={12}>
                <Button sx={{ mt: 3 }} size='small' onClick={handleAddPlans}>Add Plan</Button>
            </Grid>

            {
                selMealPlan?.length > 0 && <Grid item md={12} xs={12}>
                    <Stack direction={'row'} alignContent={'center'} gap={0.5} flexWrap={'wrap'}>
                        {
                            selMealPlan?.map((item, index) => <Chip size='small' key={item?.name} variant='oultined' label={`${item?.name} - (CAD ${item.rate})`} onDelete={handlePlanDelete(index)} />)
                        }
                    </Stack>
                </Grid>
            }
            <Grid item md={12} xs={12}>
                <Typography variant='subtitle2'>Delivery Times</Typography>

                {
                    deliveryTimes?.map((item, i) =>
                        <Stack gap={0.5} key={item?.name} direction={'row'} sx={{ my: 1, alignItems: 'center' }}>
                            <Typography variant='subtitle2'>{item?.name}</Typography> :

                            <Autocomplete
                                multiple
                                name="availableCity"
                                fullWidth
                                options={availableCities}
                                value={selDelTimeDet?.[i]?.availableCities || []}
                                getOptionLabel={(option) => option?.name}
                                onChange={(_, newValue) => handleCitySelect(i, newValue)}
                                isOptionEqualToValue={(option, value) => option._id === value?.id}
                                renderInput={(params) => <TextField
                                    {...params}
                                    autoComplete='off'
                                    variant="outlined"
                                    size="small"
                                    placeholder='City'
                                />}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={<Typography variant='subtitle' style={{ whiteSpace: 'normal' }}>{option.name}</Typography>}
                                            {...getTagProps({ index })}
                                            style={{ height: "100%" }}
                                        />
                                    ))
                                }
                                renderOption={(props, option) => (<li {...props} key={option?.name}>{option?.name}</li>)}
                            />
                        </Stack>)
                }
            </Grid>
            <Grid item md={4} xs={12}>
                <CustomSelectFile
                    id="productVariant"
                    title={"Media (Jpeg,png,jpg)"}
                    onChange={(files) => setMedia(files)}
                    files={media}
                />
            </Grid>
            <Grid item md={12} xs={12}>
                <LoadingButton loading={load} sx={{ mt: 1 }} fullWidth variant='contained' onClick={handleAddVariants}>Add Variant</LoadingButton>
            </Grid>
        </Grid>
    )
}
