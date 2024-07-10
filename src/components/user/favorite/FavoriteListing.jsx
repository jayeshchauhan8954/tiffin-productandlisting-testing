import LoadMore from '@/components/Common/LoadMore';
import NoData from '@/components/Common/NoData';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { _routes } from '@/utils/endPoints/routes';
import { getS3Url } from '@/utils/helpers/fileHelper';
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function FavoriteListing() {
    const theme = useTheme();
    const router = useRouter()

    // States
    const [product, setProduct] = useState({ rows: [], count: 0 })
    const [pagination, setPagination] = useState({ page: 1, limit: 15 })

    useEffect(() => { // call api on page change
        fetchProduct();
    }, [pagination])

    const fetchProduct = async () => {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.user.favorite,
            method: 'GET',
            query: { ...pagination }
        })
        if (status) {
            setProduct({
                ...product,
                rows: pagination.page === 1 ? data?.rows : product?.rows?.concat(data?.rows),
                ...(pagination.page === 1 && { count: data?.count })
            })
        } else {
            setProduct({ rows: [], count: 0 })
        }
    }

    const handleFavUnFav = async (item, index) => {
        const { status } = await apiRequest({
            method: "POST",
            endUrl: _apiUrls.user.favorite,
            body: {
                productId: item._id
            }
        })
        if (status) {
            let tmp = [...product.rows]
            tmp[index].isFavorite = !item?.isFavorite
            setProduct({ ...product, rows: tmp })
        }
    }

    // Chip Colors
    const productColor = {
        "Veg": theme.palette.primary.greenColor,
        "Non-veg": theme.palette.primary.main,
        "Egg": theme.palette.primary.yellowColor,
        "Combo": theme.palette.primary.lightYellow2,
    };

    const handleNavigation = (productId) => () => router.push(_routes.user.productDetails(productId))

    return (
        <Container sx={{my:5}}>
            <Grid container>
                <Grid item xs={12} md={12} mb={5}>
                    <Typography variant='heading2' fontSize={24}>Favorite Tiffins</Typography>
                </Grid>


                <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                        {/* Listing */}
                        {
                            product?.rows.map((item, index) => (
                                <Grid key={`product_${index}`} item xs={12} md={4}>
                                    <Card>
                                        <Box sx={{ position: 'relative' }}>
                                            <CardActionArea onClick={handleNavigation(item?._id)}>
                                                <CardMedia
                                                    component="img"
                                                    height="180"
                                                    alt={item?.name}
                                                    src={getS3Url(item.thumbNail)}
                                                />
                                            </CardActionArea>
                                            <IconButton
                                                sx={{ height: 20, position: 'absolute', right: 20, top: 20, width: 20 }}
                                                onClick={() => handleFavUnFav(item, index)}>
                                                <Box
                                                    component={"img"}
                                                    src={item?.isFavorite ? "/assets/images/redHeart.svg" : "/assets/images/whiteheart.svg"}
                                                />
                                            </IconButton>
                                            <Box component={"div"} sx={{
                                                ...useStyles.vegBox,
                                                backgroundColor: productColor[item?.dietaryId?.name]

                                            }}>
                                                <Typography variant='heading2' fontSize={12} color={theme.palette.primary.contrastText}>{item?.dietaryId?.name}</Typography>
                                            </Box>
                                        </Box>
                                        <CardContent>
                                            <Typography gutterBottom color={theme.palette.primary.blackColor} variant='heading3' component="div">
                                                {item?.name}
                                            </Typography>
                                            <Grid container>
                                                <Grid xs={8} md={8}>
                                                    <Stack direction={"row"} spacing={1} sx={{ alignItems: 'center' }}>
                                                        <Box component={"img"} src="/assets/images/daytiffin.svg" sx={{ height: 20, width: 20 }} />
                                                        <Typography color={theme.palette.primary.blackColor} variant='cardHeading'>{item?.deliveryTimeIds?.map(item => item?.name)?.join(" & ")}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={4} md={4}>
                                                    <Stack direction={"row"} spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        <Box component={"img"} src="/assets/images/star.svg" sx={{ height: 20, width: 20 }} />
                                                        <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>{parseFloat(item?.avgRating || 0).toFixed(1)} ({item?.ratingCount || 0})</Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }

                        {/* Pagination */}
                        <Grid item md={12} xs={12}>
                            <LoadMore
                                count={product.count}
                                page={pagination.page}
                                limit={pagination.limit}
                                onLoad={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))} />
                        </Grid>

                        <Grid item md={12} sx={12}>
                            {product?.rows?.length === 0 && <NoData
                                svgImage={"/assets/images/emptyfood.svg"}
                                text={"No tiffin found."}
                            />}
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const useStyles = {
    vegBox: {
        height: 34,
        width: 100,
        display: 'flex',
        borderTopRightRadius: 8,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

