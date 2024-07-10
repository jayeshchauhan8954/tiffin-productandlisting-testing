import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ImageList from './ImageList'

import FilePresentIcon from '@mui/icons-material/FilePresent';

export default function CustomSelectFile({ id = "", title, files, multiple = false, accept = "image/*", onChange = () => { } }) {
    const [selectedFile, setSelectedFile] = useState(multiple ? (files || []) : (files || ''))

    useEffect(() => {
        setSelectedFile(files)
    }, [files])

    // helpers
    const handleSelect = (e) => {
        const { files } = e.target;
        if (!files || files.length === 0) {
            return;
        }
        setSelectedFile(multiple ? [...selectedFile, ...files] : files[0])
        onChange(multiple ? [...selectedFile, ...files] : files[0])
    }

    const handleDelete = (index) => {
        if (multiple) {
            let files = [...selectedFile]
            files.splice(index, 1);
            setSelectedFile([...files])
            onChange([...files])
        } else {
            setSelectedFile('')
            onChange('')
        }

    }



    return (
        <Box>

            {
                (multiple ? selectedFile?.length === 0 : !selectedFile) && <Button
                    component="label"
                    htmlFor={id}
                    sx={{
                        width: '100%',
                        minHeight: 100,
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        minHeight: 100,
                        borderRadius: 1,
                        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2
                    }}>
                        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <FilePresentIcon fontSize='medium' />
                            <Typography textAlign={'center'} variant='caption'>{title}</Typography>
                        </Stack>
                    </Box>
                </Button>
            }

            <ImageList
                files={multiple ? selectedFile : [selectedFile]}
                showPreview
                showName
                onPreviewClick={(url) => window.open(url, '_blank')}
                onRemove={(_, i) => handleDelete(i)}
            />
            {multiple && selectedFile?.length > 0 && <Button sx={{ mt: 1 }} size='small' component="label" htmlFor={id} variant="text" > Add More </Button>}
            <TextField
                fullWidth
                sx={{ display: 'none' }}
                inputProps={{ multiple, id, accept }}
                type='file'
                size="small"
                variant="outlined"
                onChange={(e) => handleSelect(e)}
            />
        </Box >
    )
}
