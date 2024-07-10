import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';

let defaultDays = () => {
    let current = moment()
    let daysList = [], count = 0
    while (count < 7) {
        daysList.push(moment(current).format('YYYY-MM-DD'))
        current = current.add(1, 'day')
        count++
    }
    return daysList
}

export default function SelectStartDate({ days = defaultDays() || [], onChange = (date) => { } }) {
    const theme = useTheme();

    const [selectedDay, setSelectedDay] = useState()

    const handleDaySelect = (day) => () => {
        setSelectedDay(day);
        onChange(day)
    }

    return (
        <>
            <Box sx={{ backgroundColor: theme.palette.primary.lighterPink, border: 1, borderColor: theme.palette.primary.lightOrange, display: 'flex', width: "100%", overflowX: 'auto', justifyContent: 'space-between', borderRadius: 1, padding: 1 }}>
                {
                    days.map((day) => <Box
                        key={day}
                        sx={{
                            borderRadius: 1,
                            py: 1,
                            backgroundColor: selectedDay === day ? theme.palette.primary.main : 'transparent',
                            px: 2,
                            textAlign: 'center', alignItems: 'center',
                            cursor: 'pointer',
                            borderRadius: 1,
                        }}
                        onClick={handleDaySelect(day)}>
                        <Typography variant='small' color={selectedDay === day ? theme.palette.primary.contrastText : theme.palette.primary.blackColor}>
                            {moment(day).format("ddd")}
                        </Typography>
                        <Typography color={selectedDay === day ? theme.palette.primary.contrastText : theme.palette.primary.blackColor} component={"p"} variant='medium'>
                            {moment(day).format("DD")}
                        </Typography>
                    </Box>)
                }
            </Box>
        </>
    )
}
