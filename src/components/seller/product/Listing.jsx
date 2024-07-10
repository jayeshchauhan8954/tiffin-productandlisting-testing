'use client';
import React, { useEffect, useState } from 'react'

import BreadCrumb from '@/components/Common/Breadcrumb'
import { Avatar, Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import AnalyticCard from '@/components/Common/AnalyticCard';
import CustomTable from '@/components/Common/CustomTable';

// Icons
import EditIcon from '@mui/icons-material/Edit';

import Pagination from '@/components/Common/Pagination';
import Label from '@/components/Common/Label';
import { _productStatus, _profileStatus, _status } from '@/utils/constants/constants';
import { useRouter } from 'next/navigation';
import { _routes } from '@/utils/endPoints/routes';
import { apiRequest } from '@/utils/config/apiRequest';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import CustomSearch from '@/components/Common/CustomSearch';
import moment from 'moment';
import { getS3Url } from '@/utils/helpers/fileHelper';


export default function Listing() {
    const router = useRouter()

    // Filters
    const [pagination, setPagination] = useState({ page: 1, limit: 20 })
    const [searchText, setSearchText] = useState('')

    const [load, setLoad] = useState(true)

    const [state, setState] = useState({
        rows: [],
        count: 0
    })
    const [countStats, setCountStats] = useState({})

    // Side effect
    useEffect(() => {
        fetchProduct()
    }, [pagination, searchText])

    useEffect(() => {
        fetchStatsCount();
    }, [])

    const fetchProduct = async () => {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.products.root,
        })
        if (status) {
            setState({
                ...state,
                rows: data?.rows,
                count: pagination == 1 ? data?.count : state?.count
            })
        }
    }


    const fetchStatsCount = async () => {
        let { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.products.statsCount
        })
        if (status) {
            let temp = {}
            if (Array.isArray(data?.stats)) {
                data?.stats?.forEach((item) => {
                    temp[item.status] = item.count
                })
            }
            setCountStats(temp)
        }
    }

    let columnsConfig = {
        col1: { title: '#', status: true, sx: { width: 20 }, getElement: (_, index) => index + 1, },
        col2: {
            title: 'Product', status: true, getElement: (item) =>
                <Stack direction={'row'} gap={1}
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Avatar src={getS3Url(item?.thumbNail)} alt={item?.name} />
                    <Typography variant='subtitle2'>{item?.name}</Typography>
                </Stack>
        },
        col5: { title: 'Status', status: true, sx: { width: 80 }, getElement: (item) => <Label type='productStatus' value={item?.status}>{item?.status}</Label> },
        col6: { title: 'created on', status: true, sx: { width: 80 }, getElement: (item) => moment(item?.createdAt).format("DD MMM, YYYY") },
        col7: {
            title: 'Actions', status: true, sx: { width: 80 }, getElement: (item) => <Stack direction={'row'}>
                <IconButton size='small' onClick={() => handleNavigation(item._id)}><EditIcon fontSize='small' /></IconButton>
            </Stack>
        }
    }

    const handleNavigation = (_id) => router.push(`${_routes.seller.products.list}/${_id}`)
    const handleAddProduct = () => router.push(`${_routes.seller.products.add}`)

    let links = [{
        name: "Products"
    }]

    // UI
    return (
        <React.Fragment>
            <BreadCrumb links={links}

                action={<Stack>
                    <Button variant='contained' size='small' onClick={handleAddProduct}>Add Product</Button>
                </Stack>}
            />

            {/* Header  */}
            <Grid container spacing={2} mb={2}>
                <Grid item md={2.5} xs={6}><AnalyticCard count={countStats[_productStatus.Inactive] || 0} version={5} title='Inactive' /></Grid>
                <Grid item md={2.5} xs={6}><AnalyticCard count={countStats[_productStatus.Active] || 0} version={3} title='Active' /></Grid>
                <Grid item md={2.5} xs={6}><AnalyticCard count={countStats[_productStatus.Pending] || 0} version={1} title='Pending' /></Grid>
                <Grid item md={2.5} xs={6}><AnalyticCard count={countStats[_productStatus.Rejected] || 0} version={2} title='Rejected' /></Grid>
            </Grid>

            <CustomSearch cb={(text) => setSearchText(text)} />
            <CustomTable
                data={state.rows}
                columns={columnsConfig}
                isLoading={false}
            />
            <Pagination
                count={state.count}
                rowsPerPage={pagination.limit}
                page={pagination.page}
                onPageChange={(page) => setPagination({ ...pagination, page: page + 1 })}
                onRowsPerPageChange={(page, limit) => setPagination({ ...pagination, page: 1, limit })}
            />
        </React.Fragment>
    )
}
