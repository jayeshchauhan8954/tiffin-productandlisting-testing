const getProductSellingPrice = (cp, targetMargin, deliveryCharges, processFee = 0) => {
    return parseFloat((((cp + deliveryCharges + processFee)) / (1 - targetMargin / 100)).toFixed(0)) || 0
}

const getExtrasSP = (cp, targetMargin, qty = 1) => {
    return parseFloat(((cp / (1 - targetMargin / 100)) * qty).toFixed(0)) || 0
}

export {
    getProductSellingPrice,
    getExtrasSP
}