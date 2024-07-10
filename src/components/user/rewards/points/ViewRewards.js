import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Divider, Grid, Stack, TextField, Typography, useTheme } from '@mui/material'
import CustomChip from '@/components/Common/CustomChip';
import CustomDialog from '@/components/Common/CustomDialog';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';



const RedeemStatus = {
    pending: "Pending",
    used: "Used"
}

export default function ViewRewards() {


    const theme = useTheme()
    const [selectedChip, setSelectedChip] = useState(0);
    const handleChipClick = (chipIndex) => { setSelectedChip(chipIndex) }

    const [modal, setModal] = useState(false);
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);


    const [redeemPoints, setRedeemPoints] = useState({ rows: [], })
    const [load, setLoad] = useState(false)

    useEffect(() => {
        getRedeemPoints();
    }, [selectedChip])

    const getRedeemPoints = async () => {
        setLoad(true)
        let { data, status, message } = await apiRequest({
            method: "GET",
            endUrl: _apiUrls.user.redeem,
            query: { status: selectedChip === 0 ? "Pending" : "Used" }

        })
        setLoad(false)
        if (status) {
            setRedeemPoints({
                ...redeemPoints,
                rows: data.redeemption
            })
        }
    }

    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ margin: 'auto', }}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box className="customBox" sx={{
                                backgroundColor: theme.palette.primary.lightGrey,
                                [theme.breakpoints.down('sm')]: {
                                    width: '56%',
                                }, width: "87%"
                            }}>
                                <CustomChip
                                    label="Active Rewards"
                                    bgcolor={selectedChip === 0 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selectedChip === 0 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handleChipClick(0)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                                <CustomChip
                                    label="Past Rewards"
                                    bgcolor={selectedChip === 1 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selectedChip === 1 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handleChipClick(1)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                            </Box>
                        </Stack>
                    </Grid>

                    {redeemPoints?.rows?.map((item, index) => {
                        return (
                            <Grid item xs={12} md={12} sx={{ my: 4 }}>
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, }}>
                                        <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                                    </Stack>
                                    <Box onClick={handleOpen}>
                                        <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>${item?.couponeId?.discount} off coupon</Typography>
                                        <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>Spent {item?.points} Points</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Container>

            <CustomDialog
                maxWidth="md"
                showBorderBottom={true}
                open={modal}
                onClose={handleClose}
                heading={"Reward"}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, mr: 2 }}>
                                <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                            </Stack>
                            <Box onClick={handleOpen}>
                                <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>$1 off coupon</Typography>
                                <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>Spent 100 Points</Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>Use this discount code on your next order!</Typography>
                        <Box sx={{
                            ...useStyles.copyBox,
                            backgroundColor: theme.palette.primary.lightPink3,
                            borderColor: theme.palette.primary.yellow2, p: 2, my: 2
                        }}>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                <Typography component={"p"} variant='heading3' color={theme.palette.primary.primaryDmain2}>BAL-b15abf5c0c2s</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box component={"img"} alt="" src="/assets/icons/copy.svg" sx={{ height: 20, mr: 1 }} />
                                    <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain2}>Copy</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Button
                            fullWidth
                            sx={{ height: 56 }}
                            variant='contained'>Apply Code</Button>
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
    },

    copyBox: {
        borderRadius: 1,
        border: 1,
        borderStyle: 'dashed',
    }
}
