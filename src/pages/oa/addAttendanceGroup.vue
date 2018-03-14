<template>
    <div class="rooterEle addAttendanceGroup">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{title}}</p>
        </v-header>
        <div class="main">
            <split></split>
            <div class="wrap flex item">
                <span class="lable">考勤组名称</span>
                <div class="rest input-wrap">
                    <input type="text" placeholder="请输入考勤组名称" v-model="groupName">
                </div>
            </div>
            <split></split>
            <div class="wrap item add-container">
                <div class="flex">
                    <p class="rest">
                        <span class="lable">参加部门</span>
                        <small>（部门新员工将自动加入）</small>
                    </p>
                    <p>
                        <span>{{departmentLength}}部门</span>
                        <i class="el-icon-arrow-right"></i>
                    </p>
                </div>
                <!-- <p ref="department" class="selected-area">
                        <span class="selected" v-for="(val,key) in seletedDepartment" :key="key">{{val}}</span>
                    </p> -->
                <div class="add-wrap" @click="handleCommand">
                    <i class="el-dropdown-link add"></i>
                </div>
            </div>
            <split></split>
            <div class="wrap flex item" @click="goSelect('other')">
                <p class="rest lable"><span>其他参与人员</span></p>
               <p> <i class="el-icon-arrow-right"></i></p>
            </div>
            <split></split>
            <div class="wrap flex item" @click="goSelect('leader')">
                <p class="rest lable"><span>考勤组负责人</span></p>
               <p> <i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="wrap info" @click="goSelect('caption')">
                <span>协助管理员分管本考勤组的排班及统计</span>
                <i class="el-icon-question"></i>
            </div>
            <div class="wrap flex item" @click="goSelect('address')" v-if="status==='add'">
                <p class="rest lable">
                    <i class="map"></i>
                    <span>考勤位置</span>
                </p>
               <p><i class="el-icon-arrow-right"></i></p>
            </div>
        </div>
        <div class="footer-btn" @click="submit">
            <span>提交</span>
        </div>
        <!-- <router-view ></router-view> -->
    </div>
</template>
<script>
import { oaAttendanceGroupInfo, oaAttendSetting } from "@/util/axios";
import { setItem, getItem } from "@/util/util";
var fromFlag = 0;
export default {
  data() {
    return {
      userInfo: JSON.parse(getItem("userInfo")),
      status: this.$route.query.status,
      groupId: this.$route.query.groupId,
      title: "",
      info: {},
      seletedDepartment: sessionStorage.getItem("inDepts")
        ? JSON.parse(sessionStorage.getItem("inDepts"))
        : {},
      groupName:
        sessionStorage.getItem("groupName") || this.$route.query.groupName || ""
    };
  },
  mounted() {
    this.initTemplate();
    this.initData();
    console.log(fromFlag);
  },
  computed: {
    departmentLength() {
      let length =
        Object.getOwnPropertyNames(this.seletedDepartment).length - 1;
      console.log(Object.getOwnPropertyNames(this.seletedDepartment));
      return length;
      //   if (length && this.info.inDepts && length !== this.info.inDepts.length) {
      //     return length;
      //   } else if (!this.info.inDepts) {
      //     return 0;
      //   } else {
      //     return this.info.inDepts.length;
      //   }
    }
  },
  methods: {
    initTemplate() {
      switch (this.status) {
        case "add":
          this.title = "添加考勤组";
          break;
        case "modify":
          this.title = "修改成员";
          break;
        default:
          this.title = "未知";
      }
    },
    async initData() {
      let inDepts = {},
        inUsers = {},
        leader = {};
      if (this.groupId) {
        let data = {
          groupId: this.groupId
        };

        let res = await oaAttendanceGroupInfo(data);
        if (res.code === "0000") {
          this.info = res.data;
          if (!sessionStorage.getItem("flag")) {
            this.info.inDepts.forEach(item => {
              this.$set(this.seletedDepartment, item.deptId, item.deptName);
            });
            return;
          }
          this.info.inDepts.forEach(item => {
            inDepts[item.deptId] = 1;
          });
          this.info.inUsers.forEach(item => {
            inUsers[item.userId] = 1;
          });
          this.info.leader.forEach(item => {
            leader[item.userId] = 1;
          });
          if (
            !sessionStorage.getItem("inDepts") &&
            Object.getOwnPropertyNames(inDepts)
          ) {
            sessionStorage.setItem("inDepts", JSON.stringify(inDepts));
          }
          if (
            !sessionStorage.getItem("inUsers") &&
            Object.getOwnPropertyNames(inUsers)
          ) {
            sessionStorage.setItem("inUsers", JSON.stringify(inUsers));
          }
          if (
            !sessionStorage.getItem("leader") &&
            Object.getOwnPropertyNames(leader)
          ) {
            sessionStorage.setItem("leader", JSON.stringify(leader));
          }
        }
      }
    },
    handleCommand() {
      sessionStorage.setItem("inDepts", JSON.stringify(this.seletedDepartment));
      this.$router.push({ path: "/oaSystem/attendanceApartment" });
      //   if (command === "selected") {
      //     this.$router.push({ path: "/oaSystem/attendanceApartment" });
      //   } else if (command === "unselect") {
      //     this.$router.push({ path: "/oaSystem/attendanceApartment" });
      //   }
    },
    goSelect(str) {
      switch (str) {
        case "other":
          this.$router.push({
            path: "/oaSystem/attendanceMember",
            query: { status: "staff" }
          });
          break;
        case "leader":
          this.$router.push({
            path: "/oaSystem/attendanceMember",
            query: { status: "leader" }
          });
          break;
        case "caption":
          this.$router.push({ path: "/oaSystem/caption" });
          break;
        case "address":
          this.$router.push({
            path: "/oaSystem/addAddress",
            query: { btnText: "确定" }
          });
          break;
      }
    },
    async submit() {
      if (!this.groupName.trim()) {
        this.$message("考勤组名字不能为空");
        return;
      }
      var data = {
        companyId: this.userInfo.companyId,
        groupName: this.groupName,
        groupId: this.groupId || "",
        inDepts: "ad",
        inUsers: "111111,40288048616dde3001616e3092860007",
        leader: "40288048616dde3001616e3092860007",
        location: sessionStorage.getItem("location") || this.info.location
      };
      this.ObjectToString(data, ["inDepts", "inUsers", "leader"]);
      console.log(data);
      let res = await oaAttendSetting(data);
      if (res.code === "0000") {
        this.$router.push({ path: "/oaSystem/attendanceGroup" });
      } else {
        this.$message(res.msg);
      }
    },
    ObjectToString(target, arr) {
      arr.forEach(item => {
        let str = sessionStorage.getItem(item);
        if (str) {
          let obj = JSON.parse(str);
          let arr = Object.getOwnPropertyNames(obj);
          target[item] = arr.join();
        } else {
          target[item] = "";
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path != "/oaSystem/attendanceMember" &&
      to.path != "/oaSystem/attendanceApartment" &&
      to.path != "/oaSystem/caption" &&
      to.path != "/oaSystem/addAddress"
    ) {
      //   sessionStorage.removeItem("inDepts");
      //   sessionStorage.removeItem("inUsers");
      //   sessionStorage.removeItem("leader");
      //   sessionStorage.removeItem("groupName");
      //   sessionStorage.removeItem("location");
      sessionStorage.clear();
    } else {
      sessionStorage.setItem("groupName", this.info.groupName);
      sessionStorage.setItem("flag", 1);
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.path == "/oaSystem/attendanceMember" ||
      from.path == "/oaSystem/attendanceApartment"
    ) {
      fromFlag = 1;
    }
    next();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.addAttendanceGroup {
  .item {
    height: rem(98px);
    line-height: rem(98px);
    font-size: rem(32px);
    color: #646464;
    background: #fff;
    border-top: 1px solid $bdcolor;
    border-bottom: 1px solid $bdcolor;
    .right {
      text-align: right;
      color: #646464;
    }
    .input-wrap {
      padding: rem(57px);
      input {
        padding: 0;
        border: none;
      }
    }
    small {
      padding-left: rem(34px);
      font-size: rem(24px);
      color: #646464;
    }
    .lable {
      color: #646464;
    }
  }
  .add-container {
    padding-top: rem(22px);
    padding-bottom: rem(44px);
    height: auto;
    line-height: 1.2;
    .add {
      @include icon(rem(98px),rem(98px));
      background-image: url("../../assets/images/add.png");
    }
    .add-wrap {
      padding-top: rem(60px);
    }
  }
  .map {
    @include icon(rem(29px),rem(38px));
    margin-right: rem(19px);
    background-image: url("../../assets/images/icon-map.png");
  }
  .info {
    height: rem(79px);
    line-height: rem(79px);
    font-size: rem(26px);
    color: #979797;
  }
  .selected-area {
    margin-top: rem(30px);
    .selected {
      padding: 5px 10px;

      margin-right: rem(30px);
      color: #fff;
      background: $blue;
      border-radius: rem(10px);
    }
  }
}
</style>

