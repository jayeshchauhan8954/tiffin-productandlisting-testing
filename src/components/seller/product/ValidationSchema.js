import * as Yup from 'yup'

export const addEditProductValSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    description: Yup.string().required("Please enter description"),
    status: Yup.string().required("Please select status"),
    cusine: Yup.object().shape({
        _id: Yup.string().required("Please select cusine")
    }),
    dietary: Yup.object().shape({
        _id: Yup.string().required("Please select dietary")
    }).required("Please select dietary "),
    thumbNail: Yup.string().required("Please select thumbNail image"),
    deliveryTimes: Yup.array().min(1, "Please select delivery time").required("Please select delivery time"),
    availableCities: Yup.array().min(1, "Please select cities").required("Please select cities"),
    mealPlans: Yup.array().min(1, "Please select meal plan").required("Please select meal plan"),
})