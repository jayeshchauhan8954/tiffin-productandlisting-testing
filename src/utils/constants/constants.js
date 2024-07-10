// Define Your App Constants
const _toastVariants = {
  Warn: 'warn',
  Error: 'error',
  Success: 'success'
};

const _status = {
  active: "Active",
  inactive: "Inactive"
}

const _UserType = {
  1: 'User',
  2: 'Seller',
  3: 'Admin',
}

const _uom = {
  Nos: "Nos",
  Oz: "Oz"
}


const _s3Directories = {
  product: "Products",
  events: "Events",
  items: "Items",
  complains: "Complains"
}

const _profileStatus = {
  0: 'Inactive',
  1: 'Active',
  2: 'Pending',
  3: 'Approved',
  4: 'Rejected',
  5: 'Document Pending'
}

const _productStatus = {
  Inactive: 'Inactive',
  Active: 'Active',
  Pending: 'Pending',
  Rejected: 'Rejected',
}
const _orderDetailStatus = {
  0: 'Pending',
  1: 'Active',
  2: 'Paused',
  3: 'Completed',
  4: 'Payment Pending'
}

const _orderDeliveryStatus = {
  0: 'Pending',
  1: 'On The Way',
  2: 'Delivered'
}

const _otpTypes = {
  email: "email",
  sms: "sms"
}

const _businessTypes = {
  td: "Sell on TiffinStash, Delivered by TiffinStash (TD)",
  vd: "Sell on TiffinStash, Self-Delivery (VD)",
  sd: "Sell on your own Channel, Delivered by TiffinStash Delivery Network Inc. (SD)"
}

const _legalPages = {
  termAndCondition: "termAndCondition",
  privacyPolicy: "privacyPolicy",
  deleteAccount: "deleteAccount",
}

const _type = {
  snacks: 'Snacks',
  tiffinStash: 'TiffinStash',
  events: 'Events'
}

const _availability = {
  0: "Not-Available",
  1: "Available"
}

const _subscription = {
  Trial: "Trial",
  Weekly: "Weekly",
  Monthly: "Monthly"
}

const _deliveryTimes = {
  Lunch: "Lunch",
  Dinner: "Dinner",
  Snacks: "Snacks"
}

const _paymentTypes = {
  online: 'Online',
  email: "Email",
  wallet: "Wallet"
}

export {
  _toastVariants,
  _status,
  _UserType,
  _profileStatus,
  _productStatus,
  _otpTypes,
  _businessTypes,
  _legalPages,
  _s3Directories,
  _uom,
  _type,
  _availability,
  _subscription,
  _deliveryTimes,
  _orderDetailStatus,
  _orderDeliveryStatus,
  _paymentTypes
}

