import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Button, ButtonGroup, Checkbox, Divider, Grid, Radio, Stack } from '@mui/material';
import { fontName } from '@/utils/fonts/Font';
import CustomChip from '../Common/CustomChip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CommonCalender from '../Common/CommonCalender';


export default function OrderDetailCard() {

    const theme = useTheme();

    // Radio ------------------------------
    const [selectedValue, setSelectedValue] = useState('a');
    const [counter, setCounter] = useState(0);
    const [showOrder, setShowOrder] = useState(true);

    return (
        <>
            <Grid container spacing={2}>
                {/* Part 1----------------------------------------------- */}
                <Grid item xs={6} md={8}>
                    <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }}>
                        <Typography variant={"title"}>Basic</Typography>
                        <CustomChip bgcolor={theme.palette.primary.main} label={"NON - VEG"} sx={{ fontFamily: fontName.PoppinsMedium }} borderRadius={40} />
                    </Stack>
                    <Typography variant="cardHeading" color={theme.palette.text.secondary} component="div">
                        5 Roti • 1 Sabzi (8 oz) • 1 Kathod (8 oz)
                    </Typography>
                </Grid>
                <Grid item xs={6} md={4} sx={{ textAlign: 'right', }}>
                    <Typography variant={"title"}>$154</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box
                        component="img"
                        src="/assets/images/img1.png"
                        sx={{
                            width: '100%',
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant={"heading3"} sx={{ mt: 2 }}>Meal Plan </Typography>
                    <Typography component={"p"} variant={"cardHeading"}>Select your preferred meal plan</Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{
                        border: 1,
                        borderColor: selectedValue === 'a' ? theme.palette.primary.main : theme.palette.primary.primaryDGrey,
                        borderRadius: 1,
                    }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant={"cardHeading"} sx={{ mx: 1 }}
                                color={selectedValue === 'a' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                Trial
                            </Typography>
                            <Radio
                                checked={selectedValue === 'a'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="a"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        border: 1,
                        borderColor: selectedValue === 'b' ? theme.palette.primary.main : theme.palette.primary.primaryDGrey,
                        borderRadius: 1,
                    }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant={"cardHeading"} sx={{ mx: 1 }}
                                color={selectedValue === 'b' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                Weekly
                            </Typography>
                            <Radio
                                checked={selectedValue === 'b'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="b"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{
                        border: 1,
                        borderColor: selectedValue === 'c' ? theme.palette.primary.main : theme.palette.primary.primaryDGrey,
                        borderRadius: 1,
                    }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant={"cardHeading"} sx={{ mx: 1 }}
                                color={selectedValue === 'c' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                Monthly
                            </Typography>
                            <Radio
                                checked={selectedValue === 'c'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="c"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

            {/* Delivery Time ----------------------------------------------- */}

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

                <Grid item xs={8} md={10}>
                    <Typography variant={"cardHeading"}>Lunch - 9:00 am - 2:00 pm</Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography variant={"cardText"} color={theme.palette.primary.blackColor}>$154</Typography>
                        <Radio
                            sx={{ padding: 0, ml: 1 }}
                            checked={selectedValue === 'd'}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            value="d"
                            name="radio-buttons"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={8} md={10}>
                    <Typography variant={"cardHeading"}>Lunch - 9:00 am - 2:00 pm</Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography variant={"cardText"} color={theme.palette.primary.blackColor}>$154</Typography>
                        <Radio
                            sx={{ padding: 0, ml: 1 }}
                            checked={selectedValue === 'e'}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            value="e"
                            name="radio-buttons"
                        />
                    </Stack>
                </Grid>
            </Grid>

            {/* Add Extra ----------------------------------------------- */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={9} md={9}>
                    <Typography variant={"heading2"} fontSize={14} color={theme.palette.primary.blackColor}>Add Extra</Typography>
                    <Typography component={"p"} color={theme.palette.primary.greenColor} variant={"cardHeading"} >All selected extras comes in a single order</Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }} onClick={() => setShowOrder(!showOrder)}>
                        <Avatar alt="" src="/assets/images/circlearrow.svg" sx={{ height: 20, width: 20 }} />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                {showOrder && (<>
                    <Grid item xs={8} md={10}>
                        <Typography component={"p"} color={theme.palette.primary.primaryGray4} variant={"cardHeading"}>Roti</Typography>
                        <ButtonGroup
                            sx={{ height: 35, mt: 2, background: theme.palette.primary.lightGrey, borderRadius: 40 }}
                            size="small" aria-label="Small button group">
                            <Button
                                sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                                onClick={() => setCounter(counter - 1)}>-</Button>
                            <Button sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}>{counter}</Button>
                            <Button
                                sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                                onClick={() => setCounter(counter + 1)}>+</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant={"cardText"} color={theme.palette.primary.blackColor}>$120</Typography>
                            <Checkbox
                                sx={{ padding: 0, ml: 1 }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={8} md={10} sx={{ display: 'flex', alignItems: 'center', }}>
                        <Typography variant={"cardHeading"}>Sabzi</Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant={"cardText"} color={theme.palette.primary.blackColor}>$154</Typography>
                            <Checkbox
                                sx={{ padding: 0, ml: 1 }}
                            />
                        </Stack>
                    </Grid>

                </>)}
            </Grid>


            {/* Delivery Date ----------------------------------------------- */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
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
                    <CommonCalender />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark, }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography component={"p"} variant={"cardText"} color={theme.palette.primary.blackColor}>Customize Date</Typography>
                    <DatePicker fullWidth sx={{ pt: 2, width: "100%" }} />
                </Grid>
            </Grid>

        </>
    )
}
