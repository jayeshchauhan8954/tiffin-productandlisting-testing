import React, { useEffect, useState } from 'react'
import CustomChip from './Common/CustomChip'
import { Grid, useTheme } from '@mui/material'

import { apiRequest } from '@/utils/config/apiRequest'
import { _apiUrls } from '@/utils/endPoints/apiUrls'

export default function Filter({ setSelFilters = () => { }, selFilters = {} }) {
    const theme = useTheme()

    // States
    const [filters, setFilters] = useState([])
    const [selectedChip, setSelectedChip] = useState(null);

    useEffect(() => {
        fetchDietary()
    }, [])

    const fetchDietary = async () => {
        const { data, status } = await apiRequest({ endUrl: _apiUrls.masters.dietaries, query: { paginate: 0 } })
        if (status) {
            setFilters([{ _id: 'All', name: 'All' }, ...data?.rows])
        }
    }

    // Helpers

    const handleChipClick = (index, dietaryId) => () => {
        setSelectedChip(index);
        if (dietaryId === 'All') {
            setSelFilters({ cuisineIds: [], dietaryId: '' })
        } else {
            setSelFilters({ ...selFilters, dietaryId })
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    {
                        filters.map((chip, index) => (
                            <CustomChip
                                label={chip?.name}
                                borderRadius={10}
                                onClick={handleChipClick(index, chip?._id)}
                                color={theme.palette.primary.primaryDmain2}
                                bgcolor={selectedChip === index ? theme.palette.primary.lightPink : theme.palette.primary.lightGrey3}
                                sx={{
                                    fontSize: 14, padding: 20, marginRight: 15, marginBottom: 10,
                                    border: selectedChip === index ? "1px solid #DE5200" : "transparent",
                                    borderColor: selectedChip === index ? theme.palette.primary.main : theme.palette.primary.main
                                }}
                            />
                        ))}
                </Grid>
            </Grid>

        </>
    )
}
