import axios from 'axios'
import Qs from 'qs'
import { baseUrl, baseUrl2 } from '../config'

function fetch(url, params, isOa) {
    var baseurl = baseUrl
    if (isOa) {
        baseurl = baseUrl2
    }
    return new Promise((resolve, reject) => {
        // params
        axios.post(baseurl + url, Qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function (response) {
            resolve(response.data)
            console.log(res.data)
        }).catch(function (error) {
            reject(error)
            // console.log("失败")
        })
    })
}
export const getAd = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/home/ad', { params })
}
export const getUser = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/user/login', { params })
}
export const getUserinfo = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/user/userCenter', { params })
}
export const getMoney = (params) => {
    params = JSON.stringify(params)
    return fetch('jrcs/user/xb', { params })
}
export const getAgency = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/user/dljj', { params })
}
export const getSet = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/user/sz', { params })
}

export const product = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/loan/product', { params })
}
export const checkMoney = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/xb/validate', { params })
}
export const queryMoney = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/xb/left', { params })
}
export const productDetail = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/loan/productList', { params })
}
export const cateAndPro = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/loan/cateAndPro', { params })
}
export const typeProduct = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/loan/Products', { params })
}
export const changePwd = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/user/changePwd', { params })
}
export const customerList = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/customer/list', { params })
}
export const customerInfo = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/customer/detail', { params })
}
/**
 * 获取总费用
 * @param {*} params 
 */
export const getFee = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/order/calculate', { params })
}
export const grabCustomer = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/customer/grabCustomer', { params })
}
export const getTanjiReport = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/tianJi/reportData', { params })
}
export const crawReport = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/report/you', { params })
}
export const getReport = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/report/query', { params })
}
export const grabRecord = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/customer/qdList', { params })
}
export const getReportState = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/report/getState', { params })
}
export const getDetails = (params) => {
    params = JSON.stringify(params)
    return fetch('jrcs/report/details', { params })
}
/**
 * 获取用户填写模板
 * @param {*} params 
 */
export const getInfoTemple = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/application/data', { params })
}
/**
 * 更新打卡
 * @param {*} params 
 */
export const oaUpdateTime = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/work/update', { params }, true)
}
export const oaQuery = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/dept/query', { params }, true)
}
export const oaQueryCompany = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/user/byc', { params }, true)
}
export const oaQueryDept = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/user/byd', { params }, true)
}
export const oaAddDepartment = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/dept/save', { params }, true)
}
export const oaAddStaff = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/user/save', { params }, true)
}
export const oaLeave = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/leave/apply', { params }, true)
}
export const oaWaitQuery = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/flow/query', { params }, true)
}
export const oaOut = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/out/apply', { params }, true)
}
export const oaOvertimeWork = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/over/apply', { params }, true)
}
export const oaDayly = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/daily/apply', { params }, true)
}
export const oaAlready = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/flow/done', { params }, true)
}
export const oaMonthly = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/monthly/apply', { params }, true)
}
export const oaWeekly = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/weekly/apply', { params }, true)
}
export const oaPerformence = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/ache/apply', { params }, true)
}
export const oaSignIn = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/sign/save', { params }, true)
}
/**
 * 获取公司详细信息
 * @param {*} params 
 */
export const oaGetCompany = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/dept/company', { params }, true)
}
export const oaTrack = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/sign/query', { params }, true)
}
export const oaFlowInfo = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/flow/info', { params }, true)
}
export const oaAttendanceInfo = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/work/info', { params }, true)
}
export const oaAuditHistory = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/flow/history', { params }, true)
}
export const oaAttendanceSign = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/work/save', { params }, true)
}
export const oaAuditSuggestion = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/flow/approve', { params }, true)
}
export const oaAttendance = (params) => {
    params = JSON.stringify(params)
    return fetch('oa/work/rec', { params }, true)
}
/**
 * 智能报表
 */
export const oaIReport = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/report/iReport', { params }, true)
}
/**
 * 考勤组设置和修改
 * @param {object} params //设置资料 
 */
export const oaAttendSetting = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/group/save', { params }, true)
}
/**
 * 查询公司所有考勤组
 * @param {object} params //公司id
 */
export const oaAttendanceGroupQuery = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/group/query', { params }, true)
}
/**
 * 删除考勤组
 * @param {object} params //groupId
 */
export const oaAttendanceGroupDel = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/group/del', { params }, true)
}
/**
 * 考勤组详细信息
 * @param {object} params //groupId
 */
export const oaAttendanceGroupInfo = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/group/info', { params }, true)
}
/**
 * 根据公司Id查询所有用户
 * @param {object} params //companyId
 */
export const getMembers = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/user/byc2', { params }, true)
}
/**
 * 根据输入名模糊查询
 * @param {object} params //userName,companyId
 */
export const oaSearchUser = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/user/search', { params }, true)
}
/**
 * 用户所在考勤组
 * @param {*} params 
 */
export const oaGroupCheck = (params) => {
    params = JSON.stringify(params)
    return fetch('/oa/group/check', { params }, true)
}
export const oaFcgqInfo = (params) => {
    params = JSON.stringify(params)
    return fetch('jrcs/third/addOrder', { params })
}
export const creditHistory = (params) => {
    params = JSON.stringify(params)
    return fetch('/jrcs/report/queryHistory', { params })
}