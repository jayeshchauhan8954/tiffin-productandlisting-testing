import { Box, Card, CardContent, Container, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

export default function BasicCard() {
  const theme = useTheme()
  return (
    <>
      <Container>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12} textAlign={"center"} sx={{ mb: 3 }}>
            <Typography variant='cardHeading' fontSize={16} color={theme.palette.primary.textGray1}>Customers order on our platform, you prepare the tiffin, and we deliver it to their doorstep.</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', py: 3, px: 1, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;" }}>
              <CardContent>
                <Box component={"img"} src="/assets/images/tab4.png" sx={{ maxWidth: '80px', height: '60px', mb: 2, }} />
                <Typography component={"p"} fontSize={20} color={theme.palette.primary.main} sx={{ mb: 2, }} variant='heading1'>More Orders</Typography>
                <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.primaryDGrey60}>Opportunity to connect with a wider audience and grow your business.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', py: 3, px: 1, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;" }}>
              <CardContent>
                <Box component={"img"} src="/assets/images/tab6.png" sx={{ maxWidth: '80px', height: '60px', mb: 2, }} />
                <Typography component={"p"} fontSize={20} color={theme.palette.primary.main} sx={{ mb: 2, }} variant='heading1'>Wider Reach</Typography>
                <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.primaryDGrey60}>Grow your business by reaching customers beyond your usual delivery area.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', py: 3, px: 1, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;" }}>
              <CardContent>
                <Box component={"img"} src="/assets/images/tab5.png" sx={{ maxWidth: '80px', height: '60px', mb: 2, }} />
                <Typography component={"p"} fontSize={20} color={theme.palette.primary.main} sx={{ mb: 2, }} variant='heading1'>Convenience</Typography>
                <Typography component={"p"} variant='cardHeading' color={theme.palette.primary.primaryDGrey60}>Easily prepare tiffins while we handle the tiffin delivery and the support.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
