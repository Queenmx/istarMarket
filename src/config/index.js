let baseUrl, baseUrl2 = ''
let routerMode = 'history'
let imgBaseUrl = 'http://images.cangdu.org/'
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://wuhanxingrong.vicp.io:18887/'
    baseUrl2 = 'http://wuhanxingrong.vicp.io:8185/'
    // baseUrl = '192.168.0.42:8887/'//金融超市地址
    // baseUrl2 = ''//OA地址
    // baseUrl = 'http://tdx.free.ngrok.cc/zndai/'
    // baseUrl = '/zndai/'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://fsapi.starjrcs.com:8887/'
    baseUrl2 = 'http://wuhanxingrong.vicp.io:8185/'
}
export {
    baseUrl,
    baseUrl2,
    routerMode,
    imgBaseUrl
}