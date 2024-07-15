import React, { useEffect, useState } from 'react';
import { Box, CardActionArea, Grid, Stack, useTheme, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { useSelector } from 'react-redux';
import { getCityId } from '@/redux/selectors/locationSelectors';
import { getS3Url } from '@/utils/helpers/fileHelper';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';


export default function RecommandedCardd() {
    const theme = useTheme();
    const router = useRouter()

    // States
    const [index, setIndex] = useState(0);
    // const items = [
    //     {id:1,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:2,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:3,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:4,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:5,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:6,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:7,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    //     {id:8,rating:4.5,name:"punjabi",title:"fcgvhgjhkljhjb"},
    // ];

    const [recommended, setRecommended] = useState([])

    // Redux
    const cityId = useSelector(getCityId)

    useEffect(() => {
        fetchProduct();
    }, [cityId])

    const fetchProduct = async () => {
        const{data,status}=await apiRequest({
           endUrl:_apiUrls.user.recommendedProducts,
            method:"GET"
            
        })
        if(status){
     setRecommended(data)
        }
    }

    // Helpers
    const handlePrev = () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : Math.floor(items.length / 4) - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev < Math.floor(items.length / 4) - 1 ? prev + 1 : 0));
    };

    // const handleNavigation = (productId) => () => router.push(_routes.user.productDetails(productId))
      const handleFavUnFav=async()=>{
        const{data,status}=apiRequest({
          endUrl:_apiUrls.user.favorite,
          method:"POST"  
        })
        if(status){
          
        }
      }
    return (
        <>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} sx={{ overflow: 'hidden', width: '100%' }}>
                    <Box sx={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${index * 100}%)` }}>
                    {recommended.map((item, i) => (
                                <Grid item xs={12} md={3.5} key={i}  sx={{ flex: '0 0 25%' }}>
                                    <Card sx={{ margin: 1, my: 2 }}>

                                        <Box sx={{ position: 'relative' }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                   src={getS3Url(item.thumbNail)}
                                                    alt="green iguana"
                                                />
                                            </CardActionArea>
                                            <IconButton
                                                sx={{ height: 20, position: 'absolute', right: 20, top: 20, width: 20 }}
                                                onClick={() => handleFavUnFav()}>
                                                <Box
                                                    component={"img"}
                                                    src={ "/assets/images/whiteheart.svg"}
                                                />
                                            </IconButton>
                                        </Box>
                                        <CardContent>
                                            <Typography gutterBottom color={theme.palette.primary.blackColor} variant='heading3' component="div">
                                              {item?.name}
                                            </Typography>
                                            <Grid container>
                                                <Grid item xs={8} md={8}>
                                                    <Stack direction={"row"} spacing={1} sx={{ alignItems: 'center' }}>
                                                        <Box component={"img"} src="/assets/images/daytiffin.svg" sx={{ height: 20, width: 20 }} />
                                                        <Typography color={theme.palette.primary.blackColor} variant='cardHeading'>{item.deliveryTimeIds.map(time=>time.name).join(", ")}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={4} md={4}>
                                                    <Stack direction={"row"} spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        <Box component={"img"} src="/assets/images/star.svg" sx={{ height: 20, width: 20 }} />
                                                        <Typography color={theme.palette.primary.primaryDmain} variant='cardText'>{parseFloat(item?.avgRating||0).toFixed(1)}({item?.ratingCount||0})</Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>

                                    </Card>
                                </Grid>
                         
                    ))}
                         </Box>
                </Grid>

                <Stack direction={"row"} alignItems={"center"} sx={{ position: 'absolute', right: 0, top: -67, }}>
                    <IconButton
                        onClick={handlePrev}
                        sx={{ ...useStyles.nextPrevIcons, backgroundColor: theme.palette.primary.contrastText, }}
                    >
                        <WestIcon sx={{ height: 20, }} />
                    </IconButton>
                    <IconButton
                        onClick={handleNext}
                        sx={{ ...useStyles.nextPrevIcons, backgroundColor: theme.palette.primary.contrastText, }}
                    >
                        <EastIcon sx={{ height: 20, }} />
                    </IconButton>

                </Stack>
            </Box>
        </>
    )
}

const useStyles = {
    nextPrevIcons: {
        height: 45,
        width: 45,
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
}