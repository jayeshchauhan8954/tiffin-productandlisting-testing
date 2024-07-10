import React, { useState } from 'react'
import { Avatar, Box, Divider, Grid, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'

export default function SellerMessage({ sellerMsg, setSellerMsg = () => { } }) {
    const theme = useTheme();
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField
                        sx={{ backgroundColor: theme.palette.primary.lighterGray, borderRadius: 1, borderColor: 1 }}
                        multiline
                        rows={4}
                        placeholder='Specify skip days, alternate days, and one or two disliked items if any. Note, these request may not always be guaranteed. Contact support to confirm their arrangement before cut-off time.'
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setSellerMsg(e.target.value)}
                        defaultValue={sellerMsg}
                    />
                </Grid>

                {/* <Grid item xs={12} md={12} sx={{ mt: 1 }}>
                    <Stack direction={"row"} sx={{ alignItems: 'center' }}>
                        <Radio
                            sx={{ p: 0 }}
                            checked={selectedValue === 'a'}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            value="a"
                            name="radio-buttons"
                        />
                        <Typography sx={{ ml: 1 }} color={theme.palette.primary.main} variant='cardHeading'>Save note to list</Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography fontSize={14} color={theme.palette.primary.blackColor} variant='heading2'>Select from saved notes</Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction={"row"}>
                            <Avatar alt="" src="/assets/images/message.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography color={theme.palette.primary.blackColor} variant='small1'>Please be careful</Typography>
                        </Stack>
                        <Avatar alt="" src="/assets/images/delete.svg" sx={{ height: 30, width: 30, }} />
                    </Box>
                </Grid> */}

                {/* <Grid item xs={12} md={12}>
                    <Divider sx={{ borderColor: theme.palette.primary.primaryEdark }} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction={"row"}>
                            <Avatar alt="" src="/assets/images/message.svg" sx={{ height: 18, width: 18, mr: 1 }} />
                            <Typography color={theme.palette.primary.blackColor} variant='small1'>Please be careful</Typography>
                        </Stack>
                        <Avatar alt="" src="/assets/images/delete.svg" sx={{ height: 30, width: 30, }} />
                    </Box>
                </Grid> */}

            </Grid>
        </>
    )
}
