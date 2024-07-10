import { Box, Button, Divider, Grid, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import CustomChip from '../Common/CustomChip'
import CommonCalender from '../Common/CommonCalender';
import CustomDialog from '../Common/CustomDialog';

export default function ModifyOrder() {
    const theme = useTheme()
    const [selectedValue, setSelectedValue] = useState('a');
    const [selectedChip, setSelectedChip] = useState("");
    const handleChipClick = (chip) => { setSelectedChip(chip) };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={8} md={8}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/img2.png" sx={{ height: 30, width: 30, }} />
                        <Stack sx={{ ml: 2 }}>
                            <Typography variant='heading2' fontSize={14} color={theme.palette.primary.blackColor}>Avsar Foods</Typography>
                            <Typography variant='cardHeading' color={theme.palette.primary.primaryGray4}>Basic • Trial</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={4} md={4} sx={{ textAlign: 'right' }}>
                    <CustomChip
                        label="PURE VEG"
                        borderRadius={40}
                        bgcolor={theme.palette.primary.lightGreen}
                        color={theme.palette.primary.greenColor}
                        sx={{ fontSize: 14, border: "2px solid green" }}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction="row" alignItems={"center"} spacing={2} sx={{ justifyContent: { xs: 'flex-start', sm: 'center' } }}>
                            <CustomChip
                                label={"Pause"}
                                borderRadius={40}
                                bgcolor={selectedChip === 0 ? theme.palette.primary.main : theme.palette.primary.lightGrey3}
                                color={selectedChip === 0 ? theme.palette.primary.contrastText : theme.palette.primary.primaryDmain2}
                                sx={{ fontSize: 14, padding: 20, width: "30%", cursor: 'pointer' }}
                                onClick={() => handleChipClick(0)}
                            />
                             <CustomChip
                                label={"Skip"}
                                borderRadius={40}
                                bgcolor={selectedChip === 1 ? theme.palette.primary.main : theme.palette.primary.lightGrey3}
                                color={selectedChip === 1 ? theme.palette.primary.contrastText : theme.palette.primary.primaryDmain2}
                                sx={{ fontSize: 14, padding: 20, width: "30%", cursor: 'pointer' }}
                                onClick={() => handleChipClick(1)}
                            />
                             <CustomChip
                                label={"Switch"}
                                borderRadius={40}
                                bgcolor={selectedChip === 2 ? theme.palette.primary.main : theme.palette.primary.lightGrey3}
                                color={selectedChip === 2 ? theme.palette.primary.contrastText : theme.palette.primary.primaryDmain2}
                                sx={{ fontSize: 14, padding: 20, width: "30%", cursor: 'pointer' }}
                                onClick={() => handleChipClick(2)}
                            />
                        
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/info-circle.svg" sx={{ height: 15, width: 15, mr: 1 }} />
                        <Typography variant='cardHeading' color={theme.palette.primary.greenColor}>Subscription resumes until further notice. You can manually resume your subscription by clicking on the resume button.</Typography>
                    </Stack>
                </Grid>
            </Grid>

            {/* Part 2 -------------------- */}

            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box sx={{ backgroundColor: "black", padding: 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, }}>
                            <Box component="img" src="/assets/images/info-circle.svg" sx={{ height: 15, width: 15, }} />
                        </Box>
                        <Box sx={{ backgroundColor: theme.palette.primary.greenColor, padding: 2, width: "100%", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                            <Typography variant='small1' color={theme.palette.primary.contrastText}>Start date can't be changed after Thursday, April 6th, 2024 9:00 PM EST</Typography>
                        </Box>
                    </Stack>
                </Grid>

                <Grid item xs={9} md={9}>
                    <Stack direction={"row"}>
                        <Box component="img" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Stack>
                            <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Start Date</Typography>
                            <Typography variant='cardText' color={theme.palette.primary.blackColor}>Friday, April 7th, 2024</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={3} md={3} sx={{ textAlign: 'right' }}>
                    <CustomChip
                        label="Edit"
                        borderRadius={20}
                        bgcolor={theme.palette.primary.lightGrey3}
                        color={theme.palette.primary.blackColor}
                        sx={{ fontSize: 12, }}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/clock.svg" sx={{ height: 22, width: 22, mr: 1 }} />
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Delivery Time</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{
                        border: 1,
                        p: 1,
                        borderColor: selectedValue === 'a' ? theme.palette.primary.main : theme.palette.primary.primaryDGrey,
                        borderRadius: 1,
                        mb: 1
                    }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant={"cardHeading"} sx={{ mx: 1 }}
                                    color={selectedValue === 'a' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                    Lunch
                                </Typography>
                                <Typography component={"p"} variant={"cardHeading"} sx={{ mx: 1 }}
                                    color={selectedValue === 'a' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                    9:00 am - 2:00 pm
                                </Typography>
                            </Box>
                            <Radio
                                checked={selectedValue === 'a'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="a"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        border: 1,
                        p: 1,
                        borderColor: selectedValue === 'a' ? theme.palette.primary.main : theme.palette.primary.primaryDGrey,
                        borderRadius: 1,
                    }}>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant={"cardHeading"} sx={{ mx: 1 }}
                                    color={selectedValue === 'b' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                    Dinner
                                </Typography>
                                <Typography component={"p"} variant={"cardHeading"} sx={{ mx: 1 }}
                                    color={selectedValue === 'b' ? theme.palette.primary.blackColor : theme.palette.primary.gray2}>
                                    9:00 am - 2:00 pm
                                </Typography>
                            </Box>
                            <Radio
                                checked={selectedValue === 'b'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="b"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/calendar-2.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='small1' color={theme.palette.primary.primaryGray4}>Delivery Days</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12} sx={{ mb: 2 }}>
                    <CommonCalender />
                </Grid>
            </Grid>

            {/* Part 3 -------------------- */}

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={9} md={9}>
                    <Stack direction={"row"}>
                        <Box component="img" src="/assets/images/call.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Stack>
                            <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Contact Number</Typography>
                            <Typography variant='cardText' color={theme.palette.primary.blackColor}>+1 (416) 555-1212</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                
                <Grid item xs={3} md={3} sx={{ textAlign: 'right' }}>
                    <CustomChip
                        label="Edit"
                        borderRadius={20}
                        bgcolor={theme.palette.primary.lightGrey3}
                        color={theme.palette.primary.blackColor}
                        sx={{ fontSize: 12, }}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={8}>
                    <Stack direction={"row"}>
                        <Box component="img" src="/assets/images/locationgrey.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Stack>
                            <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Address</Typography>
                            <Typography variant='cardText' color={theme.palette.primary.blackColor}>1373a Bathurst Street Toronto, M5R 3H8</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <CustomChip
                        label="Edit"
                        borderRadius={20}
                        bgcolor={theme.palette.primary.lightGrey3}
                        color={theme.palette.primary.blackColor}
                        sx={{ fontSize: 12, }}
                    />
                </Grid>
            </Grid>

            {/* Part 4 ----------------- */}

            <Grid container sx={{ my: 3, alignItems: 'center' }}>
                <Grid item xs={10} md={10}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/shop1.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Seller Note</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2} md={2} sx={{ textAlign: 'right', }}>
                    <CustomChip
                        label="Edit"
                        borderRadius={20}
                        bgcolor={theme.palette.primary.lightGrey3}
                        color={theme.palette.primary.blackColor}
                        sx={{ fontSize: 12, }}
                    />
                </Grid>
                <Grid item xs={12} sx={{ my: 2 }}>
                    <TextField
                        sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, }}
                        multiline
                        variant="outlined"
                        fullWidth
                        placeholder='Please make the food less spicy and less oily. Avoid eggplants.'
                    />
                </Grid>
            </Grid>

            {/* Part 5 ----------------- */}

            <Grid container sx={{ alignItems: 'center', }}>
                <Grid item xs={10} md={10}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Box component="img" src="/assets/images/greyscooter.svg" sx={{ height: 20, width: 20, mr: 1 }} />
                        <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}>Delivery Note</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2} md={2} sx={{ textAlign: 'right' }}>
                    <CustomChip
                        label="Edit"
                        borderRadius={20}
                        bgcolor={theme.palette.primary.lightGrey3}
                        color={theme.palette.primary.blackColor}
                        sx={{ fontSize: 12, }}
                    />
                </Grid>
                <Grid item xs={12} sx={{ my: 2 }}>
                    <TextField
                        sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, }}
                        multiline
                        variant="outlined"
                        fullWidth
                        placeholder=' Please call me 5 minutes before you arrive.'
                    />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Button
                            sx={{
                                height: 56, mt: 4, width: "50%",
                                boxShadow: 0, backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    boxShadow: 0,
                                    backgroundColor: theme.palette.primary.contrastText,
                                }
                            }}
                            onClick={handleOpenModal}
                            variant="contained">
                            Cancel
                        </Button>
                        <Button
                            sx={{ height: 56, mt: 4, width: "50%", }}
                            variant="contained">
                            Update
                        </Button>
                    </Stack>
                </Grid>
            </Grid>


            <CustomDialog
                maxWidth="md"
                open={openModal}
                showBackButton={true}
                heading={"Select Switch"}
                showBorderBottom={true}
                onClose={handleCloseModal}>

                {/* Switch Seller -------------- */}


                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                            sx={{
                                border: 1,
                                backgroundColor: selectedValue === 'b' ? theme.palette.primary.lighterPink : theme.palette.primary.contrastText,
                                borderColor: selectedValue === 'b' ? theme.palette.primary.main : theme.palette.primary.primaryGray6,
                                borderRadius: 1, p: 2
                            }}>
                            <Box>
                                <Typography color={theme.palette.primary.blackColor} variant='semiBoldText'>Switch Seller</Typography>
                                <Box display={"flex"} alignItems={"center"} sx={{ mt: 2 }}>
                                    <Box component={"img"} src='/assets/images/shop1.svg' sx={{ mr: 1, }} />
                                    <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}> Current Seller : Avsar Foods</Typography>
                                </Box>
                            </Box>
                            <Radio
                                checked={selectedValue === 'b'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="b"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                            sx={{
                                border: 1,
                                backgroundColor: selectedValue === 'c' ? theme.palette.primary.lighterPink : theme.palette.primary.contrastText,
                                borderColor: selectedValue === 'c' ? theme.palette.primary.main : theme.palette.primary.primaryGray6,
                                borderRadius: 1, p: 2
                            }}>
                            <Box>
                                <Typography color={theme.palette.primary.blackColor} variant='semiBoldText'>Switch Tiffin Plan</Typography>
                                <Box display={"flex"} alignItems={"center"} sx={{ mt: 2 }}>
                                    <Box component={"img"} src='/assets/images/reserve.svg' sx={{ mr: 1, }} />
                                    <Typography variant='cardHeading' color={theme.palette.primary.primaryGrey90}> Current Plan : Basic</Typography>
                                </Box>
                            </Box>
                            <Radio
                                checked={selectedValue === 'c'}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                value="c"
                                name="radio-buttons"
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
                            <Button
                                sx={{
                                    height: 56, mt: 4, width: "50%",
                                    boxShadow: 0, backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        boxShadow: 0,
                                        backgroundColor: theme.palette.primary.contrastText,
                                    }
                                }}
                                onClick={handleOpenModal}
                                variant="contained">
                                Cancel
                            </Button>
                            <Button
                                sx={{ height: 56, mt: 4, width: "50%", }}
                                variant="contained">
                                Switch
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>



            </CustomDialog>





        </>
    )
}
