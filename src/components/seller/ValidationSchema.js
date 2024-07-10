import * as Yup from 'yup';

const _addCountryValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`),
    code: Yup.string().required(`Please enter code.`),
    dialCode: Yup.string().required(`Please enter Dial code`)
});

const _addCityValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`),
    code: Yup.string().required(`Please enter code.`),
    country: Yup.object().shape({
        _id: Yup.string().required(`Please select country.`),
    })
});

const _addCusineValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`),
});


const _addMealPlanValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`),
    days: Yup.string().required(`Please enter days.`),
});

const _addMealTypeValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`),
});

const _addDietaryValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`)
});

const _addDeliveryTimeValSchema = Yup.object().shape({
    name: Yup.string().required(`Please enter name.`),
    from: Yup.string().required(`Please select from time.`),
    to: Yup.string().required(`Please select to time.`),
});

const _addDeliveryChargesValSchema = Yup.object().shape({
    rate: Yup.number().min(1).required(`Please enter rate.`),
    city: Yup.object().shape({
        _id: Yup.string().required(`Please select city.`),
    })
});

const _addItemsValSchema = Yup.object().shape({
    // seller: Yup.number().required(`Please Select Seller`),
    name: Yup.string().required(`Please enter name`),
    uom: Yup.string().required(`Please select uom`),
    unitPrice: Yup.string().required(`Please select Unit Price`)
});

export {
    _addCountryValSchema,
    _addCityValSchema,
    _addCusineValSchema,
    _addMealPlanValSchema,
    _addMealTypeValSchema,
    _addDietaryValSchema,
    _addDeliveryTimeValSchema,
    _addDeliveryChargesValSchema,
    _addItemsValSchema
}
