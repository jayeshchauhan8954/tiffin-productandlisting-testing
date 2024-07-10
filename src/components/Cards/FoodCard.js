import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CustomDialog from '../Common/CustomDialog';
import { Avatar, Button, ButtonGroup, Divider, Grid, Stack, TextField, } from '@mui/material';
import OrderDetailCard from './OrderDetailCard';
import CustomModal from '../Common/CustomModal';
import AddToCart from './AddToCart';
import CounterButton from '../Common/CounterButton';
import CustomChip from '../Common/CustomChip';
import { getProductSellingPrice } from '@/utils/helpers/pricing';
import { getS3Url } from '@/utils/helpers/appHelpers';

export default function FoodCard({ itemInfo = {}, mealPlan, processingFee, deliveryCharges, onView = (data, domTarget) => { } }) {
    const theme = useTheme();

    
    // Helpers
    const getPrice = useMemo(() => {
        let item = itemInfo?.mealPlans?.find(item => item?._id?.name === mealPlan)
        return getProductSellingPrice(item?.rate, item?.targetMargin, deliveryCharges, processingFee)
    }, [mealPlan,deliveryCharges,processingFee])


    const [openModal, setOpenModal] = useState(false);
    const [addCart, setAddCart] = useState(false)

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const addToCart = () => {
        handleCloseModal()
        setAddCart(true)
    }



    // Radio ------------------------------
    const [counter, setCounter] = useState(0);


    return (

        <>
            <Card sx={{ display: 'flex', mt: 4, justifyContent: 'space-between', position: 'relative', border: 1, borderColor: theme.palette.primary.lightGrey, height: '100%',maxHeight:140 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', }}>
                        <Typography component="div" variant="heading3" color={theme.palette.primary.blackColor}>
                            {itemInfo?.mealTypeId?.name}
                        </Typography>
                        <Typography variant="cardHeading" color={theme.palette.text.secondary} component="div">
                            {itemInfo?.items?.map(elem => `${elem?.name} (${elem?.qty} ${elem?.uom})`).join(" , ")}
                        </Typography>
                    </CardContent>
                    <Box sx={{ pl: 2, pb: 1 }}>
                        <Typography variant="subtitle1" color={theme.palette.primary.blackColor} component="div">
                            ${getPrice}
                        </Typography>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151}}
                    src={getS3Url(itemInfo?.media)}
                    alt="Live"
                />
                <IconButton
                    onClick={(e) => onView(itemInfo, e.currentTarget)} sx={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.contrastText,
                        color: theme.palette.primary.main,
                        width: 40,
                        height: 40,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.contrastText,
                        },
                    }}
                >
                    +
                </IconButton>
            </Card>


            {/*Modal 1 Basic---------- */}

            <CustomDialog
                maxWidth="md"
                open={openModal}
                onClose={handleCloseModal}
                // dialogContentProps={{ sx: { padding: 0 } }}
                actions={
                    <>
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} md={4}>
                                <ButtonGroup
                                    sx={{ height: 56, width: "100%", justifyContent: 'space-between', border: 1, borderColor: theme.palette.primary.main, background: theme.palette.primary.contrastText, borderRadius: 1 }}
                                >
                                    <Button
                                        sx={{ border: 0, color: theme.palette.primary.main, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                                        onClick={() => setCounter(counter - 1)}>
                                        <Typography sx={{ fontSize: 16, }} variant='heading3'>-</Typography>
                                    </Button>
                                    <Button sx={{ border: 0, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}>
                                        <Typography sx={{ fontSize: 16, }} variant='heading3'>{counter}</Typography></Button>
                                    <Button
                                        sx={{ border: 0, color: theme.palette.primary.main, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                                        onClick={() => setCounter(counter + 1)}>
                                        <Typography sx={{ fontSize: 16, }} variant='heading3'>+</Typography>
                                    </Button>
                                </ButtonGroup>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Button onClick={() => addToCart()} sx={{ height: 56, width: "100%", }} variant="contained">
                                    <Typography sx={{ fontSize: 16, }} variant='heading2'>Add $245</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                }
            >
                <OrderDetailCard />

            </CustomDialog>

            {/*Modal 2 Cart Basic---------- */}

            <CustomModal
                open={addCart}
                onClose={() => setAddCart(false)}
                title="Cart"
                // showCloseIcon={<Box component="img" src="/assets/images/arrow-right.svg" />}
                width={45}
                maxHeight={115}
            >
                <AddToCart />

            </CustomModal>

        </>
    );
}
