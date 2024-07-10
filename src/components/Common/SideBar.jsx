import { Avatar, Box, Button, ButtonBase, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemButton, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Scrollbar from '../Scrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '@/redux/selectors/authSelectors'
import { getUser } from '@/redux/selectors/userSelectors'
import GettingStart from '../AuthScreens/GettingStart'
import { setAuth } from '@/redux/slicers/auth'
import { removeAuthCookie } from '@/utils/helpers/authHelpers'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { _routes } from '@/utils/endPoints/routes'

const _model = {
    login: "login",
    signup: "signup"
}

export default function SideBar({ open, sideBarConfig = [], onClose = () => { } }) {
    const theme = useTheme()
    const router = useRouter()

    // Redux
    const { isAuth } = useSelector(getAuth)
    const { firstName, lastName } = useSelector(getUser)
    const dispatch = useDispatch()

    // states
    const [model, setModel] = useState({ name: '', open: false });

    // helpers
    const handleOpenModal = (name) => { onClose(); setModel({ ...model, name, open: true }); }
    const handleCloseModal = () => setModel({ ...model, open: false });

    const handleLogout = () => {
        dispatch(setAuth({ token: '', isAuth: false, userType: '' }))
        removeAuthCookie()
        onClose()
    }

    const handleProfile = () => { router.push(_routes.user.profile); onClose() }

    return (
        <React.Fragment>
            <Drawer anchor={'left'} open={open} onClose={onClose}>
                <Box sx={{ width: 264 }}>
                    <Scrollbar show sx={{ height: '100vh' }}>
                        <Stack p={3} sx={{ height: '100vh', justifyContent: 'space-between' }}>
                            {
                                isAuth ?
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Box sx={{ backgroundColor: theme.palette.primary.lighterPink, py: 1, px: 2, borderRadius: 1 }}>
                                                <Typography variant='heading3' color={theme.palette.primary.main}>{firstName?.substring(0, 1)}{lastName?.substring(0, 1)}</Typography>
                                            </Box>
                                            <Stack sx={{ ml: 2 }}>
                                                <Typography variant='heading3' color={theme.palette.primary.blackColor}>{firstName}</Typography>
                                                <ButtonBase onClick={handleProfile}>
                                                    <Typography component={"p"} variant='cardText' color={theme.palette.primary.main}>Manage Account</Typography>
                                                </ButtonBase>
                                            </Stack>
                                        </Box>

                                        <Box>
                                            <Divider sx={{ mt: 2, borderColor: theme.palette.primary.primaryEdark }} />
                                        </Box>

                                        <List>
                                            {
                                                sideBarConfig?.map((item, i) =>
                                                    <ListItemButton component={Link} to={item?.path || "#"} key={`sidebart_${i}`} sx={{ paddingLeft: 0 }} onClick={onClose}>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <Box component="img" src={item?.img} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <Typography variant='cardText'>{item?.title}</Typography>
                                                    </ListItemButton>)
                                            }
                                        </List>
                                        <ButtonBase onClick={handleLogout}>
                                            <Typography variant='cardText'>Sign out</Typography>
                                        </ButtonBase>
                                    </Box> :
                                    <Box>
                                        <Button variant='contained' fullWidth sx={{ height: 56, mb: 2 }} onClick={() => handleOpenModal(_model.signup)}>Sign up</Button>
                                        <Button fullWidth
                                            sx={{
                                                height: 56,
                                                backgroundColor: theme.palette.primary.contrastText,
                                                color: theme.palette.primary.blackColor,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.contrastText,
                                                }
                                            }}
                                            onClick={() => handleOpenModal(_model.login)}
                                        >Login</Button>
                                    </Box>
                            }

                            {/* Footer */}
                            <Box>
                                <Box item xs={12}>
                                    <Divider sx={{ my: 2, borderColor: theme.palette.primary.primaryEdark }} />
                                </Box>
                                <Box item xs={12}>
                                    <Typography component={"p"} variant='heading2'>Download TiffinStash App.</Typography>
                                    <Stack sx={{ mt: 1 }}>
                                        <Box component="img" src="/assets/images/appStore.svg" sx={{ display: 'block', marginY: 1 }} />
                                        <Box component="img" src="/assets/images/playStore.svg" sx={{ display: 'block', marginY: 1 }} />
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                    </Scrollbar>
                </Box>
            </Drawer>

            {/* Getting Start */}
            {
                model.open &&
                <GettingStart
                    open={model.open}
                    screen={model.name}
                    onClose={handleCloseModal} />
            }
        </React.Fragment>
    )
}
