import CustomChip from '@/components/Common/CustomChip';
import CustomDialog from '@/components/Common/CustomDialog';
import { Box, Button, Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

export default function EarnPoints() {

  const theme = useTheme()

  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  return (
    <>
      <Container sx={{ my: 3 }}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"}>
                <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, }}>
                  <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                </Stack>
                <Box>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>Sign up</Typography>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>5 Points</Typography>
                </Box>
              </Stack>
              <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"}>
                <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, }}>
                  <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                </Stack>
                <Box>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>Like page on Facebook</Typography>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>100 Points</Typography>
                </Box>
              </Stack>
              <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"}>
                <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, }}>
                  <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                </Stack>
                <Box>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>Follow on Instagram</Typography>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>100 Points</Typography>
                </Box>
              </Stack>
              <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"}>
                <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, }}>
                  <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                </Stack>
                <Box>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>Place an order</Typography>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>1 Point for every $1 you spend</Typography>
                </Box>
              </Stack>
              <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider sx={{ my: 2, borderColor: theme.palette.primary.divideGrey }} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"}>
                <Stack sx={{ ...useStyles.coupanBox, backgroundColor: theme.palette.primary.lightGrey6, }}>
                  <Box component={"img"} alt="" src="/assets/icons/ticketdiscount.svg" sx={{ height: 20, }} />
                </Stack>
                <Box onClick={handleOpen}>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.primaryDmain}>Report Bugs</Typography>
                  <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4}>25 Points for every bug you report</Typography>
                </Box>
              </Stack>
              <Box component="img" src="/assets/images/arrow-right.svg" sx={{ height: 20 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>


      <CustomDialog
        maxWidth="md"
        showBorderBottom={true}
        open={modal}
        onClose={handleClose}
        heading={"Redeem Points"}
      >
        <Grid container spacing={2}>

          <Grid item xs={12} md={12}>
            <Box sx={{ justifyContent: 'center', alignItems: 'center', alignSelf: '' }}>
              <Box component={"img"} alt="" src="/assets/icons/bug2.svg" />
              <Typography component={"p"} fontSize={20} variant='boldtext' sx={{ my: 1, textAlign: 'center' }} color={theme.palette.primary.primaryDmain}>Report Bugs</Typography>
              <Typography component={"p"} variant='regularText' color={theme.palette.primary.lightGrey4} sx={{ my: 1, textAlign: 'center' }}>Beta Version Only: Report bugs to earn reward points! Help us improve your experience.</Typography>
            </Box>
          </Grid>

        </Grid>
      </CustomDialog>
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