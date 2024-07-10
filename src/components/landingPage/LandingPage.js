"use client"
import { Box, Button, Container, Grid, Stack, TextField, InputAdornment, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

// components
import GettingStart from '../AuthScreens/GettingStart';

const _model = {
  login: "login",
  signup: "signup"
}

export default function LandingPage() {
  const theme = useTheme()

  // states
  const [model, setModel] = useState({ name: '', open: false });

  // helpers
  const handleOpenModal = (name) => setModel({ ...model, name, open: true });
  const handleCloseModal = () => setModel({ ...model, open: false });

  return (
    <>
      <Box sx={{ ...useStyles.landingBox, py: 5 }}>
        <Container>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid xs={2} md={2}>
              <Stack direction={"row"} spacing={2}>
                <Box component="img" src="/assets/images/menu1.svg" sx={{ height: 30, width: 30, }} />
                <Box component="img" src="/assets/images/logo1.svg" sx={{ height: 32, width: 140, ml: 2 }} />
              </Stack>
            </Grid>

            <Grid xs={10} md={10}>
              <Stack direction={"row"} spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={() => handleOpenModal(_model.login)}
                  sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                    color: theme.palette.primary.blackColor,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.contrastText,
                    }
                  }}
                  variant="contained">Login</Button>
                <Button variant="contained" onClick={() => handleOpenModal(_model.signup)}>Signup</Button>
              </Stack>
            </Grid>
          </Grid>

          <Box sx={useStyles.loginBox}>
            <Typography variant="heading2" fontSize={45} color={theme.palette.primary.contrastText}>
              Find the best tiffins for you.
            </Typography>
            <Grid container>
              <Grid xs={12} md={6} sx={{ margin: "auto", }}>
                <Stack direction="row" spacing={2} sx={{ my: 3, alignItems: 'center', justifyContent: 'center' }}>
                  <TextField
                    sx={{ backgroundColor: theme.palette.primary.contrastText, borderRadius: 1, width: '80%' }}
                    multiline
                    placeholder="Enter Delivery Address"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box component={"img"} src='/assets/images/location.svg' sx={{ height: 24, width: 24, }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ width: '30%' }}>
                    <Button fullWidth sx={{ height: 56 }} variant="contained">
                      Search
                    </Button>
                  </Box>
                </Stack>
              </Grid>
              <Grid xs={12} md={12} sx={{ my: 2 }}>
                <Typography sx={{ textDecoration: 'underline' }} variant="heading2" color={theme.palette.primary.contrastText}>
                  or Log in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>


      {
        model.open &&
        <GettingStart
          open={model.open}
          screen={model.name}
          onClose={handleCloseModal} />
      }
    </>
  )
}

const useStyles = {
  landingBox: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    backgroundImage: 'url(/assets/images/landingpage.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  loginBox: {
    margin: 'auto',
    height: '80vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}
