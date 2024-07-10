import React, { useMemo, useState } from 'react'
import CustomDialog from '../Common/CustomDialog'
import { Box, Grid } from '@mui/material'
import { useTheme } from '@emotion/react'
import CustomChip from '../Common/CustomChip'
import Login from './Login'
import CreateAccount from './CreateAccount'
import Signup from './Signup'
import VerifyNumber from './VerifyNumber'

const _model = {
    login: "login",
    signup: "Sign Up With Email",
    createAccount: "createAccount",
    verifyNumber: "verifyNumber"
}

export default function GettingStart({ open = false, screen = _model.login,isRedirect=true, onClose = () => { } }) {
    const theme = useTheme()

    // States
    const [selectedChip, setSelectedChip] = useState(screen === _model.login ? 0 : 1);
    const [screenStack, setScreenStack] = useState([])
    const [user, setUser] = useState({ dialCode: '', phone: '' })

    // helpers
    const handleChipClick = (chipIndex) => setSelectedChip(chipIndex)

    // Get Active screen name
    const activeStack = useMemo(() => screenStack?.length > 0 ? screenStack[screenStack?.length - 1] : null, [screenStack])

    const pushToStack = (screen) => setScreenStack(prev => [...prev, screen])
    const popStack = () => {
        let tmp = [...screenStack]
        tmp.pop()
        setScreenStack(tmp)
    }

    const handleSignUpSuccess = (dialCode, phone) => {
        setUser({ ...user, dialCode, phone })
        pushToStack(_model.verifyNumber)
    }

    const handleVerifyOTP = () => {
        setScreenStack([])
        setSelectedChip(0)
    }

    return (
        <CustomDialog
            maxWidth="md"
            open={open}
            showBorderBottom={true}
            onClose={onClose}
            onBack={popStack}

            // Stack screen props
            heading={(activeStack !== _model.verifyNumber) && activeStack}
            showBackButton={Boolean(activeStack)}
            showCloseIcon={!Boolean(activeStack)}
        >

            {
                activeStack ?
                    <>
                        {
                            activeStack === _model.signup ?
                                <Signup onSuccess={handleSignUpSuccess} /> :
                                activeStack === _model.verifyNumber ?
                                    <VerifyNumber phone={user.phone} dialCode={user?.dialCode} onVerifyOTP={handleVerifyOTP} /> : null
                        }

                    </> :
                    <>
                        {/* Login/Signup */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box className="customBox" sx={{
                                    backgroundColor: theme.palette.primary.lightGrey,
                                    display: 'flex',
                                    alignItems: 'center',
                                    maxWidth: 400
                                }}>
                                    <CustomChip
                                        label="Login"
                                        bgcolor={selectedChip === 0 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                        color={selectedChip === 0 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                        onClick={() => handleChipClick(0)}
                                        borderRadius={40}
                                        sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                    />
                                    <CustomChip
                                        label="Signup"
                                        bgcolor={selectedChip === 1 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                        color={selectedChip === 1 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                        onClick={() => handleChipClick(1)}
                                        borderRadius={40}
                                        sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Render Dialogs */}
                        {selectedChip === 0 && <Login isRedirect={isRedirect} onMobileVerify={handleSignUpSuccess} onClose={onClose}/>}
                        {selectedChip === 1 && <CreateAccount onSignup={() => pushToStack(_model.signup)} />}
                    </>
            }
        </CustomDialog>
    )
}
