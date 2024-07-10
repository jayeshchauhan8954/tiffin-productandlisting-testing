import { Avatar, Button, ButtonGroup, useTheme } from '@mui/material'
import React from 'react'

export default function CounterButton({ value, onIncrement, onDecrement, }) {

    const theme = useTheme()

    return (
        <>
            <ButtonGroup
                sx={{ height: 35, background: theme.palette.primary.lightGrey, borderRadius: 40 }}
                size="small" aria-label="Small button group">
                <Button
                    onClick={onDecrement}
                    sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                >
                    <Avatar alt="" src="/assets/images/minus.svg" sx={{ height: 15, width: 15 }} />
                </Button>
                <Button sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}>{value}</Button>
                <Button
                    onClick={onIncrement}
                    sx={{ border: 0, fontSize: 14, color: theme.palette.primary.blackColor, '&:hover': { border: 0, backgroundColor: 'none' }, }}
                >
                    <Avatar alt="" src="/assets/images/add.svg" sx={{ height: 15, width: 15 }} />
                </Button>
            </ButtonGroup>
        </>
    )
}
