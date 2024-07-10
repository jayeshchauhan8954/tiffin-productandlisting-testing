'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import FoodCardNew from '@/components/Cards/FoodCardNew';

const foodItems = [
  { name: 'Avsar Foods', imgSrc: '/path/to/image1.png', availability: 'Lunch Only', rating: '4.5 (4)' },
  { name: 'Avsar Foods', imgSrc: '/path/to/image2.png', availability: 'Dinner Only', rating: '4.5 (4)' },
  { name: 'Avsar Foods', imgSrc: '/path/to/image3.png', availability: 'Lunch & Dinner', rating: '4.5 (4)' },
  { name: 'Avsar Foods', imgSrc: '/path/to/image4.png', availability: 'Lunch Only', rating: '4.5 (4)' },
];

export default function RecommendedBanner() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + foodItems.length) % foodItems.length);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 6 }}>
      <IconButton onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box sx={{ display: 'flex', overflowX: 'scroll', flexWrap: 'nowrap', maxWidth: '80%' }}>
        {foodItems.slice(currentIndex, currentIndex + 3).map((food, index) => (
          <FoodCardNew key={index} food={food} />
        ))}
      </Box>
      <IconButton onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
