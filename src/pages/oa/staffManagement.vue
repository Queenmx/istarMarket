<template>
    <div class="rooterEle2 staffManagement">
        <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">员工管理</p>
        </v-header>
        <div>
            <el-tabs v-model="activeName" class="tab">
                <el-tab-pane label="用户" name="first">
                      <ul class="list">
                          <li class="wrap item flex" v-for="i in list1">
                              <div class="rest">
                                  <div class="inblock avatar-wrap">
                                      <img class="avatar" src="../../assets/images/avatar.jpg">
                                  </div>
                                  <div class="inblock name"  >
                                      <span>{{i.userName}}</span>
                                  </div>
                              </div>
                              <div class="right"><span>{{i.deptName}}</span></div>
                          </li>
                      </ul>
                    <div class="footer-btn2" @click="add('staff')">添加人员</div>
                </el-tab-pane>
                <el-tab-pane label="部门" name="second">
                    <ul>
                        <li class="wrap flex item item2" v-for="(ite,i) in list2" :key="i" @click="jumpRouter(ite)">
                            <div class="rest" >
                                <span>{{ite.deptName}}</span>
                            </div>
                            <div class="right">
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </li>
                    </ul>
                    <div class="footer-btn2" @click="add('apartment')">添加部门</div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { centerTabs } from "../../util/util.js";
import { oaQuery } from "@/util/axios.js";
import { oaQueryCompany } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
export default {
  data() {
    return {
      activeName: "first",
      list1: "",
      list2: ""
    };
  },
  mounted() {
    centerTabs();
    this.initData();
    this.initData1();
  },
  methods: {
    async initData1() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      // console.log(userinfo)
      var data = {
        companyId: userinfo.companyId
      };
      let res2 = await oaQuery(data);
      if (res2.code === "0000") {
        this.list2 = res2.data;
        console.log(this.list2);
      }
    },
    add(str) {
      if (str === "staff") {
        this.$router.push({ path: "/oaSystem/addStaff" });
      } else if (str === "apartment") {
        this.$router.push({ path: "/oaSystem/addApartment" });
      }
    },
    jumpRouter(ite) {
      this.$router.push({
        path: "/oaSystem/techDepartment",
        query: { ite: ite }
      });
      // console.log(ite)
    },
    async initData() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      // console.log(userinfo)
      var data = {
        companyId: userinfo.companyId
      };
      let res1 = await oaQueryCompany(data);

      if (res1.code === "0000") {
        this.list1 = res1.data;
        console.log(this.list1);
      }
      //  if(res1.code="0000"){
      //    this.list2=res.data;
      //    console.log(this.list2)
      //  }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.staffManagement {
  .list,
  .tab {
    background: #fff;
  }
  .item {
    height: rem(149px);
    font-size: rem(32px);
    border-bottom: 1px solid $bdcolor;
  }
  .item2 {
    height: rem(98px);
  }
  .avatar-wrap {
    margin-right: rem(18px);
  }
  .avatar {
    width: rem(91px);
    height: rem(94px);
  }
  .name {
    font-size: rem(32px);
    color: $black;
  }
  .right {
    color: #969696;
  }
  .el-tabs__header {
    margin: 0;
  }
}
</style>
<style lang="scss" >
@import "../../assets/style/common.scss";
.rooterEle2 {
  .el-tabs__item {
    height: rem(80px);
    line-height: rem(80px);
    font-size: rem(30px);
  }
}
</style>


