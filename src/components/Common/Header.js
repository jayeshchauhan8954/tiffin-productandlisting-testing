import React, { useState } from 'react'
import { useTheme } from '@emotion/react'
import { Badge, Box, ButtonBase, Container, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'
import { getAddress } from '@/redux/selectors/locationSelectors'
import { useRouter } from 'next/navigation'
import { _routes } from '@/utils/endPoints/routes'
import AddressModal from '../InfoModals/AddressModal'
import CustomDialog from './CustomDialog'
import CustomModal from './CustomModal'
import CartListing from '../user/cart/CartListing'
import { getCartNotificationCount, getunReadCountCount } from '@/redux/selectors/notificationSelectors'

export default function Header() {
    const theme = useTheme()

    const router = useRouter()

    // states
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    // Redux
    const { city, state, country, address } = useSelector(getAddress)
    const unReadCount = useSelector(getunReadCountCount)
    const cartCount = useSelector(getCartNotificationCount)


    // helpers
    const handleOpenSidebar = () => setOpenSidebar(true);
    const handleCloseSidebar = () => setOpenSidebar(false);

    const handleOpenLoc = () => setOpenLocation(true);
    const handleCloseLoc = () => setOpenLocation(false);

    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);

    const handleNavigation = () => router.push(_routes.user.products)

    // sidebar config
    const sideBarConfig = [
        { title: "Orders", img: "/assets/images/receipt.svg", path: _routes.user.orders },
        { title: "Favourite Tiffin", img: "/assets/images/heart.svg", path: _routes.user.favorite },
        { title: "Wallet", img: "/assets/images/wallet.svg" },
        { title: "Rewards", img: "/assets/images/receipt.svg",path: _routes.user.rewards },
        { title: "Refferrals", img: "/assets/images/gift.svg" },
        { title: "Get Help", img: "/assets/images/chat.svg" }
    ]

    return (
        <>
            <Box id="appHeader" sx={{ backgroundColor: "white", py: 3, boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px", }}>
                <Container>
                    <Grid container sx={{ alignItems: 'center', }}>
                        <Grid xs={2} md={3}>
                            <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                                <IconButton size='small'>
                                    <Box
                                        component="img" src="/assets/images/menu.svg"
                                        onClick={handleOpenSidebar}
                                        sx={{ height: 30, width: 30, }} />
                                </IconButton>
                                <ButtonBase onClick={handleNavigation}>
                                    <Box component="img" src="/assets/images/logo.svg" sx={{ height: 32, width: 140, ml: 2 }} />
                                </ButtonBase>
                            </Stack>
                        </Grid>
                        <Grid xs={12} md={7} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
                            <Box sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1, p: 1, border: 1, borderColor: theme.palette.primary.primaryEdark, width: '100%' }}>
                                <Grid container>
                                    <Grid xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box component="img" src="/assets/images/location.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                                        <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                                            <Tooltip title={`${address}, ${city}, ${state}, ${country}`}>
                                                <Typography
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        flex: 0.9
                                                    }}

                                                >{city} {state} {country}</Typography>
                                            </Tooltip>
                                            <IconButton onClick={handleOpenLoc}>
                                                <Box component="img" src="/assets/images/down.svg" sx={{ height: 20, width: 20, }} />
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', sm: 'block' }, }} />
                                    <Grid xs={12} md={7}>
                                        <TextField
                                            fullWidth
                                            id="input-with-icon-textfield"
                                            sx={{
                                                '& .MuiInput-underline:before': {
                                                    borderBottom: 'none',
                                                },
                                                '& .MuiInput-underline:after': {
                                                    borderBottom: 'none',
                                                },
                                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                                    borderBottom: 'none',
                                                },
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Box component="img" src="/assets/images/search.svg" sx={{ height: 17, width: 17, }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                            placeholder='Search for cuisine or a dish'
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid xs={10} md={2}>
                            <Stack direction={"row"} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                <IconButton size='small'>
                                    <Badge badgeContent={unReadCount} color="primary">
                                        <Box component="img" src="/assets/images/notification.svg" sx={{ height: 30, width: 30 }} />
                                    </Badge>
                                </IconButton>
                                <IconButton size='small' onClick={handleOpenCart}>
                                    <Badge badgeContent={cartCount} color="primary" >
                                        <Box component="img" src="/assets/images/cart.svg" sx={{ height: 30, width: 30, }} />

                                    </Badge>
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Sidebar */}
            <SideBar
                open={openSidebar}
                sideBarConfig={sideBarConfig}
                onClose={handleCloseSidebar} />

            {/* Address */}
            <CustomDialog open={openLocation} heading={"Search location"} onClose={handleCloseLoc}>
                <AddressModal />
            </CustomDialog>

            {/* Cart Modal */}
            <CustomModal open={openCart} title={"CART"} onClose={handleCloseCart}>
                <CartListing onClose={handleCloseCart} />
            </CustomModal>
        </>
    )
}
