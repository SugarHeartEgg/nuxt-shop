import Vue from 'vue';

/**
 * 自定义样式的倒计时组件,
 * 因vant组件原因，小时为个数时没有0，
 * 
 * 这里使用判断在前面加上0,如有更好的思路
 * 就放弃此写法
 * 
 * @param {number} initTime
 * @returns {number}
*/
Vue.filter('time-add', (e) => {
    if (e > 9) {
        return e
    } else {
        return `0${e}`
    }
})


/**
 * 对商品金额进行初始化，保留小数点后两位，或是添加小数点后两位
 * @param {String | number} initMoney
 * @returns {String | number}
 * 
*/
Vue.filter('money-init', (e) => {
    return (e || 0).toFixed(2)
})