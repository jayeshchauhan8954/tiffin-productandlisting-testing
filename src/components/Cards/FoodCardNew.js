'use client'
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import LunchIcon from '@mui/icons-material/LunchDining';
import DinnerIcon from '@mui/icons-material/DinnerDining';
import { useTheme } from '@mui/material/styles';

export default function FoodCardNew({ food }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '250px', m: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image={food.imgSrc}
        alt={food.name}
      />
      <CardContent>
        <Typography variant="h6" color={theme.palette.text.primary}>{food.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {food.availability === 'Lunch Only' && <LunchIcon />}
          {food.availability === 'Dinner Only' && <DinnerIcon />}
          {food.availability === 'Lunch & Dinner' && (
            <>
              <LunchIcon />
              <DinnerIcon />
            </>
          )}
          <Typography variant="body2" sx={{ ml: 1 }}>{food.availability}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <StarIcon sx={{ color: 'gold' }} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>{food.rating}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
