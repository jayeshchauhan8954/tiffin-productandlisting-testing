import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Stack, Typography, useTheme } from '@mui/material'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Components
import CategoryCard from '@/components/Cards/CategoryCard'
import ItemCard from '@/components/Cards/ItemCard'
import ImageSlider from '@/components/Cards/ImageSlider'
import Filter from '@/components/Filter'
import CustomChip from '@/components/Common/CustomChip'
import RecommandedCard from '@/components/Cards/RecommandedCard'
import { getAuth } from '@/redux/selectors/authSelectors'
import { clearCart } from '@/redux/slicers/cart'

export default function ProductListing() {
    const theme = useTheme()

    // States
    const [selFilters, setSelFilters] = useState({ dietaryId: '', cuisineIds: [] })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearCart())
    }, [])

    return (
        <React.Fragment>
            {/* Cusines */}
            <Container sx={{ my: 3, }}>
                <CategoryCard />
            </Container>

            {/* Events */}
            <Box sx={{ backgroundColor: theme.palette.primary.contrastText, py: 3, }}>
                <ImageSlider />
            </Box>

            {/* Recommended */}
            <Box sx={{ backgroundColor: theme.palette.primary.lightergrey2, py: 4, }}>
                <Container sx={{ mb: 3 }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant='heading2' fontSize={24}>Recommended For You</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ mt: 3, }}>
                        <RecommandedCard />
                    </Grid>
                </Container>
            </Box>

            {/* Tiffins */}
            <Container sx={{ my: 5, }}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Typography variant='heading2' fontSize={24}>All Tiffins</Typography>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Filter setSelFilters={setSelFilters} selFilters={selFilters} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <ItemCard selFilters={selFilters} />
                    </Grid>
                </Grid>

            </Container>
        </React.Fragment>
    )
}
