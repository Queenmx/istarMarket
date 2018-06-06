import Vue from "vue";
import Router from "vue-router";
const index = resolve => require(["@/pages/index"], resolve);
const login = resolve => require(["@/pages/login"], resolve);
const product = resolve => require(["@/pages/home/product"], resolve);
const search = resolve => require(["@/pages/search"], resolve);
const user = resolve => require(["@/pages/user"], resolve);
const credit = resolve => require(["@/pages/search/credit"], resolve);
const creditAuthorize = resolve =>
  require(["@/pages/search/creditAuthorize"], resolve);
const oaSystem = resolve => require(["@/pages/oaSystem"], resolve);
const creditResult = resolve =>
  require(["@/pages/search/creditResult"], resolve);
const creditDetails = resolve =>
  require(["@/pages/search/creditDetails"], resolve);
const creditHistory = resolve =>
  require(["@/pages/search/creditHistory"], resolve);
const report = resolve => require(["@/pages/report"], resolve);
const smartWeekly = resolve => require(["@/pages/oa/smartWeekly"], resolve);
const reporter = resolve => require(["@/pages/reporter"], resolve);
const attendance = resolve => require(["@/pages/attendance"], resolve);
const attendanceStatistics = resolve =>
  require(["@/pages/attendanceStatistics"], resolve);
const lateRecord = resolve => require(["@/pages/lateRecord"], resolve);
const earlyRecord = resolve => require(["@/pages/earlyRecord"], resolve);
const lackRecord = resolve => require(["@/pages/lackRecord"], resolve);
const absentRecord = resolve => require(["@/pages/absentRecord"], resolve);
const outRecord = resolve => require(["@/pages/outRecord"], resolve);
const overtimeRecord = resolve => require(["@/pages/overtimeRecord"], resolve);
const attendanceDetail = resolve =>
  require(["@/pages/attendanceDetail"], resolve);
const clockDetail = resolve => require(["@/pages/clockDetail"], resolve);
const success = resolve => require(["@/pages/success"], resolve);
const fail = resolve => require(["@/pages/fail"], resolve);
const sign = resolve => require(["@/pages/oa/sign"], resolve);
const signIn = resolve => require(["@/pages/oa/signIn"], resolve);
const history = resolve => require(["@/pages/oa/history"], resolve);
const carInfo = resolve => require(["@/pages/home/carInfo"], resolve);
const cxdInfo = resolve => require(["@/pages/home/cxdInfo"], resolve);
const fcgqInfo = resolve => require(["@/pages/home/fcgqInfo"], resolve);
const interestedClient = resolve =>
  require(["@/pages/home/interestedClient"], resolve);
const clientInfo = resolve => require(["@/pages/home/clientInfo"], resolve);
const thirdApplyInfo = resolve =>
  require(["@/pages/home/thirdApplyInfo"], resolve);
const applyInfo = resolve => require(["@/pages/home/applyInfo"], resolve);
const orderRecord = resolve => require(["@/pages/home/orderRecord"], resolve);
const clientDetail = resolve => require(["@/pages/home/clientDetail"], resolve);
const broadcast = resolve => require(["@/pages/home/broadcast"], resolve);
const audit = resolve => require(["@/pages/oa/audit"], resolve);
const myAuditing = resolve => require(["@/pages/oa/myAuditing"], resolve);
const auditHistory = resolve => require(["@/pages/oa/auditHistory"], resolve);
const auditSuggestion = resolve =>
  require(["@/pages/oa/auditSuggestion"], resolve);
const attendanceCard = resolve =>
  require(["@/pages/oa/attendanceCard"], resolve);
const attendanceGroup = resolve =>
  require(["@/pages/oa/attendanceGroup"], resolve);
const addAttendanceGroup = resolve =>
  require(["@/pages/oa/addAttendanceGroup"], resolve);
const selectedApartment = resolve =>
  require(["@/pages/oa/selectedApartment"], resolve);
const unselectApartment = resolve =>
  require(["@/pages/oa/unselectApartment"], resolve);
const attendanceMember = resolve =>
  require(["@/pages/oa/attendanceMember"], resolve);
const attendanceLeader = resolve =>
  require(["@/pages/oa/attendanceLeader"], resolve);
const apartmentMember = resolve =>
  require(["@/pages/oa/apartmentMember"], resolve);
const attendanceApartment = resolve =>
  require(["@/pages/oa/attendanceApartment"], resolve);
const staffManagement = resolve =>
  require(["@/pages/oa/staffManagement"], resolve);
const addStaff = resolve => require(["@/pages/oa/addStaff"], resolve);
const addAddress = resolve => require(["@/pages/oa/addAddress"], resolve);
const caption = resolve => require(["@/pages/oa/caption"], resolve);
const leave = resolve => require(["@/pages/oa/leave"], resolve);
const out = resolve => require(["@/pages/oa/out"], resolve);
const overtimeWork = resolve => require(["@/pages/oa/overtimeWork"], resolve);
const dayly = resolve => require(["@/pages/oa/dayly"], resolve);
const monthly = resolve => require(["@/pages/oa/monthly"], resolve);
const week = resolve => require(["@/pages/oa/weekly"], resolve);
const addApartment = resolve => require(["@/pages/oa/addApartment"], resolve);
const selectApartment = resolve =>
  require(["@/pages/oa/selectApartment"], resolve);
const money = resolve => require(["@/pages/users/money"], resolve);
const changepwd = resolve => require(["@/pages/users/changepwd"], resolve);
const agency = resolve => require(["@/pages/users/agency"], resolve);
const myProduct = resolve => require(["@/pages/users/myProduct"], resolve);
const myService = resolve => require(["@/pages/users/myService"], resolve);
const set = resolve => require(["@/pages/users/set"], resolve);
const pay = resolve => require(["@/pages/users/pay"], resolve);
const confirmPay = resolve => require(["@/pages/users/confirmPay"], resolve);
const personnel = resolve => require(["@/pages/oa/personnel"], resolve);
const department = resolve => require(["@/pages/oa/department"], resolve);
const agencyProduct = resolve =>
  require(["@/pages/home/agencyProduct"], resolve);
const personList = resolve => require(["@/pages/oa/personList"], resolve);
const techDepartment = resolve =>
  require(["@/pages/oa/techDepartment"], resolve);
const serviceDepartment = resolve =>
  require(["@/pages/oa/serviceDepartment"], resolve);
const performence = resolve => require(["@/pages/oa/performence"], resolve);
const resetPassword = resolve => require(["@/pages/resetPassword"], resolve);
const selectApprover = resolve =>
  require(["@/pages/oa/selectApprover"], resolve);
const selectSendTo = resolve => require(["@/pages/oa/selectSendTo"], resolve);
const daylyselectApprover = resolve =>
  require(["@/pages/oa/daylyselectApprover"], resolve);
const daylyselectSendTo = resolve =>
  require(["@/pages/oa/daylyselectSendTo"], resolve);
const selectApproverOut = resolve =>
  require(["@/pages/oa/selectApproverOut"], resolve);
const selectSendToOut = resolve =>
  require(["@/pages/oa/selectSendToOut"], resolve);
const selectApproverOvertime = resolve =>
  require(["@/pages/oa/selectApproverOvertime"], resolve);
const selectSendToOvertime = resolve =>
  require(["@/pages/oa/selectSendToOvertime"], resolve);
const selectDepartmentPerson = resolve =>
  require(["@/pages/oa/selectDepartmentPerson"], resolve);
const personnelweekly = resolve =>
  require(["@/pages/oa/personnelweekly"], resolve);
const personnelmonthly = resolve =>
  require(["@/pages/oa/personnelmonthly"], resolve);
const departmentmonthly = resolve =>
  require(["@/pages/oa/departmentmonthly"], resolve);
const departmentweekly = resolve =>
  require(["@/pages/oa/departmentweekly"], resolve);
const personnelperformence = resolve =>
  require(["@/pages/oa/personnelperformence"], resolve);
const myAuditHistory = resolve =>
  require(["@/pages/oa/myAuditHistory"], resolve);
const auditDetail = resolve => require(["@/pages/oa/auditDetail"], resolve);
const departmentperformence = resolve =>
  require(["@/pages/oa/departmentperformence"], resolve);
const productList = resolve => require(["@/pages/home/productList"], resolve);
const attendanceCardSuccess = resolve =>
  require(["@/pages/oa/attendanceCardSuccess"], resolve);
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/resetPassword",
      component: resetPassword
    },
    {
      path: "/home/product",
      component: product,
      name: "product"
    },
    {
      path: "/search",
      component: search
    },
    {
      path: "/user",
      component: user
    },
    {
      path: "/oasystem",
      component: oaSystem
    },
    {
      path: "/success",
      component: success
    },
    {
      path: "/fail",
      component: fail
    },
    {
      path: "/search/credit",
      component: credit
    },
    {
      path: "/search/creditAuthorize",
      component: creditAuthorize
    },
    {
      path: "/search/creditResult",
      component: creditResult
    },
    {
      path: "/search/creditDetails",
      component: creditDetails
    },
    {
      path: "/search/creditHistory",
      component: creditHistory
    },
    {
      path: "/oasystem/report",
      component: report,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: "/oasystem/weekly",
      component: week
    },
    {
      path: "/oasystem/reporter",
      component: reporter
    },
    {
      path: "/oasystem/attendance",
      component: attendance
    },
    {
      path: "/oaSystem/attendanceStatistics",
      component: attendanceStatistics
    },
    {
      path: "/oasystem/lateRecord",
      component: lateRecord
    },
    {
      path: "/oasystem/earlyRecord",
      component: earlyRecord
    },
    {
      path: "/oasystem/lackRecord",
      component: lackRecord
    },
    {
      path: "/oasystem/absentRecord",
      component: absentRecord
    },
    {
      path: "/oasystem/outRecord",
      component: outRecord
    },
    {
      path: "/oasystem/overtimeRecord",
      component: overtimeRecord
    },
    {
      path: "/oasystem/attendanceDetail",
      component: attendanceDetail
    },
    {
      path: "/oasystem/clockDetail",
      component: clockDetail
    },
    {
      path: "/oaSystem/sign",
      component: sign
    },
    {
      path: "/oaSystem/signIn",
      component: signIn
    },
    {
      path: "/oaSystem/history",
      component: history
    },
    {
      path: "/oaSystem/audit",
      component: audit
    },
    {
      path: "/oaSystem/myAuditing",
      component: myAuditing,
      name: "myAuditing"
    },
    {
      path: "/oaSystem/auditHistory",
      component: auditHistory
    },
    {
      path: "/oaSystem/auditSuggestion",
      component: auditSuggestion,
      name: "auditSuggestion"
    },
    {
      path: "/oaSystem/attendanceCard",
      component: attendanceCard
    },
    {
      path: "/oaSystem/attendanceGroup",
      component: attendanceGroup
    },
    {
      path: "/oaSystem/addAttendanceGroup",
      component: addAttendanceGroup,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: "/oaSystem/selectedApartment",
      component: selectedApartment
    },
    {
      path: "/oaSystem/unselectApartment",
      component: unselectApartment
    },
    {
      path: "/oaSystem/attendanceMember",
      component: attendanceMember
    },
    {
      path: "/oaSystem/attendanceLeader",
      component: attendanceLeader
    },
    {
      path: "/oaSystem/apartmentMember",
      component: apartmentMember
    },
    {
      path: "/oaSystem/attendanceApartment",
      component: attendanceApartment
    },
    {
      path: "/oaSystem/staffManagement",
      component: staffManagement
    },
    {
      path: "/oaSystem/addStaff",
      component: addStaff
    },
    {
      path: "/oaSystem/techDepartment",
      component: techDepartment
    },
    {
      path: "/oaSystem/addAddress",
      component: addAddress
    },
    {
      path: "/oaSystem/caption",
      component: caption
    },
    {
      path: "/oaSystem/leave",
      component: leave
    },
    {
      path: "/oaSystem/out",
      component: out
    },
    {
      path: "/oaSystem/overtimeWork",
      component: overtimeWork
    },
    {
      path: "/oaSystem/dayly",
      component: dayly
    },
    {
      path: "/oaSystem/monthly",
      component: monthly
    },
    {
      path: "/oaSystem/smartWeekly",
      component: smartWeekly
    },
    {
      path: "/oaSystem/addApartment",
      component: addApartment
    },
    {
      path: "/oaSystem/attendanceCardSuccess",
      component: attendanceCardSuccess
    },
    {
      path: "/oaSystem/selectApprover",
      component: selectApprover
    },
    {
      path: "/oaSystem/selectApartment",
      component: selectApartment
    },
    {
      path: "/home/productList",
      component: productList
    },
    {
      path: "/home/carInfo",
      component: carInfo
    },
    {
      path: "/home/cxdInfo",
      component: cxdInfo
    },
    {
      path: "/home/fcgqInfo",
      name: "fcgqInfo",
      component: fcgqInfo
    },
    {
      path: "/home/interestedClient",
      component: interestedClient
    },
    {
      path: "/home/clientInfo",
      component: clientInfo,
      name: "clientInfo"
    },
    {
      path: "/home/thirdApplyInfo",
      component: thirdApplyInfo
    },
    {
      path: "/home/applyInfo",
      component: applyInfo
    },
    {
      path: "/home/orderRecord",
      component: orderRecord
    },
    {
      path: "/home/clientDetail",
      component: clientDetail
    },
    {
      path: "/home/broadcast",
      component: broadcast,
      name: "broadcast"
    },
    {
      path: "/users/money",
      component: money
    },
    {
      path: "/users/myProduct",
      component: myProduct
    },
    {
      path: "/users/agency",
      component: agency
    },
    {
      path: "/users/myService",
      component: myService
    },
    {
      path: "/users/set",
      component: set
    },
    {
      path: "/users/pay",
      component: pay
    },
    {
      path: "/users/confirmPay",
      component: confirmPay
    },
    {
      path: "/users/changepwd",
      component: changepwd
    },
    {
      path: "/oaSystem/personnel",
      component: personnel
    },
    {
      path: "/oaSystem/department",
      component: department
    },
    {
      path: "/index/agencyProduct",
      component: agencyProduct
    },
    {
      path: "/department/personList",
      component: personList
    },
    {
      path: "/oaSystem/performence",
      component: performence
    },
    {
      path: "/oaSystem/selectSendTo",
      component: selectSendTo
    },
    {
      path: "/oaSystem/daylyselectSendTo",
      component: daylyselectSendTo
    },
    {
      path: "/oaSystem/daylyselectApprover",
      component: daylyselectApprover
    },
    {
      path: "/oaSystem/selectSendToOut",
      component: selectSendToOut
    },
    {
      path: "/oaSystem/selectSendToOvertime",
      component: selectSendToOvertime
    },

    {
      path: "/oaSystem/selectApproverOut",
      component: selectApproverOut
    },
    {
      path: "/oaSystem/selectApproverOvertime",
      component: selectApproverOvertime
    },
    {
      path: "/oaSystem/selectDepartmentPerson",
      component: selectDepartmentPerson
    },
    {
      path: "/oaSystem/personnelweekly",
      component: personnelweekly
    },
    {
      path: "/oaSystem/departmentweekly",
      component: departmentweekly
    },
    {
      path: "/oaSystem/departmentmonthly",
      component: departmentmonthly
    },
    {
      path: "/oaSystem/personnelmonthly",
      component: personnelmonthly
    },
    {
      path: "/oaSystem/personnelperformence",
      component: personnelperformence
    },
    {
      path: "/oaSystem/departmentperformence",
      component: departmentperformence
    },
    {
      path: "/department/serviceDepartment",
      component: serviceDepartment
    },
    {
      path: "/oaSystem/myAuditHistory",
      component: myAuditHistory
    },
    {
      path: "/oaSystem/auditDetail",
      component: auditDetail
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
import { getItem } from "../util/util";
router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !getItem("userInfo")) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: "/login"
    });
  } else {
    next(); // 确保一定要调用 next()
  }
});
export { router };
