import { LoadingButton } from "@mui/lab";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { _apiUrls } from '@/utils/endPoints/apiUrls';
import { apiRequest } from "@/utils/config/apiRequest";
import { _availability, _s3Directories, _type, _uom } from "@/utils/constants/constants";
import { getNumbersOnly } from "@/utils/helpers/appHelpers";
import CustomSelectFile from "@/components/Common/CustomSelectFile";
import { fileUploadToS3 } from "@/utils/helpers/fileHelper";
import { _addItemsValSchema } from "../ValidationSchema";

export default function AddEditItems({ data, onAction }) {
    const [load, setLoad] = useState(false)
    // Assign formik initial values
    let initialValues = {
        name: data?.name,
        uom: data?.uom || '',
        qty: data?.qty || 0,
        seller: data?.userId || null,
        unitPrice: data?.unitPrice || '',
        availability: data?.availability || '',
        type: data?.type || '',
        targetMargin: data?.targetMargin || '',
        imageUrl: data?.imageUrl || ''
    }

    // formik
    const { values, touched, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: _addItemsValSchema,
        onSubmit: handleAddItems
    })
    // Handle api's
    async function handleAddItems() {
        console.log((await fileUploadToS3([values.imageUrl], _s3Directories.items)));
        setLoad(true)
        let payload = {
            ...(data?._id && { id: data?._id }),
            sellerId: values?.seller?._id,
            name: values?.name,
            uom: values?.uom,
            unitPrice: values?.unitPrice,
            availability: values.availability,
            type: values?.type,
            targetMargin: values.targetMargin,
            imageUrl: (await fileUploadToS3([values.imageUrl], _s3Directories.items))?.[0],
        }
        let { status } = await apiRequest({
            method: data?._id ? "PUT" : "POST",
            endUrl: _apiUrls.masters.items.addEditItems,
            body: payload,
            showMsg: true
        });
        setLoad(false);
        status && onAction()
    }

    const handleThumbnail = (files) => setFieldValue('imageUrl', files)

    return (
        <Grid container spacing={2} >
            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2' required> Name</Typography>
                <TextField
                    name="name"
                    fullWidth
                    size="small"
                    placeholder="ie. Roti"
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2'> Quantity</Typography>
                <TextField
                    name="qty"
                    fullWidth
                    size="small"
                    placeholder="ie. 12"
                    value={values.qty}
                    error={Boolean(touched.qty && errors.qty)}
                    helperText={touched.qty && errors.qty}
                    onChange={handleChange}
                    type="number"
                />
            </Grid>

            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2' required> Uom</Typography>
                <Select
                    name="uom"
                    fullWidth
                    displayEmpty
                    size="small"
                    value={values.uom}
                    onChange={handleChange}
                >
                    <MenuItem value={""} disabled>{"---Select---"}</MenuItem>
                    {Object.values(_uom)?.map((uom) => <MenuItem value={uom} key={uom}> {uom} </MenuItem>)}
                </Select>
            </Grid>

            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2' required> Unit Price</Typography>
                <TextField
                    name="unitPrice"
                    fullWidth
                    size="small"
                    placeholder="ie. 12"
                    value={values.unitPrice}
                    error={Boolean(touched.unitPrice && errors.unitPrice)}
                    helperText={touched.unitPrice && errors.unitPrice}
                    onChange={handleChange}
                    type="number"
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2' > Type</Typography>
                <Select
                    name="type"
                    fullWidth
                    displayEmpty
                    size="small"
                    value={values.type}
                    onChange={handleChange}
                >
                    <MenuItem value={""} disabled>{"---Select---"}</MenuItem>
                    {Object.entries(_type)?.map(([key, value]) => <MenuItem value={value} key={key}> {value} </MenuItem>)}
                </Select>
            </Grid>
            <Grid item md={6} xs={12}>
                <Typography variant='subtitle2'> Target Margin(%)</Typography>
                <TextField
                    name="targetMargin"
                    fullWidth
                    size="small"
                    placeholder="ie. 10%"
                    value={values.targetMargin}
                    error={Boolean(touched.targetMargin && errors.targetMargin)}
                    helperText={touched.targetMargin && errors.targetMargin}
                    onChange={handleChange}
                    onInput={(e) => getNumbersOnly({ e, max: 100 })}
                    type="number"
                />
            </Grid>
            {data?._id && <Grid item md={6} xs={12}>
                <Typography variant='subtitle2' required> Availability</Typography>
                <Select
                    name="availability"
                    fullWidth
                    displayEmpty
                    size="small"
                    value={values.availability}
                    onChange={handleChange}
                >
                    <MenuItem value={""} disabled>{"---Select---"}</MenuItem>
                    {Object.entries(_availability)?.map(([key, value]) => <MenuItem value={key} key={key} > {value} </MenuItem>)}
                </Select>
            </Grid>}
            <Grid item md={4} xs={12}>
                <Typography variant='subtitle2'>Thumbnail</Typography>
                <CustomSelectFile
                    id="thumbnail"
                    title={"Thumbnail (Jpeg,png,jpg)"}
                    onChange={handleThumbnail}
                    files={values.imageUrl}
                />
            </Grid>

            <Grid item md={12} xl={12} display={"flex"} justifyContent={"center"}>
                <LoadingButton
                    sx={{ minWidth: 150 }}
                    loading={load} type='button'
                    variant="contained"
                    onClick={handleSubmit}>
                    {data?._id ? "Save" : "Add"}
                </LoadingButton>
            </Grid>
        </Grid>
    );
}