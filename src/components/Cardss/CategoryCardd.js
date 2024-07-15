import { apiRequest } from '@/utils/config/apiRequest'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import { getS3Url } from '@/utils/helpers/appHelpers'
import { Box, Typography, useTheme } from '@mui/material'
import { get } from 'lodash'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function CategoryCardd() {
    const theme = useTheme()

    // States
    const [cuisine, setCuisine] = useState([])

    useEffect(() => {
        fetchCuisine();
    }, [])

    const fetchCuisine = async () => {
    const{data,status}= await apiRequest({
       endUrl:_apiUrls.user.getCuisine,
       method:'GET' 
    })
    if(status){
        setCuisine(data?.rows)
    }
    }

    return (
        <Box sx={{
            overflowX: 'auto', whiteSpace: 'nowrap', padding: 2, display: 'flex', '&::-webkit-scrollbar': {
                display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
        }}>
            {cuisine.map((item,index)=>(

           
                <Box key={index} sx={{ textAlign: 'center', marginRight: 8, }}>
                    <Box sx={{
                        backgroundColor: theme.palette.primary.lighterPink, height: 100, width: 100, borderRadius: 50, display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: "auto",
                        mb: 1
                    }}>
                        <Box component={"img"} src={getS3Url(item.imageUrl)} sx={{ height: 70, width: 70 }} />
                    </Box>
                    <Typography variant='cardText' color={theme.palette.primary.primaryDmain}>{item.name}</Typography>
                </Box>
           ))}
        </Box>
    )
}
