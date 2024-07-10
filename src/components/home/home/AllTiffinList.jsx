'use client';
import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import CardComponent from '@/components/Cards/TiffinCard';
import FilterButtons from '@/components/Common/FilterButton';
import { PRIMARY } from '@/theme/palette';

const data = [
  {
    imgSrc: 'https://as2.ftcdn.net/v2/jpg/02/84/46/89/1000_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg',
    alt: 'Pure Veg',
    tag: 'Pure Veg',
    tagBg: PRIMARY.greenColor,
    title: 'Avsar Foods',
    price: 85,
    rating: 4.5,
    isLike: true,
    mealType: 'Lunch & Dinner'
  },
  {
    imgSrc: 'https://as2.ftcdn.net/v2/jpg/02/84/46/89/1000_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg',
    alt: 'Non Veg',
    tag: 'Non-veg',
    tagBg: PRIMARY.main,
    title: 'Avsar Foods',
    price: 90,
    rating: 4.5,
    isLike: false,
    mealType: 'Dinner Only'
  },
  {
    imgSrc: 'https://as2.ftcdn.net/v2/jpg/02/84/46/89/1000_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg',
    alt: 'Combo',
    tag: 'Combo',
    tagBg: PRIMARY.lightOrange,
    title: 'Avsar Foods',
    price: 80,
    rating: 4.5,
    isLike: true,
    mealType: 'Lunch Only'
  }
];

const TiffinList = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, ml: isSmallScreen ? '0' : '50px', textAlign: 'start' }}>All Tiffins</Typography>
      <Grid item md={12} xs={12}>
        <FilterButtons />
      </Grid>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', ml: 6, gap: 3 }}>
        {data.map((item, index) => (
          <CardComponent
            key={index}
            imgSrc={item.imgSrc}
            alt={item.alt}
            tag={item.tag}
            tagBg={item.tagBg}
            title={item.title}
            price={item.price}
            rating={item.rating}
            mealType={item.mealType}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TiffinList;
