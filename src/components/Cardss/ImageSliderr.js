import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Grid, useTheme, } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { getS3Url } from '@/utils/helpers/appHelpers';

function ImageSliderr() {
    const theme = useTheme()
    //  const images=[
    //     { src: '/assets/images/Offer.svg' },
    // { src: '/assets/images/Offer2.svg' },
    // { src: '/assets/images/Offer.svg' },
    // { src: '/assets/images/Offer2.svg' },
    // { src: '/assets/images/Offer.svg' },
    // { src: '/assets/images/Offer2.svg' },
    //  ]

     
    const [event, setEvents] = useState([])

    useEffect(() => {
        fetchEvents();
    }, [])

    const fetchEvents = async () => {
      const{data,status}= await apiRequest({
        endUrl:_apiUrls.user.getEvents,
        method:"GET"
      }) 
      if(status){
        setEvents(data?.rows)
      }
    }


    return (
        <Box width="100%" margin="auto" >
            <Carousel
                sx={{ height: "100%" }}
                navButtonsAlwaysVisible={true}
                NextIcon={<EastIcon />}
                PrevIcon={<KeyboardBackspaceIcon />}
                animation="slide"
                indicators={false}
                autoPlay={false}
                swipe={true}
                navButtonsProps={{
                    style: {
                        marginTop: -10,
                        marginLeft: 40,
                        marginRight: 40,
                        backgroundColor: theme.palette.primary.primaryGray5,
                        color: theme.palette.primary.blackColor,
                    }
                }}
            >
                {getChunks(event, 3).map((chunk, i) => (
                    <Item key={i} items={chunk} />
                ))}
            </Carousel>
        </Box>
    );
}

function getChunks(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function Item(props) {
    return (

        <>
            <Grid container sx={{ px: 5,}}>
                {props.items.map((item, index) => (
                    <Grid item xs={12} key={index} md={4}>
                        <Box component="img" src={getS3Url(item.thumbNail)} alt={item.name} sx={{ width: '100%', height: 200, px: 3 }} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default ImageSliderr;

