export const getGoogsData = ({ $axios }, { ...payload }) => {
    return $axios.$get(`/goods-service/sku/skuDetail?goodsInfoId=${payload.goodsInfoId}`)
}
// 后端没做goodsInfoId非必选操作，这里多谢一次，主要是不想再调用函数中传空
export const getGoogsDatas = ({ $axios }, { ...payload }) => {
    return $axios.$get(`/goods-service/sku/skuDetail?goodsId=${payload.goodsId}&spec=${payload.spec}`)
}
