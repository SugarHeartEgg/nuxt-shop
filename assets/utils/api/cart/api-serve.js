const GOODS_SERVICE = "/goods-service"

export const getCartCount = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${GOODS_SERVICE}/cart/cartCount`)
}

export const setAddCart = ({ $axios }, { ...payload }) => {
    return $axios.$post(`${GOODS_SERVICE}/cart/addOrUpdate`, {
        ...payload
    })
}

export const getCartList = ({ $axios }) => {
    return $axios.$get(`${GOODS_SERVICE}/cart/list`)
}


export const delCartShop = ({ $axios }, { ...payload }) => {
    return $axios.$post(`${GOODS_SERVICE}/cart/simpleDelete`, {
        ...payload
    })
}

