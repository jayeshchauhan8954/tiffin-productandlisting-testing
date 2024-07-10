'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import StarIcon from '@mui/icons-material/Star';

const CardComponent = ({ imgSrc, alt, tag, tagBg, title, price, rating, mealType }) => {
  const [isLike, setIsLike] = useState(false);
  return (
    <Card sx={{ maxWidth: 450, margin: 2, borderRadius: 1, boxShadow: 3,position:'relative',gap:4 }}>
      <CardMedia
        component="img"
        image={imgSrc}
        alt={alt}
        sx={{ borderBottomLeftRadius: 2, borderBottomRightRadius: 2,width:'400px',height:'180px' }}
      />
          <IconButton sx={{position:'absolute',top:6,right:6}} onClick={() => { setIsLike(!isLike); }}>
            {isLike ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon  />}
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', position:'absolute',bottom:97, alignItems: 'center', mb: 1 }}>
          <Chip label={tag} sx={{ backgroundColor: tagBg, color: 'white', fontWeight: 'bold',borderRadius:'0px 10px 0 0' }} />
        </Box>
      <CardContent>
    
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'space-evenly', mb: 1,width:'100%' }}>
          <LunchDiningIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {mealType} &nbsp; | &nbsp; 
          </Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary">
            $$$$
          </Typography>
        </Box>
          <Box sx={{ display: 'flex', right:0 }}>
            <StarIcon fontSize="small" sx={{ color: 'gold', mr: 0.5 }} />
            <Typography variant="subtitle2" color="text.secondary">
              {rating} ({4})
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
