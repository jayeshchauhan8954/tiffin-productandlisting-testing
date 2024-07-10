'use client'
import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '@/components/Common/Breadcrumb'
import { Autocomplete, Card, Chip, Grid, Stack, TextField, Typography } from '@mui/material'
import { QuillEditor } from '@/components/editor'
import CustomSelectFile from '@/components/Common/CustomSelectFile'
import { _productStatus, _profileStatus, _s3Directories, _status, _toastVariants } from '@/utils/constants/constants'
import { apiRequest } from '@/utils/config/apiRequest'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import { useFormik } from 'formik'
import { showMessage } from '@/utils/helpers/toastHelpers'
import { LoadingButton } from '@mui/lab'
import { useParams } from 'next/navigation'
import moment from 'moment'
import { addEditProductValSchema } from '@/components/seller/product/ValidationSchema'
import ProductVariants from '@/components/seller/product/ProductVariant'
import { fileUploadToS3 } from '@/utils/helpers/fileHelper'

export default function AddEditProduct() {
    const { id } = useParams()

    // Dropdowns
    const [dietary, setDietary] = useState([])
    const [cusine, setCusine] = useState([])
    const [deliveryTimes, setDeliveryTimes] = useState([])
    const [cities, setCities] = useState([])
    const [mealPlans, setMealPlans] = useState([])
    const [hub, setHub] = useState([])

    const status = [_productStatus.Inactive, _productStatus.Active, _productStatus.Rejected]
    const tagRef = useRef()
    const [load, setLoad] = useState(false)
    const [days, setDays] = useState([{ select: false, name: 'Mon' }, { select: false, name: 'Tue' }, { select: false, name: 'Wed' }, { select: false, name: 'Thu' }, { select: false, name: 'Fri' }, { select: false, name: 'Sat' }, { select: false, name: 'Sun' }])

    // Side Effect
    useEffect(() => {
        fetchDietary();
        fetchCusine();
        fetchDeliveryTimes();
        fetchCities();
        fetchHubs();
        fetchMealPlan();
        id && fetchProductDetails()
    }, [])

    const fetchHubs = async () => {
        let { data, status } = await apiRequest({
            method: 'GET',
            endUrl: _apiUrls.masters.hub.list,
            query: { paginate: 0 }
        })
        const hubs = data?.rows?.map((item) => {
            return (
                {
                    _id: item?._id,
                    name: item?.name
                }
            )
        })
        status && setHub(hubs)
    }

    const fetchDietary = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.dietaries,
            query: { paginate: 0 }
        })
        status && setDietary(data?.rows)
    }
    const fetchCusine = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.cusines,
            query: { paginate: 0 }
        })
        status && setCusine(data?.rows)
    }
    const fetchDeliveryTimes = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.deliveryTime,
            query: { paginate: 0, isDropdown: 1 }
        })
        status && setDeliveryTimes(data?.rows)
    }
    const fetchCities = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.cities,
            query: { paginate: 0, isDropdown: 1 }
        })
        status && setCities(data?.rows)
    }
    const fetchMealPlan = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.mealPlansList,
            query: { paginate: 0 }
        })
        if (status) {
            setMealPlans(data?.rows)
        }
    }

    // Formik
    const initialValues = {
        name: '',
        lat: 0,
        lng: 0,
        address: '',
        thumbNail: '',
        media: [],
        description: '',
        tags: [] /** comma separated values */,
        dietary: { _id: null, name: '' },
        cusine: { _id: null, name: '' },
        seller: { _id: null, firstName: '', lastName: '' },
        deliveryTimes: [],
        availableCities: [],
        mealPlans: [],
        status: _productStatus.Active,
        hubForLunch: '',
        hubForDinner: ''
    }

    const { values, setValues, setFieldValue, touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addEditProductValSchema,
        onSubmit: handelAddProduct
    })

    async function handelAddProduct() {
        setLoad(true)
        let payload = {
            ...(values?._id && { _id: values._id }),
            name: values.name,
            description: values.description,
            dietaryId: values.dietary._id,
            cuisineId: values.cusine._id,
            sellerId: values.seller._id,
            thumbNail: (await fileUploadToS3([values.thumbNail], _s3Directories.product))?.[0],
            media: await fileUploadToS3(values.media, _s3Directories.product),
            tags: values.tags?.join(","),
            status: values.status,
            deliveryTimeIds: values.deliveryTimes?.map((item) => (item._id)),
            availableCityIds: values.availableCities?.map((item) => (item._id)),
            deliveryDays: days?.filter((item) => item?.select).map(item => item?.name),
            mealPlans: values.mealPlans?.map((item) => ({ _id: item?._id, days: item?.days }))
        }
        const { data, status } = await apiRequest({
            method: values?._id ? "PUT" : "POST",
            endUrl: _apiUrls.masters.products.root,
            body: payload,
            showMsg: true
        })

        setLoad(false)
        if (status) {
            !values?._id && setFieldValue('_id', data?._id) /** Set product id incase of add only */
        }
    }

    const fetchProductDetails = async () => {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.products.root,
            params: { id }
        })
        if (status) {
            setValues({
                ...values,
                _id: data?._id,
                name: data?.name,
                description: data?.description,
                status: data?.status,
                seller: data?.userId,
                tags: data?.tags,
                dietary: data?.dietaryId,
                cusine: data?.cuisineId || null,
                deliveryTimes: data?.deliveryTimeIds || [],
                availableCities: data.availableCityIds || [],
                mealPlans: data.mealPlans?.map((plan) => ({ ...plan._id, days: plan?.days })),
                media: data?.media,
                thumbNail: data?.thumbNail,
                hubForLunch: data?.lunchHubId?.name,
                hubForDinner: data?.dinnerHubId?.name
            })

            let tmpDays = days.map(item => ({ select: data?.deliveryDays?.includes(item?.name), name: item?.name }))
            setDays(tmpDays)
        }
    }

    // Helpers
    const handleHtmlChange = (html) => setFieldValue('description', html)

    const handleThumbnail = (files) => setFieldValue('thumbNail', files)
    const handleMedia = (files) => setFieldValue('media', files)

    // Tags
    const handleTag = (e) => {
        e.preventDefault()

        if (!values?.tags?.includes(tagRef?.current?.value)) {
            values.tags.push(tagRef?.current?.value)
            setFieldValue('tags', values.tags)
            tagRef.current.value = ''
        } else {
            showMessage({ message: 'Already tag added', variant: _toastVariants.Error })
        }

    }
    const handleRemoveTag = (idx) => () => {
        let tmp = [...values.tags]
        tmp.splice(idx, 1)
        setFieldValue('tags', tmp)
    }

    const handleDaysSelect = (name) => {
        let tmp = [...days]
        let index = tmp.findIndex(item => item.name === name)
        tmp[index].select = !tmp[index].select
        setDays(tmp)
    }
    // Breadcrum
    let links = [{ name: 'Product' }, { name: values._id ? values?.name : "add" }]

    return (
        <React.Fragment>
            <BreadCrumb
                links={links}
                action={<LoadingButton loading={load} size='small' variant='contained' onClick={handleSubmit}>Save & Publish</LoadingButton>}
            />

            <Grid container spacing={2} mb={6}>
                <Grid item md={8}>
                    <Card sx={{ p: 2, height: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <Typography variant='subtitle2'>Title</Typography>
                                <TextField fullWidth size='small' placeholder='Enter title here...'
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Typography variant='subtitle2'>Description</Typography>
                                <QuillEditor
                                    id={'productDesc'}
                                    value={values.description}
                                    onChange={handleHtmlChange}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Typography variant='subtitle2'>Product Thumbnail</Typography>
                                <CustomSelectFile
                                    id="thumbnail"
                                    title={"Thumbnail (Jpeg,png,jpg)"}
                                    onChange={handleThumbnail}
                                    files={values.thumbNail}
                                />
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <Typography variant='subtitle2'>Medias</Typography>
                                <CustomSelectFile
                                    multiple={true}
                                    id="thumbnail_extra"
                                    title={"Extra (Jpeg,png,jpg)"}
                                    onChange={handleMedia}
                                    files={values.media}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant='subtitle2'>Status</Typography>
                        <Autocomplete
                            name="status"
                            fullWidth
                            options={status}
                            getOptionLabel={(option) => option}
                            value={values.status}
                            onChange={(_, newValue) => setFieldValue('status', newValue)}
                            renderInput={(params) => <TextField
                                {...params}
                                autoComplete='off'
                                variant="outlined"
                                size="small"
                                placeholder='Status'
                                error={Boolean(touched.status && errors.status)}
                                helperText={touched.status && errors.status}
                            />}
                            renderOption={(props, option) => (<li {...props} key={option}>{option}</li>)}
                        />
                    </Card>

                    <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant='subtitle2'>Dietary</Typography>
                        <Autocomplete
                            name="dietary"
                            fullWidth
                            value={values.dietary || []}
                            options={dietary}
                            getOptionLabel={(option) => option?.name || ''}
                            isOptionEqualToValue={(option, value) => option._id === value?._id}
                            onChange={(_, option) => setFieldValue('dietary', option)}
                            renderInput={(params) => <TextField
                                {...params}
                                autoComplete='off'
                                variant="outlined"
                                size="small"
                                placeholder='Dietary'
                                error={Boolean(touched.dietary?._id && errors.dietary?._id)}
                                helperText={touched.dietary?._id && errors.dietary?._id}
                            />}
                            renderOption={(props, option) => (<li {...props} key={`diet_${option?.name}`}>{option?.name}</li>)}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant='subtitle2'>Cusine/Product Type</Typography>
                        <Autocomplete
                            name="cusine"
                            fullWidth
                            value={values.cusine || []}
                            options={cusine}
                            getOptionLabel={(option) => option?.name || ''}
                            onChange={(_, option) => setFieldValue('cusine', option)}
                            isOptionEqualToValue={(option, value) => option._id === value?._id}
                            renderInput={(params) => <TextField
                                {...params}
                                autoComplete='off'
                                variant="outlined"
                                size="small"
                                placeholder='Cusine'
                                error={Boolean(touched.cusine?._id && errors.cusine?._id)}
                                helperText={touched.cusine?._id && errors.cusine?._id}
                            />}
                            renderOption={(props, option) => (<li {...props} key={`cusine_${option?.name}`}>{option?.name}</li>)}
                            sx={{ mb: 2 }}
                        />

                    </Card>
                    {values?._id && <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant='subtitle2'>Hub for Lunch</Typography>
                        <TextField fullWidth size='small'
                            value={values.hubForLunch}
                            disabled
                        />

                        <Typography variant='subtitle2' marginTop={2}>Hub for Dinner</Typography>
                        <TextField fullWidth size='small'
                            value={values.hubForDinner}
                            disabled
                        />

                    </Card>}

                    <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant='subtitle2'>Tags</Typography>
                        <form onSubmit={handleTag}>
                            <TextField
                                inputRef={tagRef}
                                placeholder='Type Tag name'
                                size='small'
                                fullWidth
                            />
                        </form>
                        <Stack mt={1} direction={'row'} gap={1} flexWrap={'wrap'}>
                            {
                                values?.tags?.map((tag, idx) => <Chip key={tag} variant='contained' size='small' label={tag} onDelete={handleRemoveTag(idx)} />)
                            }
                        </Stack>
                    </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                    {
                        Boolean(values._id) &&
                        <ProductVariants
                            seller={values.seller}
                            mealPlans={values.mealPlans}
                            availableCities={values.availableCities}
                            deliveryTimes={values.deliveryTimes}
                            productId={values?._id} />
                    }
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <Typography variant='subtitle2'>Available Cities</Typography>
                        <Autocomplete
                            multiple
                            name="availabel_cities"
                            fullWidth
                            value={values.availableCities || []}
                            options={cities}
                            getOptionLabel={(option) => option?.name}
                            isOptionEqualToValue={(option, value) => option._id === value?._id}
                            onChange={(_, option) => setFieldValue('availableCities', option)}
                            renderInput={(params) => <TextField
                                {...params}
                                autoComplete='off'
                                variant="outlined"
                                size="small"
                                placeholder='Cities'
                                error={Boolean(touched.availableCities && errors.availableCities)}
                                helperText={touched.availableCities && errors.availableCities}
                            />}
                            renderOption={(props, option) => (<li {...props} key={`diet_${option?.name}`}>{option?.name}</li>)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={<Typography variant='subtitle' style={{ whiteSpace: 'normal' }}>{option.name}</Typography>}
                                        {...getTagProps({ index })}
                                        style={{ height: "100%" }}
                                    />
                                ))
                            }
                            sx={{ mb: 2 }}
                        />
                    </Card>
                    <Card sx={{ p: 2 }}>
                        <Typography variant='subtitle2'>Delivery Time</Typography>
                        <Autocomplete
                            multiple
                            name="dietary"
                            fullWidth
                            value={values.deliveryTimes || []}
                            options={deliveryTimes}
                            getOptionLabel={(option) => `${option?.name} ${moment(option.from).format("hh:mm a")} - ${moment(option.to).format("hh:mm a")}`}
                            isOptionEqualToValue={(option, value) => option._id === value?._id}
                            onChange={(_, option) => setFieldValue('deliveryTimes', option)}
                            renderInput={(params) => <TextField
                                {...params}
                                autoComplete='off'
                                variant="outlined"
                                size="small"
                                placeholder='Delivery Times'
                                error={Boolean(touched.deliveryTimes && errors.deliveryTimes)}
                                helperText={touched.deliveryTimes && errors.deliveryTimes}
                            />}
                            renderOption={(props, option) => (<li {...props} key={`del_${option.name}`}>{option?.name} {moment(option.from).format("hh:mm a")} - {moment(option.to).format("hh:mm a")}</li>)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={<Typography variant='subtitle' style={{ whiteSpace: 'normal' }}>{option?.name} {moment(option.from).format("hh:mm a")} - {moment(option.to).format("hh:mm a")}</Typography>}
                                        {...getTagProps({ index })}
                                        style={{ height: "100%" }}
                                    />
                                ))
                            }
                            sx={{ mb: 2 }}
                        />

                        <Typography variant='subtitle2'>Meal Plan</Typography>
                        <Autocomplete
                            multiple
                            name="mealPlan"
                            fullWidth
                            options={mealPlans || []}
                            value={values.mealPlans}
                            getOptionLabel={(option) => option?.name + ' ' + option?.days}
                            onChange={(_, newValue) => setFieldValue('mealPlans', newValue)}
                            isOptionEqualToValue={(option, value) => option._id === value?.id}
                            renderInput={(params) => <TextField
                                {...params}
                                autoComplete='off'
                                variant="outlined"
                                size="small"
                                placeholder='Meal Plan'
                                error={Boolean(touched.mealPlans && errors.mealPlans)}
                                helperText={touched.mealPlans && errors.mealPlans}
                            />}
                            renderOption={(props, option) => (<li {...props} key={option?.name}>{option?.name} ({option?.days})</li>)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={<Typography variant='subtitle' style={{ whiteSpace: 'normal' }}>{option.name} ({option?.days})</Typography>}
                                        {...getTagProps({ index })}
                                        style={{ height: "100%" }}
                                    />
                                ))
                            }
                            sx={{ mb: 2 }}
                        />

                        <Typography variant='subtitle2'>Delivery Days</Typography>
                        <Stack gap={1} direction={'row'} flexWrap={"wrap"}>
                            {
                                days?.map(item => <Chip size='small' onClick={() => { handleDaysSelect(item.name) }} variant={item?.select ? 'contained' : 'outlined'} key={item.name} label={item?.name} />)
                            }
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
