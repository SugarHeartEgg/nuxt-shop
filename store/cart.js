import { getCartCount } from '~/assets/utils/api/cart/api-serve'

export const state = () => ({
    cartNum: 0
})

export const mutations = {
    setResponse(state, payload) {
        state.cartNum = payload.response.cartCount
    }
}

export const actions = {
    async getCartNum({ commit }, { ...payload }) {
        const response = await getCartCount({ ...payload })
        commit({
            type: 'setResponse',
            response
        })
    }
}

export const getters = {}
