import { Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import React from 'react'

export default function PointHistory({ points }) {

  const theme = useTheme()

  return (
    <>
      <Container sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {points?.rows.map((item) => {
            return (
              <Grid item xs={12} md={12}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>{item?.source}</Typography>
                  <Typography component={"p"} sx={{ ml: 2 }} variant='regularText' color={theme.palette.primary.lightGrey4}>{moment(item?.createdAt).format('MMMM Do, YYYY')}</Typography>
                </Stack>
                <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>+ {item.points}</Typography>

                <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />

              </Grid>

            )

          })}
        </Grid>
      </Container>
    </>
  )
}


const useStyles = {
  coupanBox: {
    width: 40, height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2
  },

}