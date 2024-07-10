import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import config from '@/utils/config/config';
import { fDate } from '@/utils/helpers/timeHelpers';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';

export function LatestProducts({ products = [], sx }) {
    const router = useRouter();

    const handleProducts = () => {
        router.push(_routes.seller.products.list)
    }
    return (
        <Card sx={sx}>
            <CardHeader title="Latest products" />
            <Divider />
            <List>
                {products.map((product, index) => (
                    <ListItem divider={index < products.length - 1} key={product.id}>
                        <ListItemAvatar>
                            {product.image ? (
                                <Box component="img" src={config.S3Configs.base_url + product?.image} sx={{ borderRadius: 1, height: '48px', width: '48px' }} />
                            ) : (
                                <Box
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: 'var(--mui-palette-neutral-200)',
                                        height: '48px',
                                        width: '48px',
                                    }}
                                />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                            primaryTypographyProps={{ variant: 'subtitle1' }}
                            secondary={`Updated ${fDate(product?.date)}`}
                            secondaryTypographyProps={{ variant: 'body2' }}
                        />
                        {/* <IconButton edge="end">
                            <MoreVertIcon weight="bold" />
                        </IconButton> */}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={<ArrowForwardIcon fontSize="var(--icon-fontSize-md)" />}
                    size="small"
                    variant="text"
                    onClick={handleProducts}
                >
                    View all
                </Button>
            </CardActions>
        </Card>
    );
}
