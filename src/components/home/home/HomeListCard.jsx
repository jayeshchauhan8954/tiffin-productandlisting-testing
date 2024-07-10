// components/HomeList.js
'use client'
import { Box, Grid } from '@mui/material';
import { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import FoodCard2 from '@/components/Cards/FoodCard2';
import { _assets } from '@/utils/config/images';

const foods = [
  {
    name: 'Avsar Foods',
    imgSrc: _assets.images.homeList.bannerCard('punjabi.png'),
    availability: 'Lunch & Dinner',
    rating: 4.5
  },
  // Add more food items here
];

const HomeListCard = () => {
  const theme = useTheme();
  return (
      <Box sx={{ px: 10, pb: 5 }}>
        <Grid container spacing={2} sx={{ pt: 3 }}>
          {foods.map((food, index) => (
            <Grid item md={4} xs={12} key={index}>
              <FoodCard2 food={food} />
            </Grid>
          ))}
        </Grid>
      </Box>
  )
}

export default HomeListCard;
