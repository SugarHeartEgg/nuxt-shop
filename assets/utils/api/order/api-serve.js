const GOOD_SERVICE = "/goods-service"


export const getEnterData = ({ $axios }, { ...payload }) => {
    return $axios.$post(`${GOOD_SERVICE}/confirmOrder/go`, {
        ...payload
    })
}

export const setSubmitOreder = ({ $axios }, { ...payload }) => {
    return $axios.$post(`${GOOD_SERVICE}/confirmOrder/submit`, {
        ...payload
    })
}