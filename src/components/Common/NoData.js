'use client';
import { _assets } from '@/utils/config/images'
import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

export default function NoData({ svgImage, heading, btnText, onClick = () => { }, text, width = 300, height = 50 }) {


  return (
    <Stack sx={{
      height: `${height}vh`,
      mt: 2,
      borderRadius: 2,
      justifyContent: "center",
      width: '100%',
      backgroundColor: (theme) => theme.palette.background.default
    }}>
      {svgImage && <Box component={'img'} src={svgImage} sx={{ maxWidth: "100%", maxHeight: '50%' }} />}
      {heading && <Typography variant={"heading2"} align="center" sx={{mt:2}}>{heading}</Typography>}
      <Typography variant={"cardHeading"} align="center" sx={{mt:2}}>{text || "No data available!"}</Typography>

      {/* Actions */}
      {btnText && <Button variant='contained' sx={{ height: 56, mt: 2, minWidth: 250,margin:"auto" }} onClick={onClick}>{btnText}</Button>}
    </Stack>
  )
}
