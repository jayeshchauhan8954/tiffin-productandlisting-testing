"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, IconButton, InputAdornment, List, ListItem, ListItemButton, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
import CustomDialog from '../Common/CustomDialog'
import SearchIcon from '@mui/icons-material/Search';
import { GC_MAP_KEY } from '@/utils/config/config';

// Google 
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Scrollbar from '../Scrollbar';
import { fetchAddressFromLatLng, getCoordinatesByPlaceId } from '@/utils/helpers/locationHelpers';
import { useDispatch } from 'react-redux';
import { updateLocation } from '@/redux/slicers/location';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';

export default function AddressModal() {
    const theme = useTheme()

    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [showPredictions, setShowPredictions] = useState(false)

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // AutoComplete
    const { placePredictions, getPlacePredictions } = usePlacesService({ apiKey: GC_MAP_KEY });

    const handleValueChange = (e) => {
        setShowPredictions(true)
        setSearchText(e.target.value)
        getPlacePredictions({ input: e.target.value })
    }

    const handleSelect = (item) => {
        setShowPredictions(false)
        setSearchText(item?.description)

        // Fetch lat,lng from from placeID selection
        getCoordinatesByPlaceId(item?.place_id)
            .then(async (res) => {

                let fetchAddress = await fetchAddressFromLatLng(res.lat, res.lng)

                // Get City Id from location 
                let { data, status } = await apiRequest({
                    endUrl: _apiUrls.masters.cities,
                    query: { searchQ: fetchAddress.city }
                })
                if (status) {
                    fetchAddress.cityId = data?.rows[0]?._id || null
                }
                dispatch(updateLocation({ latitude: res.lat, longitude: res.lng, ...fetchAddress }))
            })
    }

    return (
        <>
            <Box sx={{ position: 'relative', zIndex: 1000 }}>
                <TextField
                    sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1, my: 1 }}
                    multiline
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={handleValueChange}
                    placeholder='Search for an address'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchText && (
                                    <IconButton onClick={() => setSearchText("")} edge="end">
                                        <Typography variant='cardHeading' color={theme.palette.primary.primaryDmain}>Clear</Typography>
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                {/* Prediction */}
                {
                    placePredictions?.length > 0 && showPredictions &&
                    <Box sx={{
                        boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
                        zIndex: 200000,
                        borderRadius: 1,
                    }}>
                        <Scrollbar sx={{ maxHeight: 300 }}>
                            <List>
                                {
                                    placePredictions.map((item, i) =>
                                        <ListItemButton key={`place_${i}`} onClick={() => handleSelect(item)}>
                                            <Typography variant='cardHeading' >{item?.description}</Typography>
                                        </ListItemButton>)
                                }
                            </List>
                        </Scrollbar>
                    </Box>
                }
            </Box>
            {/* <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography>Recent addresses</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ mb: 2 }}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Canada</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> 1373a Bathurst Street </Typography>
                            </Box>
                        </Stack>
                        <Box component="img" src="/assets/images/edit.svg" sx={{ height: 20 }} onClick={handleOpenModal} />
                    </Box>

                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component="img" src="/assets/icons/location.svg" sx={{ mr: 1 }} />
                            <Box>
                                <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>Canada</Typography>
                                <Typography component={"p"} color={theme.palette.primary.primaryDGrey60} variant='cardHeading'> 1373a Bathurst Street </Typography>
                            </Box>
                        </Stack>
                        <Box component="img" src="/assets/images/edit.svg" sx={{ height: 20 }} onClick={handleOpenModal} />
                    </Box>
                </Grid>
            </Grid> */}


            {/* Edit Address Modal ----------------------------- */}

            <CustomDialog
                maxWidth="md"
                heading={"Edit address"}
                showBorderBottom={true}
                open={openModal}
                onClose={handleCloseModal}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Box component={"img"} src="/assets/icons/map.svg" sx={{ width: "100%" }} />
                        <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.blackColor}>1373a Bathurst Street</Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography variant='heading3' color={theme.palette.primary.blackColor}>Building type</Typography>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            sx={{
                                ...useStyles.selectFeild,
                                backgroundColor: theme.palette.primary.primaryGray5,
                                pl: 1,
                            }}
                        >
                            <MenuItem>Others</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant='heading3' color={theme.palette.primary.blackColor}>Apt / Suite / Floor</Typography>
                        <TextField
                            sx={{ backgroundColor: theme.palette.primary.primaryGray5, borderRadius: 1, my: 1 }}
                            multiline
                            variant="outlined"
                            fullWidth
                            placeholder='e.g 3421'
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"flex-end"}>
                            <Button
                                sx={{ height: 56, my: 2, width: "40%", boxShadow: 0, backgroundColor: theme.palette.primary.contrastText, color: theme.palette.primary.main, }}
                                variant="contained">
                                Back
                            </Button>
                            <Button
                                sx={{ height: 56, my: 2, width: "40%", }}
                                variant="contained">
                                Save
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

            </CustomDialog>
        </>
    )
}


const useStyles = {
    selectFeild: {
        borderRadius: 1,
        marginTop: "10px",
    },

}
