import React, { useEffect, useState } from 'react'
import { TotalOrders } from './TotalOrders'
import { Grid } from '@mui/material'
import { TotalSell } from './TotalSell'
import { TotalProducts } from './TotalProducts'
import { PaymentSummary } from './PaymentSummary'
import { OrderSummary } from './OrderSummaryChart'
import { LatestProducts } from './LatestProduct'
import { LatestOrders } from './LatestOrders'
import { TotalDeliveries } from './TotalDeliveries'
import { apiRequest } from '@/utils/config/apiRequest'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import { _orderDeliveryStatus, _orderDetailStatus } from '@/utils/constants/constants'


export default function SellerDashboard() {
    const [dashCount, setDashCount] = useState({});
    const [orderSummary, setOrderSummary] = useState([]);
    const [dashData, setDashData] = useState([]);

    // format order summary
    const orderDetailStats = orderSummary?.reduce((acc, item) => {
        const status = _orderDeliveryStatus[item._id];
        acc[status] = item.count
        return acc
    }, {})

    // format order Details
    const formatOrderDetails = dashData?.orderDetails?.map(item => {
        return {
            id: item?.orderNo,
            customer: item?.customerDetails?.firstName,
            status: _orderDetailStatus[item?.status],
            orderDate: item?.createdAt
        }
    })

    // format product Details
    const formatProductDetails = dashData?.productDetails?.map(item => {
        return {
            name: item?.name,
            date: item?.createdAt,
            image: item?.thumbNail
        }
    })


    // fetch Dashboard Count
    async function fetchDashCount() {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.dashboard.dashCount,
            method: 'GET'
        })
        status && setDashCount(data)
    }

    // fetch Dash Order Summary
    async function fetchDashOrderSummary() {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.dashboard.dashOrderSummary,
            method: 'GET'
        })
        status && setOrderSummary(data)
    }

    // fetch Dash Order Details
    async function fetchDashOrderDetails() {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.dashboard.dashOrderDetails,
            method: 'GET'
        })
        status && setDashData(data)
    }
console.log('formatProductDetails', formatProductDetails)
    useEffect(() => {
        fetchDashCount();
        fetchDashOrderSummary();
        fetchDashOrderDetails();
    }, [])

    return (
        <Grid container marginBottom={8} spacing={3} mt={5} display={'flex'} justifyContent={'space-between'}>
            <Grid p={1} lg={3} sm={6} xs={12}>
                <TotalOrders diff={12} trend="up" sx={{ height: '100%' }} value={dashCount?.totalOrderCount || 0} />
            </Grid>
            <Grid p={1} lg={3} sm={6} xs={12}>
                <TotalDeliveries diff={12} trend="up" sx={{ height: '100%' }} value={dashCount?.totalDeliveries || 0} />
            </Grid>
            <Grid p={1} lg={3} sm={6} xs={12}>
                <TotalSell diff={12} trend="down" sx={{ height: '100%' }} value={dashCount?.totalNetAmount || 0} />
            </Grid>
            <Grid p={1} lg={3} sm={6} xs={12}>
                <TotalProducts diff={12} trend="up" sx={{ height: '100%' }} value={dashCount?.totalProducts || 0} />
            </Grid>
            <Grid marginTop={4} lg={7.8} xs={12}>
                <PaymentSummary
                    chartSeries={[
                        { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                    ]}
                    sx={{ height: '100%' }}
                />
            </Grid>
            <Grid marginTop={4} lg={3.9} md={6} xs={12}>
                <OrderSummary chartSeries={Object.values(orderDetailStats)} labels={Object.keys(orderDetailStats)} sx={{ height: '100%' }} />
            </Grid>
            <Grid marginTop={4} lg={4.3} md={6} xs={12}>
                <LatestProducts
                    products={formatProductDetails}
                    sx={{ height: '100%' }}
                />
            </Grid>
            <Grid marginTop={4} lg={7.4} md={12} xs={12}>
                <LatestOrders
                    orders={formatOrderDetails}
                    sx={{ height: '100%' }}
                />
            </Grid>
        </Grid>
    )
}
