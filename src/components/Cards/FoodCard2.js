// 'use client'
// import React, { useState } from 'react';
// import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import StarIcon from '@mui/icons-material/Star';
// import LunchIcon from '@mui/icons-material/LunchDining';
// import DinnerIcon from '@mui/icons-material/DinnerDining';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// export default function FoodCard2({ food }) {
//   const theme = useTheme();
//   const [favorite, setFavorite] = useState(false);

//   const handleFavoriteClick = () => {
//     setFavorite(!favorite);
//   };

//   return (
//     <Card sx={{ display: 'flex', flexDirection: 'column', width: '300px', m: 2, boxShadow: 3 }}>
//       <Box sx={{ position: 'relative' }}>
//         <CardMedia component="img" height="140" image={food.imgSrc} alt={food.name} />
//         <IconButton
//           sx={{ position: 'absolute', top: 8, right: 8 }}
//           onClick={handleFavoriteClick}
//         >
//           {favorite ? <FavoriteIcon sx={{ color: theme.palette.error.main }} /> : <FavoriteBorderIcon />}
//         </IconButton>
//       </Box>
//       <CardContent>
//         <Typography variant="body2" color={theme.palette.success.main} sx={{ mb: 1 }}>
//           PURE VEG
//         </Typography>
//         <Typography variant="h6" color={theme.palette.text.primary}>
//           {food.name}
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//           {food.availability === 'Lunch Only' && <LunchIcon />}
//           {food.availability === 'Dinner Only' && <DinnerIcon />}
//           {food.availability === 'Lunch & Dinner' && (
//             <>
//               <LunchIcon />
//               <DinnerIcon />
//             </>
//           )}
//           <Typography variant="body2" sx={{ ml: 1 }}>{food.availability}</Typography>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//           <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mr: 1 }}>
//             $$$$
//           </Typography>
//           <StarIcon sx={{ color: 'gold' }} />
//           <Typography variant="body2" sx={{ ml: 0.5 }}>{food.rating}</Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }


// components/Cards/FoodCard.js

'use client'

import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography, useTheme } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import StarIcon from '@mui/icons-material/Star';

const FoodCard2 = ({ food }) => {
  const theme = useTheme();
  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={food.image}
        alt={food.name}
      />
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton onClick={handleFavoriteClick}>
          {favorite ? (
            <FavoriteIcon sx={{ color: theme.palette.error.main }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: theme.palette.common.white }} />
          )}
        </IconButton>
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ backgroundColor: theme.palette.primary.greenColor, borderRadius: 1, px: 1, py: 0.5, mr: 1 }}>
            <Typography variant="body2" color="common.white">
              PURE VEG
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            $$$$
          </Typography>
        </Box>
        <Typography variant="cardTitle" component="div">
          {food.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <LunchDiningIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
          <Typography variant="cardSubtitle" color="text.secondary">
            {food.meals}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="cardSubtitle" color="text.secondary">
            {food.price}
          </Typography>
          <StarIcon sx={{ color: theme.palette.warning.main, ml: 1 }} />
          <Typography variant="cardSubtitle" color="text.secondary" sx={{ ml: 0.5 }}>
            {food.rating}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard2;
