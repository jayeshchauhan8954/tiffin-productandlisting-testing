import React, { useEffect, useState } from 'react'
// componet
import Label from '@/components/Common/Label';
import BreadCrumb from '@/components/Common/Breadcrumb'
import Pagination from '@/components/Common/Pagination';
import CustomTable from '@/components/Common/CustomTable';
import AnalyticCard from '@/components/Common/AnalyticCard';
import CustomSearch from '@/components/Common/CustomSearch';
// mui
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Collapse, Grid, IconButton, MenuItem, Select, Stack } from '@mui/material';
// utils
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { apiRequest } from '@/utils/config/apiRequest';
import { showMessage } from '@/utils/helpers/toastHelpers';
import { fDate, fDateTime } from '@/utils/helpers/timeHelpers';
import { _orderDeliveryStatus, _orderDetailStatus, _profileStatus, _toastVariants } from '@/utils/constants/constants';

// --------------------------------------------------------------------------------------------------------------------------------------

const Orders = () => {
    const [orders, setOrders] = useState({
        rows: [],
        count: 0,
    })
    const [load, setLoad] = useState(false);

    // filters
    const [pagination, setPagination] = useState({ page: 1, limit: 20 })
    const [searchText, setSearchText] = useState('')
    const [filter, setFilter] = useState({})
    const [activeIndex, setActiveIndex] = useState(-1)
    const [dashboard, setDashboard] = useState({})
    const [delivery, setDelivery] = useState({ rows: [], count: 0 })
    const handleCollape = (index) => setActiveIndex(index === activeIndex ? null : index)

    // Get Orders
    async function fetchOrders() {
        try {
            const { data, status } = await apiRequest({
                endUrl: _apiUrls.masters.orders.list,
            })
            if (status) {
                let ordersList = []
                data?.rows?.forEach(order => {
                    order?.orderDetails?.forEach(ordDet => {
                        ordersList.push({
                            _id: order?._id,
                            orderNo: order?.orderNo,
                            orderDetails: ordDet
                        })
                    })
                })
                setOrders({ ...orders, rows: ordersList })
                setDashboard(data?.countByStatus)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Get Deliveries
    async function fetchDeliveries(id) {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.orders.deliveries.list,
            params: { id }
        })
        if (status) {
            setDelivery({ ...delivery, ...data })
        }
    }

    async function handleStatusChange(newValue, item, deliveryIndex) {
        try {
            if (delivery && delivery.rows) {
                const payload = { id: item._id, orderDetailsId: item?.orderDetailsId?._id, status: newValue }
                const { status } = await apiRequest({
                    endUrl: _apiUrls.masters.orders.deliveries.upadteDeliveryStatus,
                    body: payload,
                    method: 'PUT',
                    showMsg: true
                })
                if (status) {
                    let tmpDelivery = [...delivery.rows]
                    tmpDelivery[deliveryIndex].status = newValue
                    setDelivery({ ...delivery, rows: tmpDelivery })
                }
            }
        }
        catch (error) {
            showMessage({ variant: _toastVariants.Error, message: error.message });
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [pagination, searchText, filter])

    let columnsConfig = {
        col1: { title: 'Order No', status: true, sx: { width: 20 }, getElement: (item) => `#${item?.orderNo} ${item?.orderDetails?.status}` },
        col2: { title: 'Product', status: true, sx: { width: 20 }, getElement: (item) => `${item?.orderDetails?.productDetails?.name}` },
        col3: { title: 'Plan', status: true, getElement: (item) => `${item?.orderDetails?.itemInfo?.mealPlan?.name}` },
        col4: { title: 'Variant', status: true, getElement: (item) => `${item?.orderDetails?.itemInfo?.mealType?.name}` },
        col5: { title: 'Delivery Date', status: true, getElement: (item) => `${fDate(item?.orderDetails?.nextDelivery?.deliveryDate)}` },
        col6: { title: 'Total Amount', status: true, getElement: (item) => `$${item?.orderDetails?.netAmount}` },
        col7: { title: 'Status', status: true, getElement: (item) => <Label type='orderStatus' value={_orderDetailStatus[parseInt(item?.orderDetails?.status)]}>{_orderDetailStatus[parseInt(item?.orderDetails?.status)]}</Label> },
        col8: {
            title: 'View', status: true, getElement: (item, i) => <IconButton onClick={() => {
                handleCollape(i)
                fetchDeliveries(item?.orderDetails?._id)
            }}>
                <ArrowDownwardIcon />
            </IconButton>
        }
    }
    let nestedColumn = {
        col1: { title: 'Delivery Date', status: true, sx: { width: 20 }, getElement: (item) => `${fDateTime(item?.deliveryDate)}` },
        col2: {
            title: 'Status', status: true, sx: { width: 20 }, getElement: (item, i) => (
                <StatusHandler value={item.status} item={item} onChange={(newValue, item) => handleStatusChange(newValue, item, i)} />
            )
        },
    }
    const nestedRowConfig = {
        colSpan: 8,
        getElement: (item, i) =>
            delivery?.rows &&
            <Box>
                <Collapse in={i === activeIndex}>
                    <CustomTable
                        data={delivery?.rows}
                        columns={nestedColumn}
                        isLoading={false}
                    />
                </Collapse>
            </Box>

    }
    let links = [{
        name: "Orders"
    }]

    return (
        <React.Fragment>
            <BreadCrumb links={links} />

            {/* Header  */}
            <Grid container spacing={2} mb={2}>
                <Grid item md={2.5} xs={6}><AnalyticCard count={dashboard?.Completed || 0} version={3} title='Completed' /></Grid>
                <Grid item md={2.5} xs={6}><AnalyticCard count={dashboard?.Active || 0} version={2} title='Active' /></Grid>
                <Grid item md={2.5} xs={6}><AnalyticCard count={dashboard?.Pending || 0} version={1} title='Pending' /></Grid>
                <Grid item md={2.5} xs={6}><AnalyticCard count={dashboard?.Paused || 0} version={5} title='Paused' /></Grid>
            </Grid>
            <Stack spacing={1} direction={'row'} display={'flex'} justifyContent={'space-between'}>

                <CustomSearch cb={(text) => setSearchText(text)} />

            </Stack>

            <CustomTable
                nestedRow={nestedRowConfig}
                data={orders.rows}
                columns={columnsConfig}
                isLoading={false}
            />
            <Pagination
                count={orders.count}
                rowsPerPage={pagination.limit}
                page={pagination.page}
                onPageChange={(page) => setPagination({ ...pagination, page: page + 1 })}
                onRowsPerPageChange={(page, limit) => setPagination({ ...pagination, page: 1, limit })}
            />
        </React.Fragment>
    )
}

export default Orders


//=========================================================================================================================================

const StatusHandler = ({ value, item, onChange }) => {
    return (
        <Select
            fullWidth
            size="small"
            value={value}
            disableUnderline
            variant="standard"
            onClick={(e) => { e.stopPropagation(); }}
            onChange={(e) => onChange(e.target.value, item)}
            renderValue={(value) => (
                <Label type='orderStatus' color={'success'} value={_orderDeliveryStatus[value]}>
                    {_orderDeliveryStatus[value]} <ArrowDropDownIcon />
                </Label>
            )}
            inputProps={{ IconComponent: () => null }}
        >
            {Object.entries(_orderDeliveryStatus).map((item) => {
                const [key, value] = item;
                return (
                    <MenuItem value={key} key={value} sx={{ textTransform: 'capitalize' }}>
                        {value}
                    </MenuItem>
                );
            })}
        </Select>
    )
}