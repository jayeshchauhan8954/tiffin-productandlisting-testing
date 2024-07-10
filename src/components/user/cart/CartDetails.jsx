import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Button, ButtonBase, ButtonGroup, Divider, Grid, IconButton, InputAdornment, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'
import { fontName } from '@/utils/fonts/Font';
import CounterButton from '@/components/Common/CounterButton';
import CustomDialog from '@/components/Common/CustomDialog';
import SellerMessage from '@/components/InfoModals/SellerMessage';
import RiderMessage from '@/components/InfoModals/RiderMessage';
import Discount from '@/components/InfoModals/Discount';
import CustomChip from '@/components/Common/CustomChip';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { updateCart } from '@/redux/slicers/cart';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getCityId } from '@/redux/selectors/locationSelectors';
import { getCartListing, getCartPrice } from '@/redux/selectors/checkoutSelectors';
import { apiRequest } from '@/utils/config/apiRequest';
import { getExtrasSP, getProductSellingPrice } from '@/utils/helpers/pricing';
import { getS3Url } from '@/utils/helpers/fileHelper';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';


export default function CartDetails({ cartId ,onClose=()=>{}}) {
    const theme = useTheme();
    const router = useRouter()

    // States
    const [model, setModel] = useState({ open: false, data: {} })
    const [sellerMsg, setSellerMsg] = useState("")

    // Redux
    const dispatch = useDispatch()
    const cartItems = useSelector(getCartListing)
    const cartPrice = useSelector(getCartPrice)

    useEffect(() => { cartId && fetchCartDetails() }, [cartId])

    const fetchCartDetails = async () => {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.user.cart,
            params: { id: cartId }
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
                    packs: item?.packs?.map(pack => ({
                        mealType: item?.productVariantId?.mealTypeId,
                        mealPlan: pack?.mealPlanId,
                        extras: pack?.extras,
                        deliveryTime: pack.deliveryTimeId,
                        qty: pack?.qty,
                        deliveryStartDate: pack?.deliveryStartDate,

                        costPrice: pack?.costPrice,
                        targetMargin: pack?.targetMargin,
                        deliveryCharges: pack?.deliveryCharges,
                        processingFee: pack?.processingFee,
                        extrasAmount: pack?.extrasAmount,
                        netAmount: pack?.netAmount
                    }))
                }
            })
            dispatch(updateCart(tmp))
        }
    }

    // Helpers
    const groupTiffinByProduct = useMemo(() => {
        let tmp = {}
        cartItems?.forEach(item => {
            if (tmp[item.product.id]) {
                tmp[item.product.id].push(item)
            } else {
                tmp[item.product.id] = [item]
            }
        })
        return Object.values(tmp)
    }, [cartItems])

    const handleQtyChange = useCallback((op, variant, packIndex) => () => {
        let tmp = { ...variant }
        let packs = [...tmp.packs]

        let netAmount = (getProductSellingPrice(variant?.packs?.[packIndex]?.costPrice, variant?.packs?.[packIndex]?.targetMargin, variant?.packs?.[packIndex].deliveryCharges, variant?.packs?.[packIndex].processingFee) * (op === "plus" ? packs[packIndex].qty + 1 : packs[packIndex].qty - 1)) + packs[packIndex]?.extrasAmount
        if (op === "plus") {
            packs[packIndex] = {
                ...packs[packIndex],
                qty: packs[packIndex].qty + 1,
                netAmount
            }
        } else if (packs[packIndex].qty > 1) {
            packs[packIndex] = {
                ...packs[packIndex],
                qty: packs[packIndex].qty - 1,
                netAmount,
            }
        }
        tmp.packs = packs

        updateCartByapi(variant, tmp)

        dispatch(updateCart({ [variant?.productVariant?._id]: tmp }))
    }, [])

    const handleTiffinSellerNote = () => {
        let tmp = { ...model?.data }
        tmp['sellerNote'] = sellerMsg
        dispatch(updateCart({ [model?.data?.productVariant?._id]: tmp }))

        updateCartByapi(model?.data, tmp)
        handleCloseModel()
    }

    const handleExtraQty = (op, variant, packIndex, exInx) => () => {
        let tmp = { ...variant }
        let packs = [...tmp.packs]
        let extTmp = [...packs[packIndex].extras]
        let extrasAmount = variant?.packs[packIndex]?.extrasAmount,
            netAmount = variant?.packs[packIndex]?.netAmount

        if (op === "plus") {
            extTmp[exInx] = { ...extTmp[exInx], qty: extTmp[exInx].qty + 1 }
            extrasAmount = extTmp?.reduce((net, item) => net += getExtrasSP(item?._id?.unitPrice, item?._id?.targetMargin, item?.qty), 0) || 0
            netAmount = (variant?.packs[packIndex]?.netAmount - variant?.packs[packIndex]?.extrasAmount) + extrasAmount
        } else if (extTmp[exInx].qty > 1) {
            extTmp[exInx] = { ...extTmp[exInx], qty: extTmp[exInx].qty - 1 }
            extrasAmount = extTmp?.reduce((net, item) => net += getExtrasSP(item?._id?.unitPrice, item?._id?.targetMargin, item?.qty), 0) || 0
            netAmount = (variant?.packs[packIndex]?.netAmount - variant?.packs[packIndex]?.extrasAmount) + extrasAmount
        }

        packs[packIndex] = { ...packs[packIndex], extras: extTmp, extrasAmount, netAmount }
        tmp.packs = packs


        updateCartByapi(variant, tmp)
        dispatch(updateCart({ [variant?.productVariant?._id]: tmp }))
    }

    const handleDelete = useCallback((variant, packIndex) => () => {
        let tmp = { ...variant }
        let packs = [...tmp.packs]

        packs.splice(packIndex, 1)

        tmp.packs = packs
        updateCartByapi(variant, packs)
        dispatch(updateCart({ [variant?.productVariant?._id]: tmp }))
    }, [])

    const updateCartByapi = async (variant, tmp) => {
        let payload = {
            productId: variant?.product?._id,
            sellerNote: tmp?.sellerNote,
            deliveryNote: tmp?.deliveryNote,
            item: {
                productVariantId: variant?.productVariant?._id,
                packs: tmp?.packs?.map(pack => ({
                    qty: pack?.qty,
                    mealPlanId: pack?.mealPlan?._id,
                    mealTypeId: pack?.mealType?._id,
                    deliveryTimeId: pack?.deliveryTime?._id,
                    deliveryStartDate: pack?.deliveryStartDate,
                    extras: pack?.extras,

                    costPrice: pack?.costPrice,
                    targetMargin: pack?.targetMargin,
                    deliveryCharges: pack.deliveryCharges,
                    processingFee: pack.processingFee,
                    extrasAmount: pack?.extrasAmount,
                    netAmount: pack?.netAmount,
                }))
            }
        }
        await apiRequest({
            method: "POST",
            endUrl: _apiUrls.user.cart,
            body: payload
        })
    }

    const handleOpenModel = (data = {}) => setModel({ ...model, open: true, data })
    const handleCloseModel = () => setModel({ ...model, open: false })

    const handleProceedToCheckout = () => router.push(_routes.user.checkout(cartId))

    const handleEdit = (productId) => () => {
        router.push(_routes.user.productDetails(productId))
        onClose()
    }

    return (
        <>
            <Box>
                { // Products
                    groupTiffinByProduct?.map((prds, index) => <Grid key={`products_${index}`} container spacing={2}>
                        <Grid item xs={10} md={10}>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <Avatar alt="" src={getS3Url(prds?.[0]?.product?.thumbNail)} />
                                <Stack sx={{ ml: 2 }}>
                                    <Typography component={"p"} variant={"heading2"}>{prds?.[0]?.product?.name}</Typography>
                                    <Typography component={"p"} variant={"cardHeading"}>{prds?.[0]?.dropLocation?.address}</Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box component={"img"} alt="" src="/assets/images/arrow-right.svg" sx={{ height: 20, width: 20 }} />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                        </Grid>

                        {/* Tiffins listing */}
                        {
                            prds?.map((variant) => <Grid key={`${prds[0]?.name}_var`} item md={12} xs={12}>
                                <Grid container>
                                    { // Packs listing
                                        variant?.packs?.map((item, packIndex) => <Grid key={`${prds[0]?.name}_var_${variant}`} item md={12} xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8} md={8} sx={{ alignItems: 'center', display: 'flex', }}>
                                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"cardText"}>{item?.mealType?.name} -- {item?.mealPlan?.name}</Typography>
                                                </Grid>

                                                <Grid item xs={4} md={4}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        <ButtonBase onClick={handleEdit(prds?.[0]?.product?._id)}>
                                                            <Stack direction="row" sx={{ alignItems: 'center', border: 1, borderRadius: 10, p: 1, borderColor: theme.palette.primary.primaryGray2 }}>
                                                                <Box component={"img"} alt="" src="/assets/images/edit.svg" sx={{ height: 13, width: 13, mr: 1 }} />
                                                                <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"small1"}>Edit Order</Typography>
                                                            </Stack>
                                                        </ButtonBase>

                                                        <IconButton onClick={handleDelete(variant, packIndex)}>
                                                            <Avatar alt="" src="/assets/images/delete.svg" sx={{ height: 30, width: 30, ml: 1 }} />
                                                        </IconButton>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={7} md={9}>
                                                    <Box sx={{ whiteSpace: 'pre-line' }}>
                                                        <Typography component={"p"} color={theme.palette.primary.primaryGray3} variant={"cardHeading"}>
                                                            {variant?.productVariant?.items?.map(elem => `${elem?.name} (${elem?.qty} ${elem?.uom})`).join(" • ")}
                                                        </Typography>
                                                    </Box>
                                                    <Typography component={"p"} sx={{ mt: 2 }} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>
                                                        ${getProductSellingPrice(item.costPrice, item?.targetMargin, item.deliveryCharges, item.processingFee) * item?.qty || 0}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={5} md={3} >
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <CounterButton
                                                            value={item?.qty}
                                                            onIncrement={handleQtyChange("plus", variant, packIndex)}
                                                            onDecrement={handleQtyChange("minus", variant, packIndex)}
                                                        />
                                                    </Box>
                                                </Grid>

                                                {/* Extras Item */}
                                                {
                                                    item?.extras?.length > 0 && <>

                                                        {
                                                            item?.extras?.map((extra, exInd) =>
                                                                <Grid item md={12} xs={12}>
                                                                    <Grid container>
                                                                        <Grid item md={12} xs={12}>
                                                                            <Stack key={`extra_${extra?._id?._id}`} flexDirection={'row'} justifyContent={'space-between'}>
                                                                                <Stack>
                                                                                    <Typography variant='cardHeading' color={theme.palette.primary.primaryGray3}>Extra {extra?._id?.name || "--"} ({extra?.qty} {extra?.uom})</Typography>
                                                                                    <Typography variant='cardHeading' color={theme.palette.primary.primaryGray4}>$ {getExtrasSP(extra?._id?.unitPrice, extra?._id?.targetMargin, extra?.qty)}</Typography>
                                                                                </Stack>
                                                                                <Box>
                                                                                    <CounterButton
                                                                                        value={extra?.qty}
                                                                                        onIncrement={handleExtraQty("plus", variant, packIndex, exInd)}
                                                                                        onDecrement={handleExtraQty("minus", variant, packIndex, exInd)}
                                                                                    />
                                                                                </Box>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            )
                                                        }
                                                    </>
                                                }

                                                {/* Delivery StartDate for tiffins */}
                                                <Grid item xs={12} md={12}>
                                                    <Box sx={{ backgroundColor: theme.palette.primary.primaryGray5, p: 2, borderRadius: 1 }}>
                                                        <Grid container>
                                                            <Grid item xs={8} md={8}>
                                                                <Stack direction="row" sx={{ alignItems: 'center', }}>
                                                                    <Avatar alt="" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                                                                    <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant={"small1"}>Delivery Start Date</Typography>
                                                                </Stack>

                                                            </Grid>
                                                            <Grid item xs={4} md={4}>
                                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                    <Typography component={"p"} color={theme.palette.primary.primaryDark} variant={"heading4"}>Friday, April 7th</Typography>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <Divider sx={{ my: 1, borderColor: theme.palette.primary.primaryEdark }} />
                                                </Grid>
                                            </Grid>
                                        </Grid>)
                                    }
                                </Grid>
                            </Grid>)
                        }


                        <Grid item xs={12} md={12}>
                            <ButtonBase  onClick={handleEdit(prds?.[0]?.product?._id)}>
                                <CustomChip
                                    borderRadius={30}
                                    color={theme.palette.primary.main}
                                    bgcolor={theme.palette.primary.lightPink} label={"+ add another tiffin"}
                                />
                            </ButtonBase>
                        </Grid>

                        {/* Meesage For Seller */}
                        {
                            cartItems?.[0]?.sellerNote ?
                                <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder='Don’t make it oily'
                                        sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1 }}
                                        value={cartItems?.[0]?.sellerNote}
                                        disabled
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => handleOpenModel(prds?.[0])} edge="end">
                                                        <Box component={"img"} alt="" src="/assets/images/edit.svg" sx={{ height: 13, width: 13, mr: 1 }} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid> :
                                <Grid item xs={12} md={12} sx={{ mt: 2 }}>
                                    <Box sx={{ border: 1, backgroundColor: theme.palette.primary.primaryGray7, borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: theme.palette.primary.primaryGray6, p: 2 }}>
                                        <Stack>
                                            <Typography component={"p"} fontSize={14} color={theme.palette.primary.blackColor} variant={"heading2"}>Leave a message for the tiffin seller</Typography>
                                            <Typography component={"p"} sx={{ mt: 1 }} color={theme.palette.primary.primaryGray8} variant={"cardHeading"}>Specify skip days, alternate days, and one or....</Typography>
                                        </Stack>
                                        <IconButton onClick={() => handleOpenModel(prds?.[0])}>
                                            <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"heading2"}>+</Typography>
                                        </IconButton>
                                    </Box>
                                </Grid>
                        }

                        {/* Footer */}
                        <Grid item md={12} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={8}>
                                    <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"heading2"}>Subtotal</Typography>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Typography component={"p"} color={theme.palette.primary.blackColor} variant={"heading2"}>${cartPrice}</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            height: 56,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                        }}
                                        onClick={handleProceedToCheckout}
                                    >
                                        <Typography sx={{ fontSize: 16, }} variant='heading2'>Proceed to checkout</Typography>
                                        <Typography sx={{ fontSize: 16, }} variant='heading2'>${cartPrice}</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>)
                }

            </Box>


            {/* Dialog Tiffin seller msg */}
            <CustomDialog
                maxWidth="md"
                heading={"Leave a message for the tiffin seller"}
                showBorderBottom={true}
                open={model.open}
                onClose={handleCloseModel}
                actions={
                    <>
                        {/* Save Btn  */}
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Button sx={{ height: 56, width: "100%", }} variant="contained" onClick={handleTiffinSellerNote}>
                                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Save</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Discount Btn  */}

                        {/* <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Button sx={{ height: 56, width: "100%", }} variant="contained">
                                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Apply</Typography>
                                </Button>
                            </Grid>
                        </Grid> */}
                    </>
                }
            >

                <SellerMessage sellerMsg={cartItems?.[0]?.sellerNote} setSellerMsg={setSellerMsg} />
                {/* <RiderMessage /> */}
                {/* <Discount /> */}
            </CustomDialog>
        </>
    )
}
