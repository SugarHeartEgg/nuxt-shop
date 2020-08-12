
const CUSTOMER_CODE = '/customer-service'

export const getStateData = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${CUSTOMER_CODE}/stateCityPostcode/stateList`)
}

export const getCityData = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${CUSTOMER_CODE}/stateCityPostcode/cityList/${payload.provinceId}`)
}

export const getPostCodeData = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${CUSTOMER_CODE}/stateCityPostcode/postcodeList/${payload.cityId}`)
}

export const addOrEditAddress = ({ $axios }, { ...payload }) => {
    return $axios.$post(`${CUSTOMER_CODE}/address/addOrUpdate`, {
        ...payload
    })
}

export const getAddressLit = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${CUSTOMER_CODE}/address/list`)
}

export const updateDefault = ({ $axios }, { ...payload }) => {
    return $axios.$post(`${CUSTOMER_CODE}/address/updateDefault`, {
        ...payload
    })
}

export const getUserAddress = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${CUSTOMER_CODE}/address/getById/${payload.addressId}`)
}


