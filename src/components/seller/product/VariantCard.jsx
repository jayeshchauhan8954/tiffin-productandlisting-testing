import { Box, Card, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

// Icons
import { Edit as EditIcon } from '@mui/icons-material'
import { getS3Url } from '@/utils/helpers/fileHelper'

export default function VariantCard({ itemInfo, mealPlan, onEdit = () => { } }) {
    const theme = useTheme()

    const getPrice = () => {
        let item = itemInfo?.mealPlans?.find(item => item?.name === mealPlan)
        return item?.rate || "..."
    }
    return (
        <Card sx={{ mt: 2, border: `1px solid ${theme.palette.grey[300]}`, boxShadow: theme.shadows.cardShadow }}>
            <Grid container spacing={2}>
                <Grid item md={8} xs={8} >
                    <Box sx={{ p: 1 }}>
                        <Typography variant='subtitle2' lineHeight={0.5}>{itemInfo?.mealTypeId?.name}</Typography>
                        <Typography variant='caption'>{itemInfo?.items?.map(elem => `${elem?.name} (${elem?.qty} ${elem?.uom})`).join(", ")}</Typography>
                        <br />
                        <Typography variant='h6'>$ {getPrice()}</Typography>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='caption'>{itemInfo?.deliveryTimes?.map((item) => item?.name).join(" & ")}</Typography>
                            <IconButton size='small' onClick={onEdit}><EditIcon fontSize='small' /></IconButton>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item md={4} xs={8}>
                    <Box sx={{ height: 100 }}>
                        <Box sx={{ objectFit: 'cover' }} component={'img'} src={getS3Url(itemInfo?.media) || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRQERVQ7Mr7DpX-bUP0bM_8EUTNuv6m_7kR7wy5LN5xVj3LsbC_57RF6RXgq8IT2ELpE&usqp=CAU'} />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}
