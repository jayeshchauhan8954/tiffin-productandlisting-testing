import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Badge, Box, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'

// Redux
import { useDispatch } from 'react-redux';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { hideLoader, showLoader } from '@/redux/slicers/app';
import CartDetails from './CartDetails';
import { clearCart } from '@/redux/slicers/cart';
import { getS3Url } from '@/utils/helpers/fileHelper';
import NoData from '@/components/Common/NoData';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';

const _stackScreen = {
    listing: "listing",
    cartDetails: "cartDetails"
}

export default function CartListing({ onClose = () => { } }) {

    const route = useRouter()

    // States
    const [carts, setCarts] = useState({ rows: [], count: 0 })
    const dispatch = useDispatch()
    const [screenStack, setScreenStack] = useState([{ name: _stackScreen.listing, data: {} }])

    useEffect(() => {
        fetchCartListing()
        dispatch(clearCart())
    }, [])

    const fetchCartListing = async () => {
        dispatch(showLoader())
        const { data, status } = await apiRequest({ endUrl: _apiUrls.user.cart })
        dispatch(hideLoader())
        if (status) {
            setCarts({
                ...carts,
                rows: data?.carts,
                count: 0
            })
        }
    }

    // Hepers
    // Get Active screen name
    const activeStack = useMemo(() => screenStack?.length > 0 ? screenStack[screenStack?.length - 1] : null, [screenStack])
    const pushToStack = (screen, data) => setScreenStack(prev => [...prev, { name: screen, data }])

    const handleStart = () => {
        route.push(_routes.user.products)
        onClose()
    }

    return (
        <>
            {
                activeStack?.name === _stackScreen.listing ? // Cart listing
                    <React.Fragment>

                        {
                            carts?.rows?.map(cart =>
                                <Grid key={`cart_${cart?._id}`} container spacing={2} mb={3}>
                                    <Grid item xs={10} md={10}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Avatar alt="" src={getS3Url(cart?.productInfo?.thumbNail)} />
                                            <Stack sx={{ ml: 2 }}>
                                                <Typography component={"p"} variant={"heading2"}>{cart?.productInfo?.name}</Typography>
                                                <Typography component={"p"} variant={"cardHeading"}>Subtotal : ${cart?.totalAmount || '---'}</Typography>
                                                <Typography component={"p"} variant={"cardHeading"}>{cart?.dropLocation?.address || '---'}</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Badge badgeContent={cart?.itemsLength} color="primary"></Badge>
                                        <IconButton onClick={() => pushToStack(_stackScreen.cartDetails, cart)}>
                                            <Box component={"img"} alt="" src="/assets/images/arrow-right.svg" sx={{ height: 20, width: 20 }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>)
                        }

                        {/* No Data */}
                        {carts?.rows?.length === 0 && <NoData
                            svgImage={"/assets/icons/blankcart.svg"}
                            heading={'Add tiffins to start a cart.'}
                            text={"Once you add a tiffin from a tiffin service, your cart will appear here."}
                            btnText={"Get Started"}
                            onClick={handleStart}
                        />}
                    </React.Fragment>
                    :

                    activeStack?.name === _stackScreen.cartDetails ? // Cart Details
                        <CartDetails cartId={activeStack?.data?._id} onClose={onClose} /> :
                        null
            }

        </>
    )
}



