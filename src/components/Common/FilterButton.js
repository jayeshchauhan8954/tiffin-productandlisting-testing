// import React from 'react';
// import { Button, ButtonGroup, Box } from '@mui/material';

// const FilterButtons = () => {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
//       <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{gap:6}}>
//         <Button>Sort</Button>
//         <Button>Veg</Button>
//         <Button>Non-veg</Button>
//         <Button>Combo</Button>
//         <Button>Discount</Button>
//         <Button>Rating 4.0+</Button>
//         <Button>Cuisines</Button>
//       </ButtonGroup>
//     </Box>
//   );
// };

// export default FilterButtons;


// components/FilterButtons.js
import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { fontName } from '@/utils/fonts/Font';

const FilterButtons = () => {
    const theme = useTheme()
  const buttons = ["Sort", "Veg", "Non-veg", "Combo", "Discount", "Rating 4.0+", "Cuisines"];
  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: 2, gap: 1 ,marginLeft:'50px'}}>
      {buttons.map((btn, index) => (
        <Button  key={index} variant="outlined" sx={{ textTransform: 'none',fontFamily:fontName.PoppinsRegular,color:theme.palette.common.black,border:`1px solid ${theme.palette.primary.contrastText}` ,':hover':{color:theme.palette.common.black,background:theme.palette.primary.contrastText,border:'none'} }}>
          {btn}
        </Button>
      ))}
    </Box>
  );
};

export default FilterButtons;
