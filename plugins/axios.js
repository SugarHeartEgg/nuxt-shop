import qs from "qs";
import { Toast } from 'vant';


export default ({ $axios, app, redirect }, inject) => {
    // 基本配置
    $axios.setBaseURL('http://192.168.103.121:8083/')
    $axios.defaults.timeout = 15000;
    $axios.defaults.withCredentials = true;
    $axios.setHeader('Content-Type', 'application/json', ['post'])

    // $axios.defaults.transformRequest = [(data) => {
    //     data = qs.parse(data)
    //     console.log(data);
    //     return data
    // }]

    // console.log($axios.defaults.baseURL);
    // console.log(app.$cookies);
    // console.log(app.$cookies.get('token'))  // 每次请求获取cooie

    $axios.onRequest(config => {
        // 获取cookie放在头部传到后端
        // token 存在 再创建 Authorization , 否则传了会报错
        if (app.$cookies.get('token')) {
            config.headers.Authorization = app.$cookies.get('token')
        }
        config.data = qs.parse(config.data, {
            // default:  'a[b][c]=d&a[b][e]=f'
            // now:      'a.b.c=d&a.b.e=f'

            // Option allowDots can be used to enable dot notation
            // Doc: https://www.npmjs.com/package/qs
            allowDots: true
        });
        return config;
    });

    $axios.onResponse(response => {
        const candeeHttpCode = response.data.code
        const httpStatus = response.status

        return new Promise((resolve, reject) => {
            if (candeeHttpCode === 200 && httpStatus === 200) {
                return resolve(response.data)
            } else {
                switch (candeeHttpCode) {
                    case 500:
                        return resolve(response)
                    // Toast('Server Error')
                    case 501:
                        Toast('Request parameter error')
                        return;
                    case 502:
                        redirect(app.localeRoute({ name: 'mine-login' }))
                        return;
                    case 503:
                        return resolve(response)
                    // Toast('Permission denied')
                    case 505:
                        Toast('account or password incorrect')
                        return;
                    case 506:
                        Toast('User does not exist')
                        return;
                    default:
                        reject(response.data.message)
                        return;
                }
            }
        })

    });

    $axios.onError(error => {
        return Promise.reject(error);
    });
}