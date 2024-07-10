'use client'
import { apiRequest } from '@/utils/config/apiRequest';
import { _legalPages } from '@/utils/constants/constants';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { Box, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function page() {

  const theme = useTheme();

  // States
  const [load, setLoad] = useState(false)
  const [state, setState] = useState({})

  useEffect(() => {
    DeleteAccount();
  }, [])

  const DeleteAccount = async () => {
    setLoad(true)
    const { data, status } = await apiRequest({
      endUrl: _apiUrls.user.termsCondition,
      method: 'GET',
      query: { type: _legalPages.deleteAccount },
    })
    setLoad(false)
    if (status) {
      setState(data)
    }
  }

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={{ textAlign: 'center', my: 5 }}>
              <Typography variant="heading1" color={theme.palette.primary.main}>DELETE ACCOUNT</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="title">OVERVIEW</Typography>
            <Stack spacing={3}>
              <Typography component={"p"} variant="cardText" sx={{ textAlign: 'justify' }} color={theme.palette.primary.primaryDmain}>
                <div dangerouslySetInnerHTML={{ __html: state?.description }}></div>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
