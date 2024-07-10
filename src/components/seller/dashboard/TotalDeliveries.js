import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export function TotalDeliveries({ diff, trend, sx, value }) {
    const TrendIcon = trend === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon;
    const trendColor = trend === 'up' ? 'green' : 'red';

    return (
        <Card sx={sx}>
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                Total Deliveries
                            </Typography>
                            <Typography variant="h4">{value}</Typography>
                        </Stack>
                        <Avatar sx={{ color: '#DE5200', height: '56px', width: '56px' }}>
                            <ShoppingCartIcon />
                        </Avatar>
                    </Stack>
                    {diff ? (
                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                                <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
                                <Typography color={trendColor} variant="body2">
                                    {diff}%
                                </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="caption">
                                Since last month
                            </Typography>
                        </Stack>
                    ) : null}
                </Stack>
            </CardContent>
        </Card >
    );
}