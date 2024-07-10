import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonBase } from '@mui/material';

let dayIndexMap = {
    "Mon": 0,
    "Tue": 1,
    "Wed": 2,
    "Thu": 3,
    "Fri": 4,
    "Sat": 5,
    "Sun": 6
}

export default function CommonCalender({ days = [], enabled = true }) {

    const theme = useTheme();

    const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",]

    const [selectedIndices, setSelectedIndices] = useState(days.map(day => dayIndexMap[day]));

    // Handle selection
    const handleBoxClick = (index) => {
        setSelectedIndices(selected => {
            if (selected.includes(index)) {
                return selected.filter(i => i !== index);
            } else {
                return [...selected, index];
            }
        });
    };

    return (
        <>
            <Box sx={{ backgroundColor: theme.palette.primary.lighterPink, border: 1, borderColor: theme.palette.primary.lightOrange, display: 'flex', width: "100%", overflowX: 'auto', justifyContent: 'space-between', borderRadius: 1, padding: 1 }}>
                {week.map((item, index) => {
                    return (
                        <>
                            {/* <Box
                                sx={{
                                    borderRadius: 1, py: 1,
                                    backgroundColor: selectedIndices.includes(index) ? theme.palette.primary.main : 'transparent',
                                    px: 2,
                                    textAlign: 'center', alignItems: 'center',
                                    cursor: 'pointer',
                                    borderRadius: 1,
                                }}
                                onClick={() => handleBoxClick(index)}
                            >
                                <Typography variant='small' color={selectedIndices.includes(index) ? theme.palette.primary.contrastText : theme.palette.primary.blackColor}>
                                    FRI
                                </Typography>
                                <Typography color={selectedIndices.includes(index) ? theme.palette.primary.contrastText : theme.palette.primary.blackColor} component={"p"} variant='medium'>
                                    04
                                </Typography>
                            </Box> */}

                            <ButtonBase
                                disabled={!enabled}
                                sx={{
                                    borderRadius: 1, py: 1,
                                    backgroundColor: selectedIndices.includes(index) ? theme.palette.primary.main : 'transparent',
                                    px: { xs: 2, md: 3 },
                                    mr: { xs: 1, md: 0, },
                                    textAlign: 'center', alignItems: 'center',
                                    cursor: 'pointer',
                                    borderRadius: 1,
                                }}
                                onClick={() => handleBoxClick(index)}
                            >
                                <Typography variant='cardText' fontSize={12} color={selectedIndices.includes(index) ? theme.palette.primary.contrastText : theme.palette.primary.blackColor}>
                                    {item}
                                </Typography>
                            </ButtonBase>

                        </>
                    )
                })

                }
            </Box>
        </>
    )
}
