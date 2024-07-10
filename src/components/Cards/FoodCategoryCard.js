import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { _assets } from '@/utils/config/images';
import Scrollbar from '../Scrollbar';

// Food category data
const defaultfoodCategories = [
  { name: 'Punjabi', imgSrc: _assets.images.homeList.bannerCard('punjabi.png') },
  { name: 'Gujarati', imgSrc: _assets.images.homeList.bannerCard('gujarati.png') },
  { name: 'Marathi', imgSrc: _assets.images.homeList.bannerCard('marathi.png') },
  { name: 'Swaminarayan', imgSrc: _assets.images.homeList.bannerCard('swaminarayan.png') },
  { name: 'Jain', imgSrc: _assets.images.homeList.bannerCard('jain.png') },
  { name: 'South Indian', imgSrc: _assets.images.homeList.bannerCard('southIndian.png') },
  { name: 'Snacks', imgSrc: _assets.images.homeList.bannerCard('snacks.png') },
];

export default function FoodCategories({ foodCategories = defaultfoodCategories }) {
  const theme = useTheme();

  return (
    <Scrollbar sx={{ maxWidth: '100%', overflowX: 'auto','&::-webkit-scrollbar': { display: 'none' }  }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, px: 2 }}>
          {foodCategories.map((category) => (
            <Card key={category.name} sx={{ minWidth: '154px', maxWidth: '154px', flex: '0 0 auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  sx={{ width: '110px', objectFit: 'cover', pl: 5, pt: 2, pb: 3 }}
                  src={category.imgSrc}
                  alt={category.name}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', p: 0, m: 0 }}>
                <Typography variant="subtitle2" color={theme.palette.primary.slateColor}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Scrollbar>
  );
}
