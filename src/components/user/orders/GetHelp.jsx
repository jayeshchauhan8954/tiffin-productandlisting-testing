import CustomDialog from '@/components/Common/CustomDialog'
import { apiRequest } from '@/utils/config/apiRequest'
import { _s3Directories } from '@/utils/constants/constants'
import { _apiUrls } from '@/utils/endPoints/apiUrls'
import { fileUploadToS3 } from '@/utils/helpers/fileHelper'
import { LoadingButton } from '@mui/lab'
import { Button, FormHelperText, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { _complainSchema } from './validationSchema'

const _model = {
    complain: "Complain",
    inquiryOrComplain: "InquiryOrComplain"
}

export default function GetHelp({ item, onClose }) {
    const [model, setModel] = useState({ name: _model.inquiryOrComplain })

    const handleInquiry = () => { }

    // Helpers
    const handleModelOpen = (name) => setModel({ ...model, name })
    const handleClose = () => setModel({ ...model, name: '' })

    return (
        <>
            <CustomDialog open={model.name === _model.inquiryOrComplain} onClose={onClose}>
                <Stack gap={2}>
                    <Button fullWidth variant='contained' sx={{ height: 53 }} onClick={handleInquiry}>Inquiry</Button>
                    <Button fullWidth variant='contained' sx={{ height: 53 }} onClick={() => handleModelOpen(_model.complain)}>Complain</Button>
                </Stack>
            </CustomDialog>

            {/* Complain */}
            <CustomDialog heading={"Create a complain"} open={model.name === _model.complain} onClose={onClose}>
                <CreateComplain orderDetailId={item?.orderDetails?._id} onClose={onClose} />
            </CustomDialog>
        </>
    )
}

const issueTypes = [
    { id: 1, label: 'Delivery' },
    { id: 2, label: 'Food Item' },
];

const CreateComplain = ({ orderDetailId, onClose = () => { } }) => {
    const theme = useTheme()

    const [category, setCategory] = useState([])
    const [load, setLoad] = useState(false)

    // Formil
    let initialValues = {
        description: '',
        categoryId: null,
        issueType: null,
        attachments: null
    }

    const { values, handleChange, touched, errors, handleSubmit } = useFormik({
        initialValues,
        validationSchema: _complainSchema,
        onSubmit: () => createTicket()
    })

    useEffect(() => {
        values.issueType && fetchCategory();
    }, [values.issueType])

    const fetchCategory = async () => {
        const { data, status } = await apiRequest({
            endUrl: _apiUrls.user.ticketCategory,
            method: "GET",
            query: { ticketType: values.issueType }
        })
        if (status) {
            setCategory(data?.rows || [])
        }
    }

    const createTicket = async () => {
        setLoad(true)
        const reqData = {
            categoryId: values.categoryId,
            description: values?.description,
            orderDetailsId: orderDetailId,
            issueType: values.issueType,
            attachments: (await fileUploadToS3([values.attachments], _s3Directories.complains))?.[0],
        }
        const { status, message } = await apiRequest({
            endUrl: _apiUrls.user.ticket,
            method: "POST",
            body: reqData,
            showMsg: true
        })

        setLoad(false)
        if (status) {
            onClose()
        }
    }
    return (<>
        <Typography variant='heading3' color={theme.palette.primary.blackColor}>Issue Type</Typography>
        <Select
            name="issueType"
            fullWidth
            labelId="demo-simple-select-label"
            onChange={handleChange}
            sx={{
                ...useStyles.selectFeild,
                backgroundColor: theme.palette.primary.primaryGray5,
                pl: 1
            }}>
            {
                Object.values(issueTypes)?.map(option => <MenuItem key={option.id} value={option?.label}>{option?.label}</MenuItem>)
            }
        </Select>
        {Boolean(touched.issueType && errors.issueType) && <FormHelperText style={{ paddingHorizontal: 0, paddingVertical: 0 }} type="error" visible={true}>{touched.issueType && errors.issueType}</FormHelperText>}

        <Typography variant='heading3' color={theme.palette.primary.blackColor} mt={2}>Category</Typography>
        <Select
            name="categoryId"
            fullWidth
            onChange={handleChange}
            sx={{
                ...useStyles.selectFeild,
                backgroundColor: theme.palette.primary.primaryGray5,
                pl: 1,
            }}>
            {
                category?.map(option => <MenuItem key={option?._id} value={option?._id}>{option?.title}</MenuItem>)
            }
        </Select>
        {Boolean(touched.categoryId && errors.categoryId) && <FormHelperText style={{ paddingHorizontal: 0, paddingVertical: 0 }} type="error" visible={true}>{touched.categoryId && errors.categoryId}</FormHelperText>}


        <Typography variant='heading3' color={theme.palette.primary.blackColor}>Add Issue</Typography>
        <TextField
            multiline
            fullWidth
            name="description"
            placeholder='Add Description'
            rows={5}
            onChange={handleChange}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
        />

        <LoadingButton
            loading={load}
            fullWidth
            onClick={handleSubmit}
            variant='contained' sx={{ height: 53, mt: 2 }}>
            Submit</LoadingButton>
    </>)
}


// Styles
const useStyles = {
    selectFeild: {
        borderRadius: 1,
        marginTop: "10px",
    }
}