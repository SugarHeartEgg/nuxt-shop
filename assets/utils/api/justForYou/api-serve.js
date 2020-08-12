const GOOD_SERVICE = "/goods-service"

export const getJustFouYou = ({ $axios }, { ...payload }) => {
    return $axios.$get(`${GOOD_SERVICE}/home/justForYou?size=${payload.size}`)
}