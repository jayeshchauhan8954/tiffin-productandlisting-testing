import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Box, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const images = [
  { name: "Image 1", description: "Description 1", src: '/assets/images/dish.svg' },
  { name: "Image 2", description: "Description 2", src: '/assets/images/dish.svg' },
  { name: "Image 3", description: "Description 3", src: '/assets/images/dish.svg' },
  { name: "Image 4", description: "Description 4", src: '/assets/images/dish.svg' },
  { name: "Image 5", description: "Description 5", src: '/assets/images/dish.svg' },
  { name: "Image 6", description: "Description 6", src: '/assets/images/dish.svg' },
];

function ImageSlider() {
  return (
    <Box width="100%" margin="auto" position="relative">
      <Carousel
        navButtonsAlwaysVisible={true}
        NextIcon={<ArrowForwardIos />}
        PrevIcon={<ArrowBackIos />}
        animation="slide"
        indicators={false}
        autoPlay={false}
        swipe={true}
      >
        {getChunks(images, 3).map((chunk, i) => (
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
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {props.items.map((item, index) => (
        <Grid item key={index}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Box component="img" src={item.src} alt={item.name} sx={{ width: '200px', height: 'auto' }} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Button variant="contained" color="primary">
              Check it out!
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageSlider;
