'use client';

import React from 'react'

import { _routes } from '@/utils/endPoints/routes'
import { List, ListItem, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slicers/auth';
import { removeAuthCookie } from '@/utils/helpers/authHelpers';

const Navitems = ({ navConfig = [] }) => {
    const theme = useTheme()

    const  dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setAuth({ token: '', isAuth: false, userType: '' }))
        removeAuthCookie()
    }

    return (
        <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {
                navConfig?.map(item =>
                    <ListItem component={Link} href={item?.path || "#"} sx={{ cursor: 'pointer', color: '#3F414A', ":hover": { color: '#DE5200' } }}>
                        <Typography variant='subtitle1'>{item?.title}</Typography>
                    </ListItem>)
            }
            <ListItem onClick={handleLogout} sx={{ cursor: 'pointer', color: theme.palette.primary.main}}>
                <Typography variant='subtitle1'>Logout</Typography>
            </ListItem>
        </List>
    )
}

export default Navitems