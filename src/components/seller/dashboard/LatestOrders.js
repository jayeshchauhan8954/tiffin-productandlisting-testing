import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
// import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Label from '@/components/Common/Label';
import { fDate } from '@/utils/helpers/timeHelpers';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';


export function LatestOrders({ orders = [], sx }) {
    const router = useRouter()
    const handleOrders = () => {
        router.push(_routes.seller.orders)
    }
    return (
        <Card sx={sx}>
            <CardHeader title="Latest orders" />
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell sortDirection="desc">Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            return (
                                <TableRow hover key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{fDate(order.orderDate)}</TableCell>
                                    <TableCell>
                                        <Label type='orderStatus' value={order.status}>{order.status}</Label>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={<ArrowForwardIcon fontSize="var(--icon-fontSize-md)" />}
                    size="small"
                    variant="text"
                    onClick={handleOrders}
                >
                    View all
                </Button>
            </CardActions>
        </Card>
    );
}
