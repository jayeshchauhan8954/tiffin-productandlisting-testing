import * as Yup from 'yup'

export const _onboardSchema = Yup.object().shape({
    businessName: Yup.string().required("Please enter business name"),
    email: Yup.string().email("Please enter valid email").required("Please enter email"),
    phone: Yup.string().required("Please enter phone").max(12,"Phone must be at most 12 digits"),
    dialCode: Yup.string().required("Please select country code"),
    businessModel: Yup.array().min(1,"Please select atleast one business model").required("Please select business model")
})
