import * as Yup from 'yup'

export const _signupSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Please enter email"),
    firstName: Yup.string().required("Please enter first name").max(50),
    lastName: Yup.string().optional("Please enter last name"),
    phone: Yup.string().required("Please enter phone").max(12,"Phone must be at most 12 digits"),
    dialCode: Yup.string().required("Please select country code"),
    password: Yup.string().required("Please enter password").min(6, "Password should be atleast 6 characters."),
})

export const _loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter email"),
    password: Yup.string().required("Please enter password").min(6, "Password should be atleast 6 characters."),
})