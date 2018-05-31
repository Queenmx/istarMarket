let baseUrl,
    baseUrl2 = "";
let routerMode = "history";
let imgBaseUrl = "http://images.cangdu.org/";
const KEY = "ZND20171030APIMM";
if (process.env.NODE_ENV === "development") {
    baseUrl = "http://wuhanxingrong.vicp.io:8887/";
    // baseUrl = 'http://wuhanxingrong.vicp.io:18887/'
    baseUrl2 = "http://wuhanxingrong.vicp.io:8185/";
    // baseUrl = 'http://192.168.0.31:8185/'
    // baseUrl2 = 'http://192.168.0.31:8185/'
    // baseUrl = 'http://192.168.0.42:8887/'
    // baseUrl2 = 'http://192.168.0.42:8887/'
    // baseUrl = '192.168.0.42:8887/'//金融超市地址
    // baseUrl2 = ''//OA地址
    // baseUrl = 'http://tdx.free.ngrok.cc/zndai/'
    // baseUrl = '/zndai/'
} else if (process.env.NODE_ENV === "production") {
    baseUrl = "http://fsapi.starjrcs.com:8887/";
    baseUrl2 = "http://marketoa.istarcredit.com:8185/"; //正式地址
    // baseUrl = 'http://wuhanxingrong.vicp.io:8887/'
    // baseUrl2 = 'http://wuhanxingrong.vicp.io:8185/'//测试地址
}
export { baseUrl, baseUrl2, routerMode, imgBaseUrl, KEY };
