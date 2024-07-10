import React, { useEffect, useMemo, useState } from 'react'
import { Box, Container, Divider, IconButton, Popover, Stack, Typography, useTheme, } from '@mui/material'
import Grid from '@mui/material/Grid';

// Fonts
import { fontName } from '@/utils/fonts/Font';

// Components
import CustomChip from '@/components/Common/CustomChip';
import FoodCard from '@/components/Cards/FoodCard';
import SubscriptionCard from '@/components/Cards/SubscriptionCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCityId } from '@/redux/selectors/locationSelectors';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { useParams } from 'next/navigation';

// Redux
import { hideLoader, showLoader } from '@/redux/slicers/app';
import { setDeliveryCharges } from '@/redux/slicers/deliveryCharges';
import { getS3Url } from '@/utils/helpers/appHelpers';
import { apiRequest } from '@/utils/config/apiRequest';
import { _deliveryTimes, _subscription } from '@/utils/constants/constants';
import { getDeliveryCharges } from '@/redux/selectors/deliveryCharges';
import TiffinDetails from './tiffin/TiffinDetails';
import moment from 'moment';
import NoData from '@/components/Common/NoData';

const _model = {
    diliveryTime: "diliveryTime",
    tiffinDetails: "tiffinDetails"
}

export default function ProductDetail() {
    const theme = useTheme();
    const { productId } = useParams()

    // Redux
    const dispatch = useDispatch()
    const cityId = useSelector(getCityId)
    const { deliveryCharges = 0, processingFee = 0 } = useSelector(getDeliveryCharges)

    // States
    const [prodDet, setProdDet] = useState({})
    const [prodVar, setProdVar] = useState([])
    const [selPlan, setSelPlan] = useState(_subscription.Trial)
    const [deliveryTime, setDeliveryTime] = useState({})
    const [activeMeal, setActiveMeal] = useState('All');

    // Models
    const [model, setModel] = useState({ name: '', data: {}, target: null })

    useEffect(() => {
        fetchProductDet()
        fetchProductVariants()
        return () => { }
    }, [cityId])

    useEffect(() => {
        // Fetch delivery charegs corresponding to seller
        (cityId || prodDet?.userId) && fetchDeliveryCharges()
    }, [cityId, prodDet?.userId])

    const fetchProductDet = async () => { // Fetch product details
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.user.getProduct,
            params: { productId }
        })
        if (status) {
            setProdDet({ ...prodDet, ...data })
            setDeliveryTime({ ...(data?.deliveryTimeIds?.[0]) })
        }
    }

    const fetchProductVariants = async () => { // Fetch product varients
        dispatch(showLoader())
        const { status, data } = await apiRequest({
            endUrl: _apiUrls.user.productVariants,
            query: { productId, cityId }
        })
        dispatch(hideLoader())
        if (status) {
            setProdVar([...data?.rows])
        }
    }

    const fetchDeliveryCharges = async () => { // Fetch delivery charges
        const { status, data } = await apiRequest({
            endUrl: _apiUrls.masters.deliveryCharges,
            query: { sellerId: prodDet?.userId, cityId }
        })
        if (status) {
            dispatch(setDeliveryCharges({
                deliveryCharges: data?.charges?.rate,
                processingFee: data?.charges?.processingFee
            })) // Set Delivery charges in redux
        }
    }

    const items = ["All", "Non Veg", "Veg", "Combo", "Only Rotis", "Only Curries", "Snacks",];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    // Helpers
    const handlePlanSelect = (name) => setSelPlan(name)
    const handleModelOpen = (name, data = {}, target = null) => setModel({ ...model, name, data, target })
    const handleModelClose = (name, data = {}, target = null) => setModel({ ...model, name: '', data, target })
    const handleMealTypeSelect = (meal) => () => setActiveMeal(meal)

    const getFilterProducts = useMemo(() => {
        return prodVar?.filter(vrt => {
            // Check Meal Plan
            if (vrt?.mealPlans?.some(item => item?._id?.name === selPlan) && (activeMeal === 'All' ? true : vrt?.mealTypeId?.name === activeMeal)) {
                return vrt?.deliveryTimes?.some(item => { // Check delivey time
                    if (item?._id?.name === deliveryTime?.name && item?.availableCities?.some(city => city?._id === cityId)) {
                        return true
                    }
                })
            } else {
                return false
            }
        })
    }, [selPlan, prodVar?.length, deliveryTime, activeMeal])

    const handleView = (data, target) => handleModelOpen(_model.tiffinDetails, { details: data, mealPlan: selPlan }, target)

    // Delivery Time
    const handleDeliveryTime = (time) => setDeliveryTime({ ...time })

    const getMealTypes = useMemo(() => {
        let tmp = prodVar
            ?.filter(vrt => vrt?.deliveryTimes?.some(delTime => delTime?._id?.name === deliveryTime?.name))
            ?.map(vrt => ({ _id: vrt?.mealTypeId?._id, name: vrt?.mealTypeId?.name }))

        return tmp?.length > 0 ? [{ _id: 'All', name: 'All' }]?.concat(tmp) : []
    }, [prodVar?.length])

    return (
        <>
            <Container>
                <Grid container spacing={2} sx={{ pt: 5 }}>

                    {/* Banner */}
                    <Grid item md={12} xs={12}>
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src={getS3Url(prodDet?.thumbNail)}
                                sx={{ objectFit: 'cover', width: '100%', maxHeight: 300, borderRadius: 1 }}
                            />
                            <Box sx={{ position: 'absolute', top: 15, right: 28, display: 'flex', gap: 2, }}>
                                <IconButton aria-label="favorite" sx={{
                                    color: theme.palette.primary.blackColor,
                                    height: 40, width: 40,
                                    backgroundColor: theme.palette.primary.contrastText,
                                }}>
                                    <Box component={"img"}
                                        src={prodDet?.isFavorite ? "/assets/images/redHeart.svg" : "/assets/icons/heart.svg"} sx={{ height: 20 }} />
                                </IconButton>
                                <IconButton aria-label="download" sx={{
                                    color: theme.palette.primary.blackColor,
                                    height: 40, width: 40,
                                    backgroundColor: theme.palette.primary.contrastText,
                                }}>
                                    <Box component={"img"} src="/assets/icons/export.svg" sx={{ height: 20, }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box sx={{ width: "60%" }}>
                                <Typography variant={"heading1"}>{prodDet?.name}</Typography>
                                <Typography component={"p"} variant={"cardHeading"} color={theme.palette.primary.primaryGrey90}>{prodDet?.dietaryId?.name} • {prodDet?.cuisineId?.name}</Typography>
                            </Box>
                            <Stack direction="row" alignItems={"center"} >
                                <CustomChip image={"/assets/icons/whitestar.svg"} label={parseFloat(prodDet?.avgRating || 0).toFixed(1)} sx={{ height: 25, fontFamily: fontName.PoppinsMedium }} />
                                <Typography variant={"cardHeading"} sx={{ ml: 1 }} >{prodDet?.ratingCount || 0} reviews</Typography>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <SubscriptionCard data={prodDet} />
                    </Grid>
                </Grid>
            </Container>

            <Divider sx={{ borderColor: theme.palette.primary.primaryEdark, mt: 4 }} />

            {/* ----------------------  */}

            <Container>
                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item md={2} xs={12}>
                        <Box sx={{ p: 2, my: 2, backgroundColor: theme.palette.primary.lightGrey }}>
                            <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                                <Typography variant='heading3' color={theme.palette.primary.blackColor}>{deliveryTime?.name}</Typography>
                                <IconButton onClick={handleClick}>
                                    <Box component="img" src="/assets/images/down.svg" sx={{ height: 20, width: 20 }} />
                                </IconButton>
                            </Stack>
                            <Typography component={"p"} variant='cardHeading'>{moment(deliveryTime?.from).format("hh:mm a")} - {moment(deliveryTime?.to).format("hh:mm a")}</Typography>
                        </Box>

                        {/* Select Delivery Time */}
                        <Popover
                            id="deliveryTime"
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            sx={{
                                '& .MuiPopover-paper': {
                                    marginTop: 5,
                                    marginLeft: -7.5,
                                    width: 250,
                                    '@media (max-width: 600px)': {
                                        width: '100%',
                                        marginLeft: 0
                                    }
                                }
                            }}
                        >
                            {
                                prodDet?.deliveryTimeIds?.map((delTime) =>
                                    <Box sx={{ cursor: 'pointer', p: 2, backgroundColor: delTime?.name === deliveryTime?.name ? theme.palette.primary.lightGrey : theme.palette.common.white }} onClick={() => { handleDeliveryTime(delTime); handleClose() }}>
                                        <Typography variant='heading3' color={theme.palette.primary.blackColor}>{delTime?.name}</Typography>
                                        <Typography component={"p"} variant='cardHeading'>{moment(delTime?.from).format("hh:mm a")} - {moment(delTime?.to).format("hh:mm a")}</Typography>
                                    </Box>
                                )
                            }
                        </Popover>

                        {/* Filters */}
                        {
                            getMealTypes.map((item, index) => (
                                <>
                                    <Box
                                        key={`filter_${index}`}
                                        sx={{
                                            p: 2,
                                            borderLeft: activeMeal === item?.name ? 5 : 0,
                                            borderColor: activeMeal === item?.name ? theme.palette.primary.main : "transparent",
                                            backgroundColor: activeMeal === item?.name ? theme.palette.primary.lightPink : theme.palette.primary.contrastText,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: activeMeal === item?.name ? theme.palette.primary.lightPink : theme.palette.primary.contrastText,
                                            },
                                        }}
                                        onClick={handleMealTypeSelect(item?.name)}
                                    >
                                        <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant='heading3'>{item?.name}</Typography>
                                    </Box>
                                </>
                            ))
                        }
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{}} />

                    {/* Product variants */}
                    <Grid item md={9} xs={12} sx={{ width: '100%', mb: 5 }}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" >
                            <Box className="customBox" sx={{ backgroundColor: theme.palette.primary.lightGrey, mt: 3 }}>
                                <CustomChip
                                    label="Trial"
                                    bgcolor={selPlan === _subscription.Trial ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selPlan === _subscription.Trial ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handlePlanSelect(_subscription.Trial)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                                <CustomChip
                                    label="Weekly"
                                    bgcolor={selPlan === _subscription.Weekly ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selPlan === _subscription.Weekly ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handlePlanSelect(_subscription.Weekly)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                                <CustomChip
                                    label="Monthly"
                                    bgcolor={selPlan === _subscription.Monthly ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selPlan === _subscription.Monthly ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handlePlanSelect(_subscription.Monthly)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                            </Box>
                        </Grid>

                        <Grid container spacing={{ xs: 0, md: 5, }}>
                            {/* Variant cards */}
                            {
                                getFilterProducts?.map((variant, index) =>
                                    <Grid key={`var_${index}`} item md={6} xs={12}>
                                        <FoodCard
                                            itemInfo={variant}
                                            mealPlan={selPlan}
                                            processingFee={processingFee}
                                            deliveryCharges={deliveryCharges}
                                            onView={handleView}
                                        />
                                    </Grid>)
                            }

                            <Grid item md={12} sx={12}>
                            {getFilterProducts?.length === 0 && <NoData
                                svgImage={"/assets/images/emptyfood.svg"}
                                text={"No tiffin found."}
                            />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            {/* Tiffin Details */}
            {model.name === _model.tiffinDetails && <TiffinDetails
                open={model.name === _model.tiffinDetails}
                data={model.data}
                onClose={handleModelClose}
            />}
        </>
    )
}
