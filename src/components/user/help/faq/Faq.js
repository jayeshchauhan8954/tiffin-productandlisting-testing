'use client'
import { Box, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomChip from '@/components/Common/CustomChip';
import FaqDetail from './FaqDetail';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { apiRequest } from '@/utils/config/apiRequest';
import { _routes } from '@/utils/endPoints/routes';
import { useRouter } from 'next/navigation';

export default function Faq() {

    const theme = useTheme()
    const [selectedChip, setSelectedChip] = useState(0);
    const handleChipClick = (chipIndex) => { setSelectedChip(chipIndex) }

    const [faqs, setFaqs] = useState([])


    useEffect(() => {
        fetchFAQ()
    }, [selectedChip])


    const fetchFAQ = async () => {
        const { data, status, message } = await apiRequest({
            endUrl: _apiUrls.user.faqs,
            method: "GET",
            query: { category: selectedChip === 0 ? "orderAndSubscription" : "deliveryAndTracking" }
        })
        if (status) {
            setFaqs(data?.rows)
        }
    }

    const router = useRouter()

    const [faqDetails, setFaqDetails] = useState(null)

    const handleFaqView = (data)=>setFaqDetails(data)
    const handleFaqClose = ()=>setFaqDetails(null)


    return (
        <>
            {!faqDetails ? <>
                <Container>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={12}>
                            <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>Frequently Asked Questions(FAQs)</Typography>
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <TextField
                                sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1, my: 1 }}
                                multiline
                                variant="outlined"
                                fullWidth
                                placeholder='Search question'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={10} sx={{ mt: 3, }}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box className="customBox" sx={{
                                    backgroundColor: theme.palette.primary.lightGrey,
                                    [theme.breakpoints.down('sm')]: {
                                        width: '76%',
                                    }, width: "35%"
                                }}>
                                    <CustomChip
                                        label="Orders & Subscription"
                                        bgcolor={selectedChip === 0 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                        color={selectedChip === 0 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                        onClick={() => handleChipClick(0)}
                                        borderRadius={40}
                                        sx={{ fontSize: { xs: 13, md: 14 }, padding: { xs: 20, md: 20 }, margin: 'auto' }}
                                    />
                                    <CustomChip
                                        label="Delivery & Tracking"
                                        bgcolor={selectedChip === 1 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                        color={selectedChip === 1 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                        onClick={() => handleChipClick(1)}
                                        borderRadius={40}
                                        sx={{ fontSize: { xs: 13, md: 14 }, padding: { xs: 20, md: 20 }, margin: 'auto' }}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>

                <Container>
                    <Grid container spacing={2}>

                        {faqs.map((item) =>
                            <Grid key={`faqs_${item?._id}`} item xs={12} md={10} sx={{ mt: 3, }}>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Stack direction={"row"} alignItems={"center"}>
                                        <Box component="img" src="/assets/icons/help-circle.svg" sx={{ mr: 1, height: 20 }} />
                                        <Typography component={"p"} color={theme.palette.primary.primaryDmain} variant='cardHeading'>{item?.question} </Typography>
                                    </Stack>
                                    <IconButton onClick={() => handleFaqView(item)}>
                                        <Box component="img" src="/assets/images/arrow-right.svg"
                                        />
                                    </IconButton>
                                </Stack>
                            </Grid>
                        )}

                    </Grid>
                </Container>
            </> :
                <FaqDetail
                    data={faqDetails}
                    onBackPress={handleFaqClose}
                />}
        </>
    )
}
