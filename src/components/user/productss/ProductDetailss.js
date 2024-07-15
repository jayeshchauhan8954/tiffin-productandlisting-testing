import { Box, Container, Divider, IconButton, Popover, Stack, Typography, useTheme, } from '@mui/material'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import CustomChip from '../Common/CustomChip';
import FoodCard from '../Cards/FoodCard';
import SubscriptionCard from '../Cards/SubscriptionCard';
import { fontName } from '@/utils/fonts/Font';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

export default function ProductDetail2() {
    const theme = useTheme();

    const [selectedChip, setSelectedChip] = useState(0);
    const handleChipClick = (chipIndex) => { setSelectedChip(chipIndex) };

    const items = ["All", "Non Veg", "Veg", "Combo", "Only Rotis", "Only Curries", "Snacks",];
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <>

            <Header />
            <Container>
                <Grid container spacing={2} sx={{ pt: 5 }}>
                    <Grid item md={12} xs={12}>
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src="/assets/images/bgimg.png"
                                sx={{
                                    width: '100%',
                                }}
                            />
                            <Box sx={{ position: 'absolute', top: 15, right: 28, display: 'flex', gap: 2, }}>
                                <IconButton aria-label="favorite" sx={{
                                    color: theme.palette.primary.blackColor,
                                    height: 40, width: 40,
                                    backgroundColor: theme.palette.primary.contrastText,
                                }}>
                                    <Box component={"img"} src="/assets/icons/heart.svg" sx={{ height: 20, }} />
                                </IconButton>
                                <IconButton aria-label="download" sx={{
                                    color: theme.palette.primary.blackColor,
                                    height: 40, width: 40,
                                    backgroundColor: theme.palette.primary.contrastText,
                                }}>
                                    <Box component={"img"} src="/assets/icons/export.svg" sx={{ height: 20, }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box sx={{ width: "60%" }}>
                                <Typography variant={"heading1"}>Avsar Foods</Typography>
                                <Typography component={"p"} variant={"cardHeading"} color={theme.palette.primary.primaryGrey90}>Pure Veg • Gujarati • Jain • Swaminarayan</Typography>
                            </Box>
                            <Stack direction="row" alignItems={"center"} >
                                <CustomChip image={"/assets/icons/whitestar.svg"} label={"4.0"} sx={{ height: 25, fontFamily: fontName.PoppinsMedium }} />
                                <Typography variant={"cardHeading"} sx={{ ml: 1 }} >1.6K reviews</Typography>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <SubscriptionCard />
                    </Grid>
                </Grid>
            </Container>

            <Divider sx={{ borderColor: theme.palette.primary.primaryEdark, mt: 4 }} />

            {/* ----------------------  */}

            <Container>
                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item md={2} xs={12}>
                        <Box sx={{ p: 2, my: 2, backgroundColor: theme.palette.primary.lightGrey }}>
                            <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                                <Typography variant='heading3' color={theme.palette.primary.blackColor}>lunch</Typography>
                                <Box onClick={handleClick} component="img" src="/assets/images/down.svg" sx={{ height: 20, width: 20 }} />
                            </Stack>
                            <Typography component={"p"} variant='cardHeading'>9:00 am - 2:00 pm</Typography>
                        </Box>

                        {items.map((item, index) => (
                            <>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderLeft: selectedCategory === item ? 5 : 0,
                                        borderColor: selectedCategory === item ? theme.palette.primary.main : "transparent",
                                        backgroundColor: selectedCategory === item ? theme.palette.primary.lightPink : theme.palette.primary.contrastText,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: selectedCategory === item ? theme.palette.primary.lightPink : theme.palette.primary.contrastText,
                                        },
                                    }}
                                    onClick={() => setSelectedCategory(item)}
                                >
                                    <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant='heading3'>{item}</Typography>
                                </Box>
                            </>
                        ))}
                    </Grid>

                    <Divider orientation="vertical" flexItem sx={{}} />

                    <Grid item md={9} xs={12} sx={{ width: '100%', mb: 5 }}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" >
                            <Box className="customBox" sx={{ backgroundColor: theme.palette.primary.lightGrey, mt: 3 }}>
                                <CustomChip
                                    label="Trial"
                                    bgcolor={selectedChip === 0 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selectedChip === 0 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handleChipClick(0)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                                <CustomChip
                                    label="Weekly"
                                    bgcolor={selectedChip === 1 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selectedChip === 1 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handleChipClick(1)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                                <CustomChip
                                    label="Monthly"
                                    bgcolor={selectedChip === 2 ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={selectedChip === 2 ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={() => handleChipClick(2)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                            </Box>
                        </Grid>

                        <Grid container spacing={{ xs: 0, md: 5, }}>
                            {selectedCategory === "All" && (
                                <>
                                    <Grid item md={6} xs={12}>
                                        <FoodCard />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <FoodCard />
                                    </Grid>
                                </>
                            )}
                            {selectedCategory === "Non Veg" && (
                                <Grid item md={12} xs={12}>
                                    <Typography>Non Veg Content</Typography>
                                </Grid>
                            )}
                            {selectedCategory === "Veg" && (
                                <Grid item md={12} xs={12}>
                                    <Typography>Veg Content</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Popover
                    id="simple-popover"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                    sx={{
                        '& .MuiPopover-paper': {
                            marginTop: 5,
                            marginLeft: -7.5,
                            width: "30%",
                            '@media (max-width: 600px)': {
                                width: '100%',
                                marginLeft: 0
                            }
                        }
                    }}
                >
                    <Box sx={{ p: 2, backgroundColor: theme.palette.primary.lightGrey }}>
                        <Typography variant='heading3' color={theme.palette.primary.blackColor}>lunch</Typography>
                        <Typography component={"p"} variant='cardHeading'>9:00 am - 2:00 pm</Typography>
                    </Box>
                    <Box sx={{ p: 2, backgroundColor: theme.palette.primary.contrastText }}>
                        <Typography variant='heading3' color={theme.palette.primary.blackColor}>Dinner</Typography>
                        <Typography component={"p"} variant='cardHeading'>9:00 am - 2:00 pm</Typography>
                    </Box>
                </Popover>

            </Container>

            <Footer />
        </>
    )
}
 