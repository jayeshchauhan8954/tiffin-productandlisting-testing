'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, Divider, Grid, Stack, TextField, Typography, useTheme } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomChip from '@/components/Common/CustomChip';
import ViewRewards from './points/ViewRewards';
import EarnPoints from './points/EarnPoints';
import PointHistory from './points/PointHistory';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import CustomDialog from '@/components/Common/CustomDialog';
import { showMessage } from '@/utils/helpers/toastHelpers';
import { getReedeemPointPrice } from '@/utils/helpers/appHelpers';

export default function Reward() {
    const theme = useTheme()
    
    const [load, setLoad] = useState(false)
    const [value, setValue] = useState('1');

    const [modal, setModal] = useState(false);
    const [applyCodeModal, setApplyCodeModal] = useState(false)

    const [state, setState] = useState({
        rows: [],
        pointRedeemptionPrice: { points: 0, price: 0 },
        totalRewardPoints: 0
    })

    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);

    const handleChange = (event, newValue) => { setValue(newValue) };
    
    useEffect(() => {
        getRewards();
    }, [])

    const getRewards = async () => {
        setLoad(true)
        let { data, status, message } = await apiRequest({
            method: "GET",
            endUrl: _apiUrls.user.reward
        })
        setLoad(false)
        console.log(data, "reward data")
        if (status) {
            setState({
                ...state,
                rows: data?.rewards,
                pointRedeemptionPrice: data?.pointRedeemptionPrice,
                totalRewardPoints: data?.totalRewardPoints
            })
        }
    }

    const handleRedeem = async () => {
        setLoad(true)
        let { data, status, message } = await apiRequest({
            method: "POST",
            endUrl: _apiUrls.user.redeem,
            body: {
                points: state?.totalRewardPoints
            },
        })
        setLoad(false)
        if (status) {
            setModal(false)
            setApplyCodeModal(true)
        } else {
            showMessage({ message: message })
        }
    }

    const priceToReceive = useMemo(() => {
        return getReedeemPointPrice(state.totalRewardPoints, state?.pointRedeemptionPrice.points, state?.pointRedeemptionPrice.price)
    }, [])


    return (
        <>
            <Box sx={{ backgroundColor: theme.palette.primary.main, p: 5, mb: 4 }}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={10} md={10} sx={{ margin: 'auto' }}>
                            <Typography variant='semiBoldText' fontSize={30} color={theme.palette.primary.contrastText}>STASH POINTS</Typography>
                            <Box sx={{ backgroundColor: theme.palette.primary.contrastText, px: 3, py: 2, mt: 1, borderRadius: 1, }}>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography variant='semiBoldText' fontSize={24} color={theme.palette.primary.primaryDmain}>{state?.totalRewardPoints} Pts</Typography>
                                    <Divider
                                        orientation='vertical'
                                        flexItem sx={{ height: 40, my: 1, mx: 1, display: { xs: 'none', sm: 'block' }, }} />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        placeholder="Every 100 points can be redeemed for $1 OFF on entire order"
                                        sx={{ ...useStyles.textFeild }}
                                    />
                                    <Button
                                        onClick={handleOpen}
                                        sx={{ height: 56 }}
                                        variant='contained'>
                                        Redeem Points
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Rewards" value="1" />
                                        <Tab label="Earn Stash Points" value="2" />
                                        <Tab label="Point History" value="3" />
                                    </TabList>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>

                    <TabPanel value="1">
                        <ViewRewards />
                    </TabPanel>
                    <TabPanel value="2">
                        <EarnPoints />
                    </TabPanel>
                    <TabPanel value="3">
                        <PointHistory points={state} />
                    </TabPanel>
                </TabContext>
            </Box>
    
    {/* Redeem Point Modal ----------------------------------------- */}

            <CustomDialog
                maxWidth="md"
                showBorderBottom={true}
                open={modal}
                onClose={handleClose}
                heading={"Redeem Points"}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box component={"img"} alt="" src="/assets/icons/roundtiffin.svg" sx={{ mr: 2 }} />
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Typography component={"p"} fontSize={20} variant='boldtext' sx={{ mr: 1 }} color={theme.palette.primary.primaryDmain}>
                                        {state?.totalRewardPoints}
                                    </Typography>
                                    <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>Points</Typography>
                                </Stack>
                            </Stack>
                            <CustomChip
                                avatarSrc={"/assets/icons/reward.svg"}
                                label={`${state.pointRedeemptionPrice.points} Points =  $${state.pointRedeemptionPrice.price}`}
                                bgcolor={theme.palette.primary.lightPink}
                                color={theme.palette.primary.main}
                                borderRadius={50}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component={"img"} alt="" src="/assets/icons/award.svg" sx={{ mr: 2 }} />
                            <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>Every 100 points can be redeemed for $1 OFF on entire order</Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain2}>Amount to redeem</Typography>
                        <Box sx={{ border: 1, borderColor: theme.palette.primary.primaryGray2, p: 2, borderRadius: 1, my: 1 }}>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                <CustomChip
                                    label={"Stash Points"}
                                    bgcolor={theme.palette.primary.lighterGray}
                                    color={theme.palette.primary.primaryGray4}
                                    borderRadius={50}
                                />
                                <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain2}>{state?.totalRewardPoints}</Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain2}>Amount to receive</Typography>

                        <Box sx={{ border: 1, borderColor: theme.palette.primary.primaryGray2, p: 2, borderRadius: 1, my: 1 }}>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                <CustomChip
                                    label={"CAD($)"}
                                    bgcolor={theme.palette.primary.lighterGray}
                                    color={theme.palette.primary.primaryGray4}
                                    borderRadius={50}
                                />
                                <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain2}>{priceToReceive}</Typography>
                            </Stack>
                        </Box>
                    </Grid>


                    <Grid item xs={12} md={12}>
                        <Button
                            onClick={handleRedeem}
                            fullWidth
                            sx={{ height: 56 }}
                            variant='contained'>Redeem Point</Button>
                    </Grid>


                </Grid>
            </CustomDialog>


            {/* Apply Code ================  */}

            <CustomDialog
                maxWidth="md"
                showBorderBottom={true}
                open={applyCodeModal}
                onClose={() => setApplyCodeModal(false)}
                heading={"Redeem Points"}
            >
                <Grid container spacing={2}>

                    <Grid item xs={12} md={12}>
                        <Box sx={{ justifyContent: 'center', alignItems: 'center', alignSelf: '' }}>
                            <Box component={"img"} alt="" src="/assets/icons/bug2.svg" />
                            <Typography component={"p"} fontSize={20} variant='boldtext' sx={{ my: 1, textAlign: 'center' }} color={theme.palette.primary.primaryDmain}>Report Bugs</Typography>
                            <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4} sx={{ my: 1, textAlign: 'center' }}>Beta Version Only: Report bugs to earn reward points! Help us improve your experience.</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </CustomDialog>






        </>
    )
}


const useStyles = {
    coupanBox: {
        width: 40, height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 1
    },
    textFeild: {
        minWidth: 600,
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'transparent',
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        }
    }
}