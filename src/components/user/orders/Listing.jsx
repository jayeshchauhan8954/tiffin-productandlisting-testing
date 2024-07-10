import React, { useEffect, useState } from 'react'
import Header from '@/components/Common/Header'
import { Box, Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import ActiveOrder from '@/components/OrderCard/ActiveOrder';
import PastOrder from '@/components/OrderCard/PastOrder';
import CustomChip from '@/components/Common/CustomChip';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import LoadMore from '@/components/Common/LoadMore';

import OrderCard from './OrderCard';
import CustomDialog from '@/components/Common/CustomDialog';
import OrderDetails from './OrderDetails';
import ReviewOrder from './ReviewOrder';
import GetHelp from './GetHelp';
import NoData from '@/components/Common/NoData';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';

const _models = {
    'details': "details",
    'rateOrder': 'rateOrder',
    'getHelp': 'getHelp'
}

const _tabs = {
    "Active": "Active",
    "Inactive": "Inactive"
}
export default function Listing() {
    const theme = useTheme();

    const route = useRouter()

    // States
    const [activeTab, setActiveTab] = useState(_tabs.Active); // 1,2,4 --> Active, 3---> Completed
    const [pagination, setPagination] = useState({ page: 1, limit: 5 })
    const [state, setState] = useState({ count: 0, rows: [] });
    const [model, setModel] = useState({ data: {}, name: '' })

    useEffect(() => { // call api on filters apply & set page 1
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [activeTab])

    useEffect(() => { // call api on page change
        fetchOrders();
    }, [pagination])

    const fetchOrders = async () => {
        handleClose()
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.user.order,
            method: "GET",
            query: { ...pagination, status: activeTab === _tabs.Active ? "1,2,4" : 3 }
        })

        if (status) {
            let orders = []
            data?.rows?.forEach(order => {
                order?.orderDetails.forEach(ordDet => {
                    orders.push({
                        _id: order?._id,
                        orderNo: order?.orderNo,
                        orderDetails: ordDet
                    })
                })
            })
            setState({
                ...state,
                rows: pagination.page === 1 ? orders : state?.rows?.concat(orders),
                ...(pagination.page === 1 && { count: data?.count })
            })
        }
    }

    // Helpers
    const handleStatusChange = (tabName) => () => setActiveTab(tabName)
    const handleOpen = (name, data = {}) => setModel({ ...model, name, data })
    const handleClose = () => setModel({ ...model, name: '' })

    const handleView = (item) => handleOpen(_models.details, item)

    // Actions helpers
    const handlePrimaryAction = () => {
        if (activeTab === _tabs.Inactive) {
            // Reorder
        } else {
            // Modiy Order
        }
    }

    const handleSecondaryAction = (item) => {
        if (activeTab === _tabs.Inactive) {
            handleOpen(_models.rateOrder, item)
        } else {
            handleOpen(_models.getHelp, item)
        }
    }

    const handleStart = ()=> route.push(_routes.user.products)

    return (
        <>
            <Container sx={{ mb: 6 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Typography variant='boldtext'>Order</Typography>
                            <Box className="customBox" sx={{
                                backgroundColor: theme.palette.primary.lightGrey, ml: 2,
                                [theme.breakpoints.down('sm')]: {
                                    width: '57%',
                                }, width: "18%"
                            }}>
                                <CustomChip
                                    label="Active"
                                    bgcolor={activeTab === _tabs.Active ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={activeTab === _tabs.Active ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={handleStatusChange(_tabs.Active)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                                <CustomChip
                                    label="Past"
                                    bgcolor={activeTab === _tabs.Inactive ? theme.palette.primary.greenColor : theme.palette.primary.lightGrey}
                                    color={activeTab === _tabs.Inactive ? theme.palette.primary.contrastText : theme.palette.primary.Grey}
                                    onClick={handleStatusChange(_tabs.Inactive)}
                                    borderRadius={40}
                                    sx={{ fontSize: 14, padding: 20, margin: 'auto' }}
                                />
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Divider sx={{ my: 1, borderColor: theme.palette.primary.dividerColor }} />
                    </Grid>

                    <Grid item xs={12}>
                        {/* Listing */}
                        {
                            state?.rows?.map((orderDet) => <OrderCard
                                item={orderDet}
                                status={activeTab}
                                onView={handleView}
                                onPrimaryAction={() => handlePrimaryAction(orderDet)}
                                onSecondaryAction={() => handleSecondaryAction(orderDet)}
                            />)
                        }
                    </Grid>

                    {/* Pagination */}
                    <Grid item md={12} xs={12}>
                        <LoadMore
                            count={state.count}
                            page={pagination.page}
                            limit={pagination.limit}
                            onLoad={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))} />
                    </Grid>

                    {/* No Data */}
                    {state?.rows?.length === 0 && <NoData
                        svgImage={"/assets/icons/Group.svg"}
                        heading={'No order yet.'}
                        text={"You'll be able to see your order history here."}
                        btnText={"Start an order"}
                        onClick={handleStart}
                    />}
                </Grid>
            </Container>

            {/* Order details */}
            <CustomDialog open={model.name === _models.details} onClose={handleClose}>
                <OrderDetails item={model.data} />
            </CustomDialog>

            {/* rate order */}
            <CustomDialog heading={'Write a review'} open={model.name === _models.rateOrder} onClose={handleClose}>
                <ReviewOrder item={model.data} onAction={fetchOrders} />
            </CustomDialog>

            {/* getHelp */}
            {model.name === _models.getHelp && <GetHelp item={model.data} onClose={handleClose} />}

        </>
    )
}
