'use client';
import { _assets } from '@/utils/config/images'
import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web';

export default function PermissionDeined({ text, width = 300, height = 70 }) {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: _assets.jsonAnimations.permissionDeined
    });
    return () => animationContainer.current = null
  }, []);


  return (
    <Stack sx={{
      height: `${height}vh`,
      mt: 2,
      borderRadius: 2,
      justifyContent: "center",
      backgroundColor: (theme) => theme.palette.background.default
    }}>
      <Box ref={animationContainer} sx={{ width: width, margin: "10px auto" }}> </Box>
      <Typography variant={"subtitle1"} align="center">{text || "Perimission Denied!"}</Typography>
    </Stack>
  )
}
