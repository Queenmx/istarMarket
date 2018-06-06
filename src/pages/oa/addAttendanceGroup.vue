<template>
    <div class="rooterEle addAttendanceGroup">
        <v-header :title="title">
        </v-header>
        <!-- <div class="main">
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
                <div class="add-wrap" @click="handleCommand">
                    <i class="el-dropdown-link add"></i>
                </div>
            </div>
            <split></split>
            <div class="wrap flex item" @click="goSelect('other')">
                <p class="rest lable"><span>其他参与人员</span></p>
               <p> <i class="el-icon-arrow-right"></i></p>
            </div>
        </div> -->
        <ul class="list">
            <li>
                <split></split>
                <div class="wrap flex item">
                    <div class="title">
                        <span>考勤组名称</span>
                    </div>
                    <div class="rest">
                        <span v-if="groupName">{{groupName}}</span>
                        <input v-model="groupName" v-else placeholder="请输入考勤组名称">
                    </div>
                </div>
            </li>
            <li>
                <split></split>
                <div class="wrap item">
                    <div class="title">
                        <span>参与部门</span>
                    </div>
                    <div class="circle-wrap">
                        <van-row>
                            <van-col span="4" v-for="item in inDepts" :key="item.deptId">
                                <div class="flex circle">
                                    <span>{{item.deptName.split("部")[0]}}</span>
                                </div>
                            </van-col>
                            <van-col span="4">
                                <div class="add-wrap">
                                    <router-link :to="{path:'/oaSystem/attendanceApartment',query:{selectDept:inDepts}}" class="icon-add-circle"></router-link>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </li>
            <li>
                <split></split>
                <div class="wrap flex item">
                    <div class="title">
                        <span>其他参与人员</span>
                    </div>
                    <div class="rest right">
                        <span class="value">{{inUsers|getUsersName}}</span>
                            <router-link to="/oaSystem/attendanceMember" class="icon-arrow-right-black"></router-link>
                    </div>
                </div>
            </li>
        </ul>
        <div class="wrap" @click="submit">
            <p class="btn-blue-lg">提交</p>
        </div>
    </div>
</template>
<script>
import { oaAttendanceGroupInfo, oaAttendSetting } from "@/util/axios";
import { setItem, getItem } from "@/util/util";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      userInfo: getItem("userInfo"),
      groupId: this.$route.query.groupId,
      title: this.$route.query.groupId ? "修改成员" : "添加考勤组",
      groupName: this.$route.query.groupName || "",
      leader: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    let path = ["/oaSystem/attendanceApartment", "/oaSystem/attendanceMember"];
    let res = path.some(item => {
      return item == from.path;
    });
    if (res) {
      to.meta.isBack = true;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      this.init();
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState([
      // map this.count to store.state.count
      "inDepts",
      "inUsers"
    ])
  },
  filters: {
    getUsersName(list) {
      return list
        .map(item => {
          return item.userName;
        })
        .join(",");
    }
  },
  methods: {
    async init() {
      if (this.groupId) {
        this.getGroupInfo();
      }
    },
    ...mapMutations(["SET_INDEPTS", "SET_INUSERS"]),
    //获取该考勤组信息
    async getGroupInfo() {
      let data = {
        groupId: this.groupId
      };
      let res = await oaAttendanceGroupInfo(data);
      if (res.code === "0000") {
        this.SET_INDEPTS(res.data.inDepts);
        this.SET_INUSERS(res.data.inUsers);
        this.leader = res.data.leader;
      } else {
        this.$toast(res.msg);
      }
    },
    handleCommand() {
      sessionStorage.setItem("inDepts", JSON.stringify(this.seletedDepartment));
      this.$router.push({ path: "/oaSystem/attendanceApartment" });
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
        // case "address":
        //   this.$router.push({
        //     path: "/oaSystem/addAddress",
        //     query: { btnText: "确定" }
        //   });
        //   break;
      }
    },
    //获取选中部门的id
    getDeptIds() {
      return this.inDepts
        .map(item => {
          return item.deptId;
        })
        .join(",");
    },
    //获取选中人员的id
    getUserIds() {
      return this.inUsers
        .map(item => {
          return item.userId;
        })
        .join(",");
    },
    async submit() {
      if (!this.groupName.trim()) {
        this.$toast("考勤组名字不能为空");
        return;
      }
      var data = {
        companyId: this.userInfo.companyId,
        groupName: this.groupName,
        groupId: this.groupId,
        inDepts: this.getDeptIds(),
        inUsers: this.getUserIds(),
        leader: this.leader,
        location: sessionStorage.getItem("location")
      };
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
  .item {
    padding-top: rem(32px);
    padding-bottom: rem(28px);
    font-size: rem(30px);
    color: #020202;
    background: #fff;
  }
  .title {
    width: rem(262px);
  }
  .list {
    margin-bottom: rem(94px);
  }
  .icon-add-circle {
    @include icon(rem(88px), rem(88px));
  }
  .circle {
    justify-content: center;
    width: rem(88px);
    height: rem(88px);
    border-radius: 50%;
    border: rem(2px) solid #7f7f7f;
    background: #fdfcfc;
    box-sizing: border-box;
  }
  .circle-wrap {
    margin-top: rem(26px);
  }
  .icon-arrow-right-black {
    @include icon(rem(19px), rem(28px));
    vertical-align: middle;
  }
  .value {
    display: inline-block;
  }
  .right {
    text-align: right;
  }
}
</style>

