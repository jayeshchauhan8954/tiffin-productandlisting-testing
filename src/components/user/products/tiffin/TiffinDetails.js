import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Button, ButtonGroup, Checkbox, Divider, Grid, IconButton, Radio, Stack } from '@mui/material';
import { fontName } from '@/utils/fonts/Font';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomChip from '@/components/Common/CustomChip';
import CustomDialog from '@/components/Common/CustomDialog';
import { getS3Url } from '@/utils/helpers/appHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByVariantId } from '@/redux/selectors/checkoutSelectors';
import { getDeliveryCharges } from '@/redux/selectors/deliveryCharges';
import { getAddress, getCityId, getLatLng } from '@/redux/selectors/locationSelectors';
import { getExtrasSP, getProductSellingPrice } from '@/utils/helpers/pricing';
import { _subscription } from '@/utils/constants/constants';
import { updateCart } from '@/redux/slicers/cart';
import { getAuth } from '@/redux/selectors/authSelectors';
import { showMessage } from '@/utils/helpers/toastHelpers';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import moment from 'moment';
import SelectStartDate from '@/components/Calendar/SelectStartDate';
import { LoadingButton } from '@mui/lab';
import { apiRequest } from '@/utils/config/apiRequest';
import GettingStart from '@/components/AuthScreens/GettingStart';


export default function TiffinDetails({ open, onClose, data = {} }) {
    const theme = useTheme();
    let { details, mealPlan, productVariantId } = data || { details: {}, mealPlan: "", productVariantId: false }

    const [itemInfo, setItemInfo] = useState(details)

    // Redux
    const cartItem = useSelector(state => getCartByVariantId(itemInfo?._id)(state))
    const { deliveryCharges = 0, processingFee = 0 } = useSelector(getDeliveryCharges)
    const dispatch = useDispatch()
    const cityId = useSelector(getCityId)

    // state
    const [packIndex, setPackIndex] = useState(-1)

    // Get Price
    const getPrice = useMemo(() => {
        let item = itemInfo?.mealPlans?.find(item => item?._id?.name === (cartItem?.packs?.[0]?.mealPlan?.name || mealPlan))
        return getProductSellingPrice(item?.rate, item?.targetMargin, deliveryCharges, processingFee)
    }, [cartItem?.packs])


    // Pack Helpers
    const handlePackCancel = () => setPackIndex(-1)

    const handlePackRemove = (packIndex) => {
        let tmp = { ...cartItem }
        let packs = [...tmp.packs]

        packs.splice(packIndex, 1)
        tmp.packs = packs

        dispatch(updateCart({ [itemInfo._id]: tmp }))
    }

    return (
        <>
            <CustomDialog
                maxWidth="md"
                open={open}
                onClose={onClose}
                actions={<Footer itemInfo={itemInfo} mealPlan={mealPlan} onAdd={onClose} />}>

                <Grid container spacing={2}>
                    <Grid item xs={8} md={9}>
                        <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }}>
                            <Typography variant={"title"}>{itemInfo?.mealTypeId?.name}</Typography>
                            {/* <CustomChip bgcolor={theme.palette.primary.main} label={"NON - VEG"} sx={{ fontFamily: fontName.PoppinsMedium }} borderRadius={40} /> */}
                        </Stack>
                        <Typography variant="cardHeading" color={theme.palette.text.secondary} component="div">
                            {itemInfo?.items?.map(elem => `${elem?.name} (${elem?.qty} ${elem?.uom})`).join(" • ")}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={3} sx={{ textAlign: 'right', }}>
                        <Typography variant={"title"}>${getPrice}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box
                            component="img"
                            src={getS3Url(itemInfo?.media)}
                            sx={{
                                width: '100%',
                            }}
                        />
                    </Grid>
                </Grid>

                {
                    // Show default packages
                    (cartItem?.packs?.length <= 1 || !cartItem?.packs) ?
                        <>
                            <MealPlan itemInfo={itemInfo} packIndex={0} mealPlan={mealPlan} />

                            <DeliveryTime itemInfo={itemInfo} packIndex={0} />

                            <AddExtras itemInfo={itemInfo} packIndex={0} />

                            <DeliveryStartDate itemInfo={itemInfo} packIndex={0} />
                        </> :
                        <>
                            {
                                cartItem?.packs?.map((pack, i) => <Box>
                                    <Stack flexDirection={'row'} style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Typography variant={"smHeading"}>Pack {i + 1}</Typography>
                                        <Stack flexDirection={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                            <IconButton onClick={() => setPackIndex(i)}>
                                                <Typography variant={"heading3"} fontSize={14} color={theme.palette.primary.main} style={{ marginHorizontal: 10, }}>Edit Order</Typography>
                                            </IconButton>
                                            <IconButton variant={"heading3"} fontSize={14} onClick={() => handlePackRemove(i)}>
                                                <Box component="img" src="/assets/images/delete.svg" />
                                            </IconButton>
                                        </Stack>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={"center"}>
                                        <Box component="img" src="/assets/images/daytiffin.svg" sx={{ height: 20, width: 20, }} />
                                        <Typography variant={"heading3"} style={{ marginLeft: 10, }}>{pack?.deliveryTime?.name} {" "}</Typography>
                                        <Typography variant={"heading3"} style={{ marginLeft: 10, }}>{pack?.mealPlan?.name}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={"center"} style={{ marginTop: 10 }}>
                                        <Box component="img" src="/assets/images/calendar-tick.svg" sx={{ height: 20, width: 20, marginRight: 1 }} />
                                        <Typography variant='cardHeading' >{moment(pack?.deliveryStartDate).format("dddd, MMM Do, YYYY")}</Typography>
                                    </Stack>

                                    {
                                        pack?.extras?.length > 0 &&
                                        <Box>
                                            <Typography variant='smTit1e1'>Extra</Typography>
                                            {
                                                pack?.extras?.map((extra, extIndex) =>
                                                    <Box sx={{ backgroundColor: "#F2F2F2", padding: 2, borderRadius: 1, marginTop: 2 }}>
                                                        <Typography variant='heading3' fontSize={14}>Extra</Typography>
                                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                            <Box>
                                                                <Typography component={"p"} variant='small1' style={{ marginTop: 10, }}>{extra?.qty} {extra?.name}</Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography component={"p"} variant='small1' style={{ marginTop: 10, }}>$ {getExtrasSP(extra?._id?.unitPrice, extra?._id?.targetMargin, extra?.qty)}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )
                                            }
                                        </Box>}
                                </Box>)
                            }
                        </>
                }
            </CustomDialog>

            {/* For update */}
            <CustomDialog
                heading={`Pack ${packIndex + 1}`}
                onClose={handlePackCancel}
                open={packIndex >= 0}>
                <AddPackages
                    itemInfo={itemInfo}
                    packNo={packIndex}
                    mealPlan={mealPlan}
                />
            </CustomDialog>
        </>
    )
}

const MealPlan = ({ itemInfo, mealPlan, packIndex = 0 }) => {
    const theme = useTheme()

    // Redux
    const cartItem = useSelector(state => getCartByVariantId(itemInfo?._id)(state))

    // States
    const dispatch = useDispatch()

    // Plan Helpers
    const handlePlanChange = (plan) => () => {
        console.log(plan)
        let tmp = { ...(cartItem || { productVariantId: '', packs: [{ mealPlan: [] }] }) }

        let packs = [...tmp.packs]

        let item = itemInfo?.mealPlans?.find(item => item?._id?.name === plan)
        packs[packIndex] = { ...packs[packIndex], mealPlan: { ...item?._id, rate: item?.rate, targetMargin: item?.targetMargin } }
        tmp.packs = packs

        dispatch(updateCart({ [itemInfo?._id]: tmp }))
    };

    const isPlanDisabled = (plan) => !!!itemInfo?.mealPlans?.find(item => item?._id?.name === plan)


    return (<Grid container md={12} xs={12} spacing={2}>

        <Grid item xs={12} md={12}>
            <Typography variant={"heading3"} sx={{ mt: 2 }}>Meal Plan </Typography>
            <Typography component={"p"} variant={"cardHeading"}>Select your preferred meal plan</Typography>
        </Grid>
        {
            Object.values(_subscription)?.map(plan =>
                <Grid key={plan} item xs={12} md={4}>
                    <Box sx={{
                        border: 1,
                        borderColor: plan === (cartItem?.packs?.[packIndex]?.mealPlan?.name || mealPlan) ? theme.palette.primary.main : theme.palette.primary.primaryDGrey,
                        borderRadius: 1,
                    }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant={"cardHeading"} sx={{ mx: 1 }}
                                color={plan === (cartItem?.packs?.[packIndex]?.mealPlan?.name || mealPlan) ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                {plan}
                            </Typography>
                            <Radio
                                disabled={isPlanDisabled(plan)}
                                checked={plan === (cartItem?.packs?.[packIndex]?.mealPlan?.name || mealPlan)}
                                onChange={handlePlanChange(plan)}
                                name="plan"
                            />
                        </Stack>
                    </Box>
                </Grid>)
        }
    </Grid>)
}

const DeliveryTime = ({ itemInfo, packIndex = 0 }) => {
    const theme = useTheme()

    // Redux
    const cartItem = useSelector(state => getCartByVariantId(itemInfo?._id)(state))

    // States
    const dispatch = useDispatch()

    const lunchs = itemInfo?.deliveryTimes?.map(time => time._id) // Delivery Time Info

    // Helpers
    const handleTimeChange = (name) => () => {
        let tmp = { ...(cartItem || { productVariantId: '', packs: [{ deliveryTime: {} }] }) }

        let packs = [...tmp.packs]

        let deliveryTime = itemInfo?.deliveryTimes?.find(item => item?._id?.name === name)
        packs[packIndex] = { ...packs[packIndex], deliveryTime: deliveryTime?._id }
        tmp.packs = packs

        console.log(tmp)
        dispatch(updateCart({ [itemInfo?._id]: tmp }))
    }


    return (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={8} md={8}>
                <Typography variant={"heading2"} fontSize={14} color={theme.palette.primary.blackColor}>Delivery Time</Typography>
                <Typography component={"p"} sx={{ mt: 1 }} olor={theme.palette.primary.blackColor} variant={"cardHeading"} >Select delivery time</Typography>
            </Grid>

            <Grid item xs={4} md={4} sx={{ textAlign: 'right' }}>
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <CustomChip
                        bgcolor={theme.palette.primary.lightGreen}
                        color={theme.palette.primary.greenColor}
                        label={"Required"}
                        sx={{ fontFamily: fontName.PoppinsMedium, border: "2px solid green", borderColor: theme.palette.primary.greenColor }}
                        borderRadius={40}
                    />
                    <Avatar alt="" src="/assets/images/circlearrow.svg" sx={{ height: 20, width: 20, ml: 1 }} />
                </Stack>
            </Grid>

            <Grid item xs={12} md={12}>
                <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
            </Grid>

            {
                lunchs?.map(lunch =>
                    <Grid key={lunch?.name} item md={12} xs={12}>
                        <Grid container>
                            <Grid item xs={8} md={10}>
                                <Typography variant={"cardHeading"}>{lunch?.name} - {moment(lunch?.from).format("hh:mm a")} - {moment(lunch?.to).format("hh:mm a")}</Typography>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Typography variant={"cardText"} color={theme.palette.primary.blackColor}>---</Typography>
                                    <Radio
                                        sx={{ padding: 0, ml: 1 }}
                                        checked={lunch?.name === (cartItem?.packs[packIndex]?.deliveryTime?.name || itemInfo?.deliveryTimes?.[0]?._id?.name)}
                                        onChange={handleTimeChange(lunch?.name)}
                                        name="time"
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
}

const AddExtras = ({ itemInfo, packIndex = 0 }) => {
    const theme = useTheme()
    const [show, setShow] = useState(false)

    // Redux
    const cartItem = useSelector(state => getCartByVariantId(itemInfo?._id)(state))

    // States
    const dispatch = useDispatch()

    // Helpers
    const handleItemCheck = (_id) => () => {
        let tmpCart = { ...(cartItem || { productVariantId: '', packs: [{ extras: [] }] }) }

        let extras = [...(tmpCart.packs?.[packIndex]?.extras || [])]

        let itemIndex = tmpCart.packs?.[packIndex]?.extras?.findIndex((item) => item?._id === _id)

        if (itemIndex >= 0) { // Remove extra
            extras.splice(itemIndex, 1)

        } else { // Add Extra

            let item = itemInfo?.items?.find((item) => item?._id === _id)
            extras.push({ ...item, qty: 0 })
        }

        let packs = [...tmpCart.packs]
        packs[packIndex] = { ...packs[packIndex], extras }
        tmpCart.packs = packs

        dispatch(updateCart({ [itemInfo?._id]: tmpCart }))
    }

    const handlePlusMinus = (_id, op) => () => {
        let tmp = { ...cartItem }
        let extras = [...(cartItem?.packs?.[packIndex]?.extras || [])]

        let itemIndex = extras?.findIndex((item) => item?._id === _id)
        if (itemIndex >= 0) {
            if (op === "plus") {
                extras[itemIndex] = { ...extras[itemIndex], qty: extras[itemIndex].qty + 1 }
            } else if (extras[itemIndex].qty > 0) {
                extras[itemIndex] = { ...extras[itemIndex], qty: extras[itemIndex].qty - 1 }
            }
        }

        let packs = [...tmp.packs]
        packs[packIndex] = { ...packs[packIndex], extras }

        tmp.packs = packs
        dispatch(updateCart({ [itemInfo?._id]: tmp }))
    }

    const handleHideShow = () => setShow(!show)

    return (<Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={9} md={9}>
            <Typography variant={"heading2"} fontSize={14} color={theme.palette.primary.blackColor}>Add Extra</Typography>
            <Typography component={"p"} color={theme.palette.primary.greenColor} variant={"cardHeading"} >All selected extras comes in a single order</Typography>
        </Grid>
        <Grid item xs={3} md={3}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }} onClick={handleHideShow}>
                <IconButton> <Avatar alt="" src="/assets/images/circlearrow.svg" sx={{ height: 20, width: 20 }} /></IconButton>
            </Box>
        </Grid>

        <Grid item xs={12}>
            <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
        </Grid>

        {show && (<>
            {
                itemInfo?.items?.map((item) => <Grid item md={12} xs={12}>
                    <Grid container>
                        <Grid item xs={8} md={10}>
                            <Typography component={"p"} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>{item?.name}</Typography>
                            {
                                Boolean(cartItem?.packs?.[packIndex]?.extras?.find(cart => cart._id === item?._id)) &&
                                <ButtonGroup
                                    sx={{ height: 35, mt: 2, background: theme.palette.primary.lightGrey, borderRadius: 40 }}
                                    size="small" aria-label="Small button group">
                                    <Button
                                        sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                                        onClick={handlePlusMinus(item._id, "minus")}>
                                        -
                                    </Button>
                                    <Button sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}>{cartItem?.packs?.[packIndex]?.extras?.find(cartExtra => cartExtra?._id === item?._id)?.qty || 0}</Button>
                                    <Button
                                        sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                                        onClick={handlePlusMinus(item._id, "plus")}>
                                        +
                                    </Button>
                                </ButtonGroup>
                            }
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Typography variant={"cardText"} color={theme.palette.primary.blackColor}>${getExtrasSP(item?._id?.unitPrice, item?._id?.targetMargin, 1)}</Typography>
                                <Checkbox
                                    sx={{ padding: 0, ml: 1 }}
                                    onChange={handleItemCheck(item?._id)}
                                    checked={cartItem?.packs?.[packIndex]?.extras?.find(cart => cart._id === item?._id)}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>)
            }
        </>)}
    </Grid>)
}

const DeliveryStartDate = ({ itemInfo, packIndex = 0 }) => {
    const theme = useTheme()

    // Redux
    const cartItem = useSelector(state => getCartByVariantId(itemInfo?._id)(state))

    // States
    const dispatch = useDispatch()

    const days = () => {
        let current = moment()
        let daysList = [], count = 0

        while (itemInfo?.productId?.deliveryDays && count < 7) {
            if (itemInfo?.productId?.deliveryDays?.includes(moment(current).format("ddd"))) { // Check available days
                daysList.push(moment(current).format('YYYY-MM-DD'))
                count++
            }
            current = current.add(1, 'day')
        }
        return daysList
    }

    // Helpers
    const handleDateSelect = (day) => {
        let tmp = { ...(cartItem || { productVariantId: '', packs: [{ deliveryStartDate: [] }] }) }

        let packs = [...tmp.packs]
        packs[packIndex] = { ...packs[packIndex], deliveryStartDate: day }
        tmp.packs = packs

        dispatch(updateCart({ [itemInfo?._id]: tmp }))
    };

    const handleOnApply = (date) => {
        date = moment(date).format("YYYY-MM-DD")
        if (itemInfo?.productId?.deliveryDays?.includes(moment(date).format("ddd"))) {
            let tmp = { ...(cartItem || { productVariantId: '', packs: [{ deliveryStartDate: [] }] }) }

            let packs = [...tmp.packs]
            packs[packIndex] = { ...packs[packIndex], deliveryStartDate: date }
            tmp.packs = packs

            dispatch(updateCart({ [itemInfo?._id]: tmp }))
        } else {
            return showMessage({ message: "Restaurant not available for selected date." })
        }
    }
    return (<Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={8} md={8}>
            <Typography variant={"heading2"} fontSize={14} color={theme.palette.primary.blackColor}>Delivery Date</Typography>
            <Typography component={"p"} sx={{ mt: 1 }} olor={theme.palette.primary.blackColor} variant={"cardHeading"}>Select delivery start date</Typography>
        </Grid>

        <Grid item xs={4} md={4} sx={{ textAlign: 'right' }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <CustomChip
                    bgcolor={theme.palette.primary.lightGreen}
                    color={theme.palette.primary.greenColor}
                    label={"Required"}
                    sx={{ fontFamily: fontName.PoppinsMedium, border: "2px solid green", borderColor: theme.palette.primary.greenColor }}
                    borderRadius={40}
                />
                <Avatar alt="" src="/assets/images/circlearrow.svg" sx={{ height: 20, width: 20, ml: 1 }} />
            </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
            <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
        </Grid>

        <Grid item xs={12} md={12} sx={{ my: 1 }}>
            <SelectStartDate days={days()} onChange={handleDateSelect} />
        </Grid>

        <Grid item xs={12} md={12}>
            <Divider sx={{ borderColor: theme.palette.primary.primaryEdark, }} />
        </Grid>

        <Grid item xs={12} md={12}>
            <Typography component={"p"} variant={"cardText"} color={theme.palette.primary.blackColor}>Customize Date</Typography>
            <DatePicker
                value={moment(cartItem?.packs?.[packIndex]?.deliveryStartDate) || null}
                fullWidth
                sx={{ pt: 2, width: "100%" }}
                onChange={handleOnApply}
            />
        </Grid>
    </Grid>)
}

const Footer = ({ itemInfo, mealPlan ,onAdd }) => {
    const theme = useTheme()

    const { isAuth } = useSelector(getAuth)
    const [load, setLoad] = useState(false)
    const [model, setModel] = useState({ packNo: 0, open: false })
    const [openGetStart, setGetStart] = useState(false)

    // Redux
    const cartItem = useSelector(state => getCartByVariantId(itemInfo?._id)(state))
    const dispatch = useDispatch()
    const { deliveryCharges = 0, processingFee = 0 } = useSelector(getDeliveryCharges)
    const { latitude, longitude } = useSelector(getLatLng)
    const { address } = useSelector(getAddress)

    // Helpers
    const handlePlusMinus = (op) => () => {
        if (op === "plus") {
            if (!cartItem?.packs?.length || (cartItem?.packs?.some(pack => !pack?.deliveryStartDate))) {
                return showMessage({ message: "Please select Delivery start date for packages." })
            }
            handlePackOpen()
        } else if (cartItem?.packs?.length > 1) {

            // Remove pack from stack
            let tmp = { ...cartItem }
            let packs = [...tmp.packs]

            packs.splice(cartItem?.packs?.length - 1, 1)
            tmp.packs = packs

            dispatch(updateCart({ [itemInfo._id]: tmp }))
        }
    }

    const handleCartAdd = async () => {
        // Cart add validation
        if (!cartItem) {
            return showMessage({ message: "Please select Delivery start date for packages." })
        } else if (cartItem?.packs?.length <= 0) {
            return showMessage({ message: "Please enter quantity." })
        } else if (cartItem?.packs?.some(pack => !pack?.deliveryStartDate)) {
            return showMessage({ message: "Please select Delivery start date for packages." })
        }
        let tmp = { ...cartItem }
        let packs = [...tmp?.packs]

        // Traverse all packages
        packs?.forEach((pack, index) => {
            let tmpMealPlan = itemInfo?.mealPlans?.find(item => item?._id?.name === (packs[index]?.mealPlan?.name || mealPlan))

            packs[index] = {
                mealType: itemInfo?.mealTypeId,
                mealPlan: { ...tmpMealPlan?._id, rate: tmpMealPlan?.rate, targetMargin: tmpMealPlan?.targetMargin },
                extras: [],
                deliveryTime: itemInfo?.deliveryTimes?.[0]?._id,
                qty: 1,
                deliveryStartDate: null,
                ...packs[index],

                // calc
                costPrice: tmpMealPlan?.rate,
                targetMargin: tmpMealPlan?.targetMargin,
                deliveryCharges: deliveryCharges,
                processingFee: processingFee,
                extrasAmount: packs[index]?.extras?.reduce((net, item) => net += getExtrasSP(item?._id?.unitPrice, item?._id?.targetMargin, item?.qty), 0) || 0,
                netAmount: getNetAmountForEachPackages(pack),
            }

            tmp.packs = packs
            tmp.productVariant = { _id: itemInfo?._id, items: itemInfo?.items, rate: itemInfo?.rate, targetMargin: itemInfo?.targetMargin }
            tmp.product = itemInfo?.productId
        })

        // If User Is Authenicated
        if (isAuth) {
            setLoad(true)
            let payload = {
                productId: itemInfo?.productId?._id,
                item: {
                    productVariantId: itemInfo?._id,
                    packs: tmp?.packs?.map(pack => ({
                        qty: pack?.qty,
                        mealPlanId: pack?.mealPlan?._id,
                        mealTypeId: pack?.mealType?._id,
                        deliveryTimeId: pack?.deliveryTime?._id,
                        deliveryStartDate: pack?.deliveryStartDate,
                        extras: pack?.extras,

                        costPrice: pack?.costPrice,
                        targetMargin: pack?.targetMargin,
                        deliveryCharges: deliveryCharges,
                        processingFee: processingFee,
                        extrasAmount: pack?.extrasAmount,
                        netAmount: pack?.netAmount,
                    }))
                },
                dropLocation: {
                    lat: latitude,
                    lng: longitude,
                    address: address
                }
            }

            let { data } = await apiRequest({
                method: "POST",
                endUrl: _apiUrls.user.cart,
                body: payload,
                showMsg: true
            })
            tmp.cartId = data?._id

            setLoad(false)
            dispatch(updateCart({ [itemInfo._id]: tmp }))
            onAdd()
        } else {
            setGetStart(true)
        }
    }

    // Net amount
    const getPrice = useMemo(() => {
        let total = 0
        console.log(cartItem, "cartItem")
        cartItem?.packs.forEach(pack => {
            let item = itemInfo?.mealPlans?.find(item => item?._id?.name === (pack?.mealPlan?.name || mealPlan))
            let extraPrice = pack?.extras?.reduce((net, item) => net += getExtrasSP(item?._id?.unitPrice, item?._id?.targetMargin, item?.qty), 0) || 0
            total += getProductSellingPrice(item?.rate, item?.targetMargin, deliveryCharges, processingFee) + extraPrice
        })
        return total || 0
    }, [cartItem?.packs, itemInfo])

    const getNetAmountForEachPackages = (pack) => {
        let total = 0
        let item = itemInfo?.mealPlans?.find(item => item?._id?.name === (pack?.mealPlan?.name || mealPlan))
        let extraPrice = pack?.extras?.reduce((net, item) => net += getExtrasSP(item?._id?.unitPrice, item?._id?.targetMargin, item?.qty), 0) || 0
        total += getProductSellingPrice(item?.rate, item?.targetMargin, deliveryCharges, processingFee) + extraPrice
        return total || 0
    }

    // Pack helpers
    const handlePackOpen = () => setModel({ ...model, open: true, packNo: cartItem?.packs?.length })
    const handleClose = () => setModel({ ...model, open: false })

    // Remove pack
    const handleCancelPack = () => {
        let tmp = { ...(cartItem || {}) }
        let packs = [...(tmp.packs || [])]

        packs.splice(model.packNo, 1)
        tmp.packs = packs

        dispatch(updateCart({ [itemInfo._id]: tmp }))
        handleClose()
    }


    // Add Packages handlers
    const handleAddPack = () => {
        // Cart add validation
        if (!cartItem.packs?.[model.packNo]?.deliveryStartDate) {
            return _showErrorMessage({ message: "Please select Delivery start date for packages.", overApp: true })
        }
        handleClose()
    }

    return (<>
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={4} md={4}>
                <ButtonGroup
                    sx={{ height: 56, width: "100%", justifyContent: 'space-between', border: 1, borderColor: theme.palette.primary.main, background: theme.palette.primary.contrastText, borderRadius: 1 }}
                >
                    <Button
                        sx={{ border: 0, color: theme.palette.primary.main, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                        onClick={handlePlusMinus("minus")}>
                        <Typography sx={{ fontSize: 16, }} variant='heading3'>-</Typography>
                    </Button>
                    <Button sx={{ border: 0, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}>
                        <Typography sx={{ fontSize: 16, }} variant='heading3'>{cartItem?.packs?.length || 1}</Typography></Button>
                    <Button
                        sx={{ border: 0, color: theme.palette.primary.main, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                        onClick={handlePlusMinus("plus")}>
                        <Typography sx={{ fontSize: 16, }} variant='heading3'>+</Typography>
                    </Button>
                </ButtonGroup>
            </Grid>

            <Grid item xs={4} md={8}>
                <LoadingButton loading={load} onClick={handleCartAdd} sx={{ height: 56, width: "100%", }} variant="contained">
                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Add ${getPrice}</Typography>
                </LoadingButton>
            </Grid>
        </Grid>

        {/* Add More Packages */}
        <CustomDialog
            heading={`Pack ${model.packNo + 1}`}
            onClose={handleCancelPack}
            open={model.open}
            actions={<>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item md={4} xs={4} >
                        <Button variant="text" onPress={handleCancelPack}>Cancel</Button>
                    </Grid>
                    <Grid item md={8} xs={8}>
                        <Button variant="contained" onClick={handleAddPack} sx={{ height: 56, width: "100%", }}>Add Pack {model.packNo}</Button>
                    </Grid>
                </Grid>
            </>}>
            <AddPackages
                itemInfo={itemInfo}
                packNo={model.packNo}
                mealPlan={mealPlan}
            />
        </CustomDialog>

        {/* Start login for user */}
        {
            openGetStart && <GettingStart isRedirect={false} open={openGetStart} onClose={()=>setGetStart(false)}/>
        }
    </>)
}

const AddPackages = ({ itemInfo, mealPlan, packNo }) => {

    return (
        <>
            <MealPlan itemInfo={itemInfo} mealPlan={mealPlan} packIndex={packNo} />

            <DeliveryTime itemInfo={itemInfo} packIndex={packNo} />

            <AddExtras itemInfo={itemInfo} packIndex={packNo} />

            <DeliveryStartDate itemInfo={itemInfo} packIndex={packNo} />

        </>
    )
}