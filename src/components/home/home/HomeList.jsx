// import { Box, Container, Divider, IconButton, Stack, Typography, useTheme, } from '@mui/material'
// import { Fragment, useState } from 'react'
// import Grid from '@mui/material/Grid';
// import { fontName } from '@/utils/fonts/Font';
// import FoodCategories from '@/components/Cards/FoodCategoryCard';
// const HomeList = () => {
//   const theme = useTheme()
//   return (
//     <Fragment>
//       <Box sx={{ px: 10, pb: 5 }}>
//         <Grid container spacing={2} sx={{ pt:3 }}>
//           <Grid item md={12} xs={12}>
//             <FoodCategories/>

//           </Grid>
//         </Grid>
//       </Box>
//     </Fragment>
//   )
// }

// export default HomeList


// pages/HomeList.js
'use client'
import { Box, Container, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import { fontName } from '@/utils/fonts/Font';
import FoodCategories from '@/components/Cards/FoodCategoryCard';
import RecommendedBanner from './RecommendedBanner';
import HomeListCard from './HomeListCard';
import SliderCard from '@/components/Cards/BannerCard';
import TiffinList from './AllTiffinList';

const HomeList = () => {
  const theme = useTheme();

  return (
    <Fragment>
      <Box sx={{ px: 3, pb: 2, mt: 2.5 }}>
        <Grid container spacing={0} sx={{ pt: 3 }}>
          <Grid item md={12} xs={12}>
            <FoodCategories />
          </Grid>
          {/* <Grid item md={12} xs={12}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              Recommended For You
            </Typography>
            <RecommendedBanner/>
          </Grid>
          <Grid item md={12} xs={12}>
            <HomeListCard/>
          </Grid> */}
          {/* <Grid item md={12} xs={12}> */}
            <SliderCard />
          {/* </Grid> */}
          <Grid item md={12} xs={12}>
            <TiffinList />
          </Grid>

        </Grid>
      </Box>
    </Fragment>
  );
};

export default HomeList;
