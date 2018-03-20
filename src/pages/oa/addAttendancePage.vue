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
            <div class="wrap flex item" @click="showMemberlist('other')">
                <p class="rest lable"><span>其他参与人员</span></p>
               <p> <i class="el-icon-arrow-right"></i></p>
            </div>
            <!-- <split></split>
            <div class="wrap flex item" @click="showMemberlist('leader')">
                <p class="rest lable"><span>考勤组负责人</span></p>
               <p> <i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="wrap info" @click="goSelect('caption')">
                <span>协助管理员分管本考勤组的排班及统计</span>
                <i class="el-icon-question"></i>
            </div> -->
            <!-- <div class="wrap flex item" @click="setAddress()" v-if="status==='add'">
                <p class="rest lable">
                    <i class="map"></i>
                    <span>考勤位置</span>
                </p>
               <p><i class="el-icon-arrow-right"></i></p>
            </div> -->
        </div>
        <div class="footer-btn" @click="submit">
            <span>提交</span>
        </div>
        <div class="subpage-wrap"  v-show="isShowAparment">
        <attendanceApartment :seletedDepartment.sync="seletedDepartment" @close="isShowAparment=false"></attendanceApartment>
        </div>
        <div class="subpage-wrap"  v-show="isShowMember">
        <attendanceMember :memberFlag="memberFlag" :inUsers.sync="inUsers" :leader.sync="leader" @close="isShowMember=false"></attendanceMember>
        </div>
        <div class="subpage-wrap"  v-show="isShowAddress">
        <addAddress @submit="getAddress" @close="isShowAddress=false"></addAddress>
        </div>
    </div>
</template>
<script>
import attendanceApartment from "./attendanceApartment";
import attendanceMember from "./attendanceMember";
import addAddress from "./addAddress";
import { oaAttendanceGroupInfo, oaAttendSetting } from "@/util/axios";
import { setItem, getItem } from "@/util/util";
export default {
  data() {
    return {
      userInfo: JSON.parse(getItem("userInfo")),
      status: this.$route.query.status,
      groupId: this.$route.query.groupId,
      title: "",
      info: {},
      seletedDepartment: {},
      inUsers: {},
      leader: {},
      location: "",
      memberFlag: "",
      groupName: this.$route.query.groupName || "",
      isShowAparment: false,
      isShowMember: false,
      isShowAddress: false
    };
  },
  components: {
    attendanceApartment,
    attendanceMember,
    addAddress
  },
  mounted() {
    this.initTemplate();
    this.initData();
  },
  computed: {
    departmentLength() {
      let length =
        Object.getOwnPropertyNames(this.seletedDepartment).length - 1;
      console.log(JSON.stringify(this.inUsers), JSON.stringify(this.leader));
      return length;
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
          this.location = this.info.location;
          this.info.inDepts.forEach(item => {
            this.$set(this.seletedDepartment, item.deptId, 1);
          });
          this.info.inUsers.forEach(item => {
            this.$set(this.inUsers, item.userId, 1);
          });
          this.info.leader.forEach(item => {
            this.$set(this.leader, item.userId, 1);
          });
        }
      }
    },
    handleCommand() {
      //   this.$router.push({ path: "/oaSystem/attendanceApartment" });
      this.isShowAparment = true;
    },
    showMemberlist(str) {
      this.memberFlag = str;
      this.isShowMember = true;
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
    setAddress() {
      this.isShowAddress = true;
    },
    getAddress(str) {
      this.location = str;
      this.isShowAddress = false;
    },
    getObjKey(obj) {
      let arr = [];
      for (let [key, val] of Object.entries(obj)) {
        arr.push(key);
      }
      return arr.join();
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
        inDepts: this.getObjKey(this.seletedDepartment),
        inUsers: this.getObjKey(this.inUsers),
        leader: this.getObjKey(this.leader),
        location: this.location
      };
      console.log(data);
      let res = await oaAttendSetting(data);
      if (res.code === "0000") {
        this.$router.push({ path: "/oaSystem/attendanceGroup" });
      } else {
        this.$message(res.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.addAttendanceGroup {
  position: relative;
  .subpage-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 10;
  }
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

