import React, { useEffect, useState } from "react";
import BreadCrumb from '@/components/Common/Breadcrumb'
import CustomSearch from '@/components/Common/CustomSearch';
import { Button, IconButton, Stack } from "@mui/material";
import CustomTable from '@/components/Common/CustomTable';
import CustomModal from '@/components/Common/CustomModal';
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import Pagination from '@/components/Common/Pagination';
import { apiRequest } from '@/utils/config/apiRequest';
import { _routes } from '@/utils/endPoints/routes';
import { _status } from '@/utils/constants/constants';
import Label from "@/components/Common/Label";

// Icons
import { RemoveRedEye as EyeIcon } from '@mui/icons-material'
import AddEditItems from "./AddEditItems";

const _modelName = {
    add: "Add",
    edit: "Edit"
}
export default function Listing() {
    // Filters
    const [pagination, setPagination] = useState({ page: 1, limit: 25 })
    const [searchText, setSearchText] = useState('')

    const [load, setLoad] = useState(true)
    const [model, setModel] = useState({ name: "", data: {} })
    const [state, setState] = useState({
        rows: [],
        count: 0
    })

    // Side effect
    useEffect(() => {
        fetchItems()
    }, [pagination, searchText])


    let links = [{
        name: "Items"
    }];

    // Get the country list
    const fetchItems = async () => {
        handleModalClose()
        setLoad(true)
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.masters.items.getItems,
            query: { ...pagination, searchQ: searchText }
        })
        setLoad(false)
        if (status) {
            setState({
                ...state,
                rows: data?.rows,
                count: pagination.page == 1 ? data?.count : state?.count
            })
        }
    }

    // Define Columns
    let columnsConfig = {
        col1: { title: '#', status: true, sx: { width: 20 }, getElement: (_, index) => index + 1, },
        col2: { title: 'Name', status: true, sx: { width: 150 }, getElement: (item) => `${item?.name}` },
        col4: {
            title: 'Unit Price', status: true, getElement: (item) => `${item?.unitPrice || '...'}/${item?.uom || '...'}`
        },
        col5: { title: 'Status', status: true, sx: { width: 80 }, getElement: (item) => <Label value={item.status}>{item.status}</Label> },
        col6: {
            title: 'Actions', status: true, sx: { width: 80 }, getElement: (item) => <Stack direction={'row'}>
                <IconButton size='small' onClick={() => handleModalOpen(_modelName.edit, item)}><EyeIcon fontSize='small' /></IconButton>
            </Stack>
        }
    }

    // Handle model open close
    const handleModalOpen = (name, data = {}) => setModel({ ...model, name, data })
    const handleModalClose = () => setModel({ ...model, name: null, data: {} })

    return (
        <React.Fragment>
            <BreadCrumb links={links}
                action={<Stack>
                    <Button variant='contained' size='small' onClick={() => handleModalOpen(_modelName.add)}>Add Item</Button>
                </Stack>}
            />
            <CustomSearch cb={(text) => setSearchText(text)} />
            <CustomTable
                data={state.rows}
                columns={columnsConfig}
                isLoading={load}
            />
            <Pagination
                count={state.count}
                rowsPerPage={pagination.limit}
                page={pagination.page}
                onPageChange={(page) => setPagination({ ...pagination, page: page + 1 })}
                onRowsPerPageChange={(page, limit) => setPagination({ ...pagination, page: 1, limit })}
            />

            {/* Model: Add/Edit */}
            <CustomModal
                open={[_modelName.add, _modelName.edit]?.includes(model?.name)}
                title={model.name === _modelName.add ? `Add Items` : `Edit Items`}
                onClose={handleModalClose}>
                <AddEditItems data={model.data} onAction={fetchItems} />
            </CustomModal>
        </React.Fragment>
    );
}