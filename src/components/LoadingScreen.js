'use client';

// material
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  width: '100%',
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

// ==============================|| Loader ||============================== //

const LoadingScreen = () => {
 
  return (
    <LoaderWrapper>
      <Stack spacing={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Image
          priority={true}
          src={"/assets/logo/logo.svg"}
          width={140}
          height={140}
          alt='loading'
        />
        <Typography variant='subtitle1'>Loading ...</Typography>
      </Stack>
    </LoaderWrapper>
  )
};

export default LoadingScreen;
