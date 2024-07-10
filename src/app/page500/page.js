'use client'

// material
import { Box, Stack } from "@mui/material";

export default function page() {
  return (
    <Stack flex={1}>
      <Box
        component="img"
        src="/assets/images/page500.png"
        sx={{
          height: '100vh',
          width: '100vw',
          objectFit: 'contain',
          backgroundColor: '#fdfdfd'
        }}
      />
    </Stack>
  )
}