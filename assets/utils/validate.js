/**
 * 检验
 * 
 */


/**
 * @param {string} postal
 * @returns {Boolean}  邮编校验
 */
export function validPostal(postal) {
  const reg = /^[0-9]{5}$/
  return reg.test(postal)
}

/**
 * @param {Object} postal
 * @returns {Boolean}  手机校验
 */
export function validPhone(params) {
  if (params.phone.length == '11') {

    let _phone = `${params.countryNum + params.phone}`

    const reg = /^(\+?0?86\-?)?1[345789]\d{9}$/
    const reg2 = /^(\+?0?60\-?)?0[123456789]\d{9}$/

    return reg.test(_phone) || reg2.test(_phone)

  } else if (params.phone.length == '10') {

    let _phone = `${params.countryNum + params.phone}`
    const reg = /^(\+?0?60\-?)?01[0,2-4,6-9]\d{7}$/
    const reg2 = /^(\+?0?60\-?)?11\d{9}$/
    const reg3 = /^(\+?0?60\-?)?11\d{8}$/
    const reg4 = /^(\+?0?60\-?)?15\d{8}$/

    return reg.test(_phone) || reg2.test(_phone) || reg3.test(_phone) || reg4.test(_phone)

  } else if (params.phone.length == '9') {

    let _phone = `${params.countryNum + params.phone}`
    const reg = /^(\+?0?60\-?)?1[0,2-4,6-9]\d{7}$/

    return reg.test(_phone)

  } else {
    return false
  }
}

/**
 cod单页面手机校验
 */
export function validPhonetow(phone) {
  if (phone.length == '11') {
    const reg = /^(011|13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ // 中国
    const reg2 = /^011\d{8}$/
    return reg.test(phone) || reg2.test(phone)
  } else if (phone.length == '10') {
    const reg2 = /^11\d{8}$/
    const reg3 = /^15\d{8}$/
    return reg2.test(phone) || reg3.test(phone)
  } else if (phone.length == '9') {
    const reg = /^1[0,2-4,6-9]\d{7}$/
    const reg2 = /^01[0,2-4,6-9]\d{7}$/
    return reg.test(phone) || reg2.test(phone)
  } else {
    return false
  }
}



//   else if (params.phone.length == '9' || params.phone.length == '10') {
//     // const reg = /^(\+?0?60\-?){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/
//     const reg = /^(\+?0?60\-?)?1?01[123456789]\d{8,9}$/
//     let _phone = `${params.countryNum + params.phone}`
//     return reg.test(_phone)
//   } else {
//     return false
//   }
// }

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}


/**
 * @param {string} isNoValue 验证是否为空
 * @returns {Boolean}
 */
export function validNoValue(params) {
  const reg = /^\s*$/
  return reg.test(params)
}


/**
 * @param {string} userName 验证用户名称及其长度
 * @returns {Boolean}
 */
export function validUserName(params) {
  const reg = /^[\S\s]{3,30}$/
  return reg.test(params)
}


/**
 * @param {number} 秒转毫秒
 * @returns {number}
*/
export function validMillisecond(params) {
  return params * 1000
}




/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}