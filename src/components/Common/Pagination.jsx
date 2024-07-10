import { TablePagination } from '@mui/material'
import React from 'react'

export default function Pagination({ page, rowsPerPage, count = 0, onRowsPerPageChange = () => { }, onPageChange = () => { }, sx, ...other }) {

    if (!count || count === 0 || count <5) return null;
    return (
        <TablePagination
            sx={sx}
            {...other}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page-1}
            onPageChange={(e, page) => {
              onPageChange(page, rowsPerPage)
            }}
            onRowsPerPageChange={({ target }) => {
                onRowsPerPageChange(1, parseInt(target.value, 10))
            }}
        />
    )
}
