'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Common/Header'
import { Avatar, Box, Button, ButtonBase, Container, Divider, Grid, IconButton, Radio, Stack, Typography, useTheme } from '@mui/material'
import CustomChip from '@/components/Common/CustomChip'
import { Padding } from '@mui/icons-material'
import CounterButton from '@/components/Common/CounterButton'
import { useParams, useRouter } from 'next/navigation'
import { apiRequest } from '@/utils/config/apiRequest'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import moment from 'moment'
import { getS3Url } from '@/utils/helpers/fileHelper'
import { getExtrasSP, getProductSellingPrice } from '@/utils/helpers/pricing'
import { LoadingButton } from '@mui/lab'
import { _routes } from '@/utils/endPoints/routes'
import { _paymentTypes } from '@/utils/constants/constants'
import CustomDialog from '@/components/Common/CustomDialog'
import RiderMessage from '@/components/InfoModals/RiderMessage'
import { showMessage } from '@/utils/helpers/toastHelpers'
import Discount from '@/components/InfoModals/Discount'

const _models = {
    riderNote: "riderNote",
    coupon: "coupon"
}

export default function Checkout() {
    const theme = useTheme()
    const { cartId } = useParams()

    const router = useRouter()

    const [cartItems, setCartItems] = useState({})
    const [selectedCard, setSelectedCard] = useState('');
    const [paymentType, setPaymentType] = useState(_paymentTypes.online)

    const [couponCode, setCouponCode] = useState({})
    const [riderMsg, setRiderMsg] = useState('')
    const [showSummary, setShowSummary] = useState(false);
    const [load, setLoad] = useState(false)
    const [model, setModel] = useState({ name: '', data: {} })

    // Redux
    useEffect(() => { fetchCartDetails() }, [])

    const fetchCartDetails = async () => {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.user.cart,
            params: { id: cartId },
        })
        if (status) {
            let tmp = {}
            data?.items?.forEach(item => {
                tmp[item.productVariantId?._id] = {
                    cartId: data?._id,
                    product: data?.productId,
                    productVariant: item?.productVariantId,
                    dropLocation: data?.dropLocation,
                    sellerNote: data?.sellerNote,
                    deliveryNote: data?.deliveryNote,

                    // packs
                    packs: item?.packs?.map(pack => ({
                        mealType: item?.productVariantId?.mealTypeId,
                        mealPlan: pack?.mealPlanId,
                        extras: pack?.extras,
                        deliveryTime: pack.deliveryTimeId,
                        qty: pack?.qty,
                        deliveryStartDate: pack?.deliveryStartDate,

                        // Calc
                        costPrice: pack?.costPrice,
                        targetMargin: pack?.targetMargin,
                        deliveryCharges: pack?.deliveryCharges,
                        processingFee: pack?.processingFee,
                        extrasAmount: pack?.extrasAmount,
                        netAmount: pack?.netAmount
                    }))
                }
            })
            setCartItems(tmp)
        } else {
            router.replace(_routes.user.products)
        }
    }

    // Handle final checkout
    const handleFinalCheckout = async () => {
        if (getCartPrice === 0) return

        let cartItem = Object.values(cartItems)[0]
        let payload = {
            cartId: cartItem?.cartId,
            sellerNote: cartItem?.sellerNote,
            deliveryNote: cartItem?.deliveryNote || riderMsg,
            dropLocation: cartItem?.dropLocation,
            paymentType: paymentType,
            ...(couponCode?._id && { couponId: couponCode?._id }),
        }

        if (!payload?.paymentType) {
            return showMessage({ message: "Please select payment method" })
        }

        setLoad(true)
        const { status, data, isJson } = await apiRequest({
            endUrl: _apiUrls.user.order,
            method: 'POST',
            body: payload,
            showMessage: true
        })
        setLoad(false)
        if (status) {
            if (isJson) {
                router.replace(_routes.user.orders)
            }
            else {
                const blob = new Blob([data], { type: 'text/html' });
                const url = URL.createObjectURL(blob);

                window.location.href = url;
            }
        }
    }

    const getCartPrice = Object.values(cartItems)?.reduce((total, variant) => total += variant?.packs?.reduce((net, pack) => net += pack?.netAmount, 0), 0) || 0

    // Model Helpers
    const handleBack = () => router.back()
    const handleModelOpen = (name, data = {}) => setModel({ ...model, name, data })
    const handleModelClose = () => setModel({ ...model, name: '' })

    const handlePaymentType = (name) => {
        setPaymentType(name)
        setCouponCode({})
    }

    const handleEdit = (productId) => () => router.push(_routes.user.productDetails(productId))
    return (
        <>

            {/* Header */}
            <Container>
                <Grid container py={2}>
                    <Grid md={1} xs={2}>
                        <IconButton onClick={handleBack}>
                            <Box component="img" src="/assets/images/arrow-left.svg" sx={{ height: 24, width: 24 }} />
                        </IconButton>
                    </Grid>
                    <Grid item md={11} xs={10} display={'flex'} justifyContent={'center'}>
                        <Box component="img" src="/assets/images/logo.svg" sx={{ height: 32, width: 140, ml: 2 }} />
                    </Grid>
                </Grid>
            </Container>

            <Box sx={{ backgroundColor: theme.palette.primary.primaryGray5, pt: 4, pb: 5 }}>
                <Container>
                    <Grid spacing={2}>
                        <Grid item xs={10} md={10} sx={{ margin: 'auto', }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={7}>
                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, borderRadius: "10px", }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Delivery Details</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction={"row"} alignItems={"center"}>
                                                        <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                                                        <Box>
                                                            <Typography color={theme.palette.primary.primaryGrey90} variant='heading3'>Address</Typography>
                                                            <Typography component={"p"} color={theme.palette.primary.blackColor} variant='small1'>{Object?.values(cartItems)?.[0]?.dropLocation?.address}</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <CustomChip
                                                        label="Edit"
                                                        borderRadius={20}
                                                        bgcolor={theme.palette.primary.lightGrey3}
                                                        color={theme.palette.primary.blackColor}
                                                        sx={{ fontSize: 12, }}
                                                    />
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Divider sx={{ my: 1, borderColor: theme.palette.primary.dividerColor }} />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction={"row"} alignItems={"center"}>
                                                        <Box component="img" src="/assets/icons/scooter.svg" sx={{ mr: 1 }} />
                                                        <Box>
                                                            <Typography color={theme.palette.primary.primaryGrey90} variant='heading3'>Note for the rider</Typography>
                                                            <Typography component={"p"} color={theme.palette.primary.blackColor} variant='small1'>{riderMsg || "---"}</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <ButtonBase size='small' onClick={() => handleModelOpen(_models.riderNote)}>
                                                        <CustomChip
                                                            label="Edit"
                                                            borderRadius={20}
                                                            bgcolor={theme.palette.primary.lightGrey3}
                                                            color={theme.palette.primary.blackColor}
                                                            sx={{ fontSize: 12, }}
                                                        />
                                                    </ButtonBase>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Divider sx={{ my: 1, borderColor: theme.palette.primary.dividerColor }} />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Delivery / Start Date</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                {
                                                    Object.values(cartItems)?.map((variant, i) =>
                                                        <Box>
                                                            {
                                                                variant?.packs?.map(item =>
                                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                                                                        sx={{
                                                                            border: 1,
                                                                            borderColor: theme.palette.primary.primaryGray8,
                                                                            borderRadius: 1, p: 2,
                                                                        }} >
                                                                        <Box>
                                                                            <Typography color={theme.palette.primary.primaryGrey90} variant='cardText'>{item?.mealType?.name} -- {item?.mealPlan?.name} -- {item?.deliveryTime?.name}</Typography>
                                                                            <Stack direction={"row"} alignItems={"center"}>
                                                                                <Box component="img" src="/assets/icons/calendar-edit.svg" sx={{ mr: 1 }} />
                                                                                <Typography color={theme.palette.primary.lightGrey4} variant='small1'>{moment(item?.deliveryStartDate).format("dddd, MMMM Do, YYYY")}</Typography>
                                                                            </Stack>
                                                                        </Box>
                                                                        <ButtonBase onClick={handleEdit(variant?.product?._id)}>
                                                                            <CustomChip
                                                                                label="Edit"
                                                                                borderRadius={20}
                                                                                bgcolor={theme.palette.primary.lightGrey3}
                                                                                color={theme.palette.primary.blackColor}
                                                                                sx={{ fontSize: 12, }}
                                                                            />
                                                                        </ButtonBase>
                                                                    </Stack>)
                                                            }

                                                        </Box>
                                                    )}

                                            </Grid>
                                        </Grid>

                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 2, borderRadius: "10px", }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Payment Method</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>

                                                {/* Wallet Method--------------------------------- */}

                                                <Box sx={{
                                                    border: 1,
                                                    borderColor: theme.palette.primary.primaryGray8,
                                                    borderRadius: 1,
                                                }}>
                                                    {/* <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 2 }}>
                                                        <Stack direction={"row"} alignItems={'flex-start'} >
                                                            <Box component="img" src="/assets/icons/calendar-edit.svg" sx={{ mr: 1 }} />
                                                            <Stack>
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>$0</Typography>
                                                                <Typography color={theme.palette.primary.primaryGrey90} variant='small1'>Wallet</Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Radio
                                                            sx={{ p: 0 }}
                                                            checked={paymentType === _paymentTypes.wallet}
                                                            onChange={() => setPaymentType(_paymentTypes.wallet)}
                                                            name="paymentType"
                                                        />
                                                    </Stack> */}

                                                    {paymentType === _paymentTypes.wallet && (
                                                        <>
                                                            <Divider sx={{ mx: 3, mb: 2, borderColor: theme.palette.primary.lightGrey5 }} />
                                                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ mx: 3, pb: 2, }}>
                                                                <Typography component={"p"} color={theme.palette.primary.greenColor} variant='small1'>Remaining balance</Typography>
                                                                <Typography component={"p"} color={theme.palette.primary.greenColor} variant='semiBoldText'>$300</Typography>
                                                            </Stack>
                                                            <Box sx={{ backgroundColor: theme.palette.primary.lightPink2, p: 2, }}>
                                                                <Stack direction={"row"} alignItems={"center"} sx={{ py: 2 }}>
                                                                    <Radio
                                                                        sx={{ p: 0, mr: 1 }}
                                                                        checked={selectedCard === 'f'}
                                                                        onChange={(e) => setSelectedCard(e.target.value)}
                                                                        value="f"
                                                                        name="radio-buttons"
                                                                    />
                                                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Use with Pay Online</Typography>
                                                                </Stack>
                                                                <Stack direction={"row"} alignItems={"center"} sx={{ py: 2 }}>
                                                                    <Radio
                                                                        sx={{ p: 0, mr: 1 }}
                                                                        checked={selectedCard === 'g'}
                                                                        onChange={(e) => setSelectedCard(e.target.value)}
                                                                        value="g"
                                                                        name="radio-buttons"
                                                                    />
                                                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Use with Email Money Transfer</Typography>
                                                                </Stack>
                                                            </Box>
                                                            <Box sx={{ backgroundColor: theme.palette.primary.lightYellow, p: 2, ...useStyles.pinkBox }}>
                                                                <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant='cardText'>Send money from your bank app to etransfer@tiffinstash.com </Typography>
                                                            </Box>
                                                        </>
                                                    )}
                                                </Box>

                                                {/* Online Method--------------------------------- */}

                                                <Box sx={{ border: 1, borderColor: theme.palette.primary.primaryGray8, borderRadius: 1, mt: 2 }}>
                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 2, }}>
                                                        <Stack direction={"row"} alignItems={'flex-start'} >
                                                            <Box component="img" src="/assets/icons/global.svg" sx={{ mr: 1 }} />
                                                            <Typography color={theme.palette.primary.primaryDmain} variant='cardHeading'>Pay online</Typography>
                                                        </Stack>
                                                        <Radio
                                                            sx={{ p: 0 }}
                                                            checked={paymentType === _paymentTypes.online}
                                                            onChange={() => handlePaymentType(_paymentTypes.online)}
                                                            name="paymentType"
                                                        />
                                                    </Stack>

                                                    {/* {selectedValue === _paymentTypes.wallet && (
                                                        <Box sx={{ backgroundColor: theme.palette.primary.lightPink2, p: 2, ...useStyles.pinkBox }}>
                                                            <Typography component={"p"} color={theme.palette.primary.main} variant='cardText'>Select card</Typography>
                                                            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 1 }}>
                                                                <Radio
                                                                    sx={{ p: 0 }}
                                                                    checked={selectedCard === 'd'}
                                                                    onChange={(e) => setSelectedCard(e.target.value)}
                                                                    value="d"
                                                                    name="radio-buttons"
                                                                />
                                                                <Box component="img" src="/assets/icons/visa.svg" sx={{ mx: 1 }} />
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Visa ••••2141</Typography>
                                                            </Stack>

                                                            <Divider sx={{ my: 2, borderColor: theme.palette.primary.contrastText }} />

                                                            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 1 }}>
                                                                <Radio
                                                                    sx={{ p: 0 }}
                                                                    checked={selectedCard === 'e'}
                                                                    onChange={(e) => setSelectedCard(e.target.value)}
                                                                    value="e"
                                                                    name="radio-buttons"
                                                                />
                                                                <Box component="img" src="/assets/icons/visa.svg" sx={{ mx: 1 }} />
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Visa ••••2141</Typography>
                                                            </Stack>

                                                            <Divider sx={{ my: 2, borderColor: theme.palette.primary.contrastText }} />

                                                            <CustomChip
                                                                borderRadius={30}
                                                                color={theme.palette.primary.main}
                                                                bgcolor={theme.palette.primary.contrastText} label={"+ add a card"}
                                                            />
                                                        </Box>
                                                    )} */}
                                                </Box>


                                                {/* Email Method--------------------------------- */}

                                                <Box sx={{ border: 1, borderColor: theme.palette.primary.primaryGray8, borderRadius: 1, mt: 2 }}>

                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 2, }}>
                                                        <Stack direction={"row"} alignItems={'flex-start'} >
                                                            <Stack direction={"row"} alignItems={'flex-start'} >
                                                                <Box component="img" src="/assets/icons/moneys.svg" sx={{ mr: 1 }} />
                                                                <Typography color={theme.palette.primary.primaryDmain} variant='cardHeading'>Email Money Transfer</Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Radio
                                                            sx={{ p: 0 }}
                                                            checked={paymentType === _paymentTypes.email}
                                                            onChange={() => handlePaymentType(_paymentTypes.email)}
                                                            name="paymentType"
                                                        />
                                                    </Stack>

                                                    {paymentType === _paymentTypes.email && (
                                                        <Box sx={{ backgroundColor: theme.palette.primary.lightPink2, p: 2, ...useStyles.pinkBox }}>
                                                            <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant='cardText'>Send money from your bank app to etransfer@tiffinstash.com </Typography>
                                                        </Box>
                                                    )}

                                                </Box>

                                            </Grid>
                                        </Grid>

                                    </Box>

                                    <Grid item xs={12} md={12}>
                                        <LoadingButton
                                            loading={load}
                                            fullWidth
                                            variant="contained"
                                            sx={{ height: 56, mt: 2 }}
                                            onClick={handleFinalCheckout}
                                        >
                                            <Typography variant='cardText'>Make Payment</Typography>
                                        </LoadingButton>
                                    </Grid>
                                </Grid>

                                {/* Carts ---------------------------------------- */}

                                <Grid item xs={12} md={5}>
                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Box display={"flex"} alignItems={"center"}>
                                                        <Avatar alt="" src={getS3Url(Object.values(cartItems)?.[0]?.product?.thumbNail)} />
                                                        <Stack sx={{ ml: 2 }}>
                                                            <Typography component={"p"} variant={"heading2"}>{Object.values(cartItems)?.[0]?.product?.name}</Typography>
                                                            <Typography component={"p"} variant={"cardHeading"}>---</Typography>
                                                        </Stack>
                                                    </Box>
                                                    <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <LoadingButton
                                                    loading={load}
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ height: 56, }}
                                                    onClick={handleFinalCheckout}
                                                >
                                                    <Typography variant='cardText'>Make Payment</Typography>
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 0.5, }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction="row" alignItems={"center"}>
                                                        <Box component={"img"} alt="" src="/assets/icons/shopping-cart.svg" sx={{ mr: 1 }} />
                                                        <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant={"regularText"}>Cart summary({Object.values(cartItems)?.length} items)</Typography>
                                                    </Stack>
                                                    <IconButton onClick={() => setShowSummary(!showSummary)}>
                                                        <Box component={"img"} alt="" src="/assets/icons/arrow-right.svg" />
                                                    </IconButton>
                                                </Stack>
                                            </Grid>

                                            {/* Cart Summary */}
                                            {showSummary && (
                                                <>
                                                    {
                                                        Object.values(cartItems)?.map((variant, i) =>
                                                            <Box>
                                                                {
                                                                    variant?.packs?.map(item => <Grid item md={12} xs={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={7} md={8} sx={{ alignItems: 'center', display: 'flex', }}>
                                                                                <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"cardText"}>{item?.mealType?.name} -- {item?.mealPlan?.name}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs={5} md={4}>
                                                                                <ButtonBase onClick={handleEdit(variant?.product?._id)}>
                                                                                    <Stack direction="row" sx={{ alignItems: 'center', border: 1, borderRadius: 10, p: 1, borderColor: theme.palette.primary.primaryGray2 }}>
                                                                                        <Box component={"img"} alt="" src="/assets/images/edit.svg" sx={{ height: 13, width: 13, mr: 1 }} />
                                                                                        <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"small1"}>Edit Order</Typography>
                                                                                    </Stack>
                                                                                </ButtonBase>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={12}>
                                                                                <Box sx={{ whiteSpace: 'pre-line' }}>
                                                                                    <Typography component={"p"} color={theme.palette.primary.primaryGray3} variant={"cardHeading"}>
                                                                                        {variant?.productVariant?.items?.map(elem => `${elem?.name} (${elem?.qty} ${elem?.uom})`).join(" • ")}                                                                                    </Typography>
                                                                                </Box>
                                                                                <Typography component={"p"} sx={{ mt: 2 }} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>
                                                                                    ${getProductSellingPrice(item.costPrice, item?.targetMargin, item?.deliveryCharges, item?.processingFee) * item?.qty || 0}
                                                                                </Typography>
                                                                            </Grid>

                                                                            {/* Extras Item */}
                                                                            {
                                                                                item?.extras?.length > 0 && <>

                                                                                    {
                                                                                        item?.extras?.map((extra, exInd) =>
                                                                                            <Grid item xs={12} md={12}>
                                                                                                <Box sx={{ whiteSpace: 'pre-line' }}>
                                                                                                    <Typography component={"p"} color={theme.palette.primary.primaryGray3} variant={"cardHeading"}>
                                                                                                        Extra {extra?._id?.name} ({extra?.qty} {extra?._id?.uom})
                                                                                                    </Typography>
                                                                                                </Box>
                                                                                                <Typography component={"p"} sx={{ mt: 2 }} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>
                                                                                                    ${getExtrasSP(extra?._id?.unitPrice, extra?._id?.targetMargin, extra?.qty) || 0}
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            }

                                                                            <Grid item xs={12} md={12}>
                                                                                <Box sx={{ backgroundColor: theme.palette.primary.primaryGray5, p: 2, borderRadius: 1 }}>
                                                                                    <Grid container>
                                                                                        <Grid item xs={6} md={8}>
                                                                                            <Stack direction="row" sx={{ alignItems: 'center', }}>
                                                                                                <Avatar alt="" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                                                                                                <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant={"small1"}>Delivery Start Date</Typography>
                                                                                            </Stack>

                                                                                        </Grid>
                                                                                        <Grid item xs={6} md={4}>
                                                                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                                                <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"heading4"}>{moment(item?.deliveryStartDate).format("dddd,   MMMM Do")}</Typography>
                                                                                            </Box>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Box>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>)}
                                                            </Box>
                                                        )}
                                                </>)}
                                        </Grid>
                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 0.5, }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Discount</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Stack direction="row" alignItems={"center"}>
                                                        <Box component={"img"} alt="" src="/assets/icons/discount.svg" sx={{ mr: 1 }} />
                                                        <Box>
                                                            <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant={"regularText"}>Discount code or gift card</Typography>
                                                            <Divider />
                                                            <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant={"regularText"}>{couponCode?.code}</Typography>
                                                        </Box>
                                                    </Stack>
                                                    <IconButton size='small' disabled={paymentType !== _paymentTypes.online} onClick={() => handleModelOpen(_models.coupon)}>
                                                        <Box component={"img"} alt="" src="/assets/images/arrow-right.svg" sx={{ height: 20, width: 20 }} />
                                                    </IconButton>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ backgroundColor: theme.palette.primary.contrastText, p: 3, mt: 0.5, borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <Typography color={theme.palette.primary.blackColor} variant='heading2'>Payment Summary</Typography>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Sub-total ({Object.values(cartItems)?.length} items)</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>${getCartPrice}</Typography>
                                                </Stack>
                                            </Grid>

                                            {couponCode?.code && <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Coupon ({couponCode?.code})</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>$ {couponCode?.price}</Typography>
                                                </Stack>
                                            </Grid>}
                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Estimated Taxes</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>$0</Typography>
                                                </Stack>
                                            </Grid>

                                            {/* <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>Delivery Fee</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"regularText"}>$5</Typography>
                                                </Stack>
                                            </Grid> */}

                                            <Grid item xs={12} md={12}>
                                                <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"semiBoldText"}>Total</Typography>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"semiBoldText"}>${getCartPrice - (couponCode?.price || 0)}</Typography>
                                                </Stack>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Models */}
            <CustomDialog
                heading={"Rider Message"}
                open={model.name === _models.riderNote}
                onClose={handleModelClose}>
                <RiderMessage riderMsg={riderMsg} setRiderMsg={setRiderMsg} />
            </CustomDialog>

            <CustomDialog
                heading={"Apply coupon"}
                open={model.name === _models.coupon}
                onClose={handleModelClose}>
                <Discount
                    cartId={cartId}
                    couponCode={couponCode}
                    setCouponCode={(code) => { setCouponCode(code); handleModelClose() }}
                />
            </CustomDialog>
        </>
    )
}


const useStyles = {
    pinkBox: {
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
    }
}