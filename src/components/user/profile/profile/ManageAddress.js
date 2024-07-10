import { Box, Button, Container, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CustomDialog from '@/components/Common/CustomDialog';

export default function ManageAddress() {
    const theme = useTheme()

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Container >
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='boldtext' color={theme.palette.primary.primaryDmain}>Saved Addresses</Typography>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <TextField
                            sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1, my: 1 }}
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder='Save Address'
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

                    <Grid item xs={12} md={10} sx={{ mt: 3 }}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                                <Box>
                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Canada</Typography>
                                    <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> 1373a Bathurst Street </Typography>
                                </Box>
                            </Stack>
                            <Box component="img" src="/assets/images/delete.svg" onClick={handleOpenModal} />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                                <Box>
                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Canada</Typography>
                                    <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> 1373a Bathurst Street </Typography>
                                </Box>
                            </Stack>
                            <Box component="img" src="/assets/images/delete.svg" onClick={handleOpenModal} />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.divideGrey }} />
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"}>
                                <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                                <Box>
                                    <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Canada</Typography>
                                    <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> 1373a Bathurst Street </Typography>
                                </Box>
                            </Stack>
                            <Box component="img" src="/assets/images/delete.svg" onClick={handleOpenModal} />
                        </Stack>
                    </Grid>

                </Grid>
            </Container>


            {/* Delete Address ----------------------------- */}

            <CustomDialog
                open={openModal}
                onClose={handleCloseModal}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='heading2' color={theme.palette.primary.primaryDmain2} >Delete Address</Typography>
                    <Typography sx={{ mt: 3 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='cardHeading'>Are you sure you want to delete the address?</Typography>
                    <Typography sx={{ mt: 3 }} component={"p"} color={theme.palette.primary.primaryDmain2} variant='cardHeading'>Canada</Typography>

                    <Button fullWidth sx={{ height: 56, width: { xs: "100%", md: "60%" }, mt: 3 }} variant="contained">
                        <Typography sx={{ fontSize: 16, }} variant='heading2'>Delete Account</Typography>
                    </Button>
                    <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardHeading'>Cancel</Typography>
                </Box>

                {/* Profile Photo dialog ---------------------------------- */}

                {/* <Box sx={{ textAlign: 'center', px: 8, }}>
                    <Box component="img" src="/assets/icons/pic.svg" />
                    <Typography component={"p"} variant='heading2' color={theme.palette.primary.primaryDmain2}>Profile Photo</Typography>
                    <Typography sx={{ mt: 3 }} component={"p"} color={theme.palette.primary.lightGrey4} variant='cardHeading'>Your profile photo is visible to everyone across TiffinStash products.</Typography>
                    <Typography sx={{ mt: 3 }} component={"p"} color={theme.palette.primary.primaryDmain2} variant='cardHeading'>Canada</Typography>

                    <Button fullWidth sx={{ height: 56, width: { xs: "100%", md: "95%" }, mt: 3 }} variant="contained">
                        <Typography sx={{ fontSize: 16, }} variant='heading2'>Update Photo</Typography>
                    </Button>
                    <Typography sx={{ mb: 1, mt: 3 }} fontSize={16} component={"p"} color={theme.palette.primary.blackColor} variant='cardHeading'>Cancel</Typography>
                </Box> */}

            </CustomDialog>
        </>
    )
}
