import * as Yup from 'yup'

export const _complainSchema = Yup.object().shape({
    description: Yup.string().required("Please enter description"),
    categoryId: Yup.string().required("Please select category"),
    issueType: Yup.string().required("Please select issue type."),
})