import * as Yup from 'yup'

export const _userNameSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter firt name").max(25),
    lastName: Yup.string().optional("Please enter last name"),
    dialCode: Yup.string().required("Please select dial code").max(5),
    phone: Yup.string().required("Please enter mobile no"),
    email: Yup.string().required("Please enter valid email."),
})

export const _passwordSchema = Yup.object().shape({
    oldPassword: Yup
        .string()
        .required('Please enter your old password.')
        .min(8, 'Your password is too short.'),
    newPassword: Yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Your password is too short.'),
    confirmPassword: Yup
        .string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.')
})

