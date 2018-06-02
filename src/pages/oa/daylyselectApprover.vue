<template>
  <div class="rooterEle selectApartment">
      <v-header title="选择审批人">
        </v-header>
      <ul class="list-wrap">
          <li class="wrap flex item" v-for="(ite,index) in list1" :key="index" @change="change(ite.userName)">
                  <!-- <el-radio-group v-model="radioType" >
                      <el-radio :label="ite.userId">{{ite.userName}}
                      </el-radio>
                  </el-radio-group> -->
                  <span class="rest">{{ite.userName}}</span>
                  <i class="icon-checked"></i>
            </li>
      </ul> 
      <!-- <footer2 :backUrl="backUrl"></footer2> -->
       <!-- <div class="footer-btn2" @click="go">确定</div> -->
       <div class="wrap flex footer">
           <div class="rest">王大翠</div>
           <div class="btn-sm">确定(1)</div>
       </div>
  </div>
</template>
<script>
// import {  } from "../../util/util.js";
import { oaQueryCompany } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
import footer2 from "../../components/footer2";
export default {
  data() {
    return {
      backUrl: {},
      isAll: false,
      radioType: "",
      list1: "",
      checkList: "",
      user: ""
    };
  },
  components: {
    footer2
  },
  mounted() {
    this.initData();
    // console.log(this.$route.query)
  },
  methods: {
    showStaff() {
      this.$router.push({
        name: "attendanceMember",
        params: { status: "apartment" }
      });
      localStorage.setItem("attendanceMember", "apartment");
    },
    select() {},
    // initData(){},
    async initData() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      // console.log(userinfo)
      var data = {
        companyId: userinfo.companyId
      };
      let enData = strEnc(JSON.stringify(data), "ZND20171030APIMM");
      let res1 = await oaQueryCompany(enData);
      let deData1 = strDec(res1, "ZND20171030APIMM");
      // console.log(deData1);
      let deData = JSON.parse(deData1);
      if (deData.code === "0000") {
        // this.$router.push({path:'oaSystem/leave',query:{userId:this.radioType}})
        this.list1 = deData.data;
        console.log(this.list1);
        //  this.$router.push({path: '/oaSystem/leave', query: {userId: this.radioType}})
      }
      // console.log(this.radioType)
    },

    go() {
      if (this.user && this.user !== "") {
        setItem("daylyApprover", this.user);
        setItem("daylyApproverId", this.radioType);
        // setItem("approverId", this.radioType);
        console.log(localStorage);
        this.$router.push({ path: "/oaSystem/dayly" });
        // this.$router.push({path: '/oaSystem/leave',query:{approverId:this.radioType}})
      }
      console.log(localStorage);
    },
    change(e) {
      console.log(e);
      this.user = e;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
.selectApartment {
  padding-bottom: rem(100px);
  font-size: rem(30px);
  color: #020202;
  .item {
    height: rem(112px);
    border-bottom: rem(1px) solid #eee;
  }
  .icon-checked {
    @include icon(rem(32px), rem(28px));
  }
  .list-wrap {
    height: 100%;
    overflow: auto;
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: rem(100px);
    color: #333;
    border-top: rem(1px) solid #f1f0f0;
    box-sizing: border-box;
    background: #fcfafa;
  }
  .btn-sm {
    width: rem(160px);
    text-align: right;
    color: #4d7bff;
  }
}
// ul {
//   width: 100%;
//   height: 100%;
//   padding-bottom: rem(100px);
//   box-sizing: border-box;
//   //   margin-bottom: rem(100px);
// }
.selectApartment {
  .el-icon-circle-check {
    font-size: rem(42px);
    color: #d7d4d4;
    &.active {
      color: $blue;
    }
  }
  .item {
    height: rem(150px);
    border-bottom: 1px solid $bdcolor;
    background: #fff;
    .title {
      padding: 0 rem(30px);
      font-size: rem(32px);
      color: $black;
    }
    .right {
      color: #969696;
      font-size: rem(30px);
      i {
        color: #c8c8c8;
      }
    }
  }
  .nameList {
    padding: rem(30px) 0;
    overflow: hidden;
    .userName {
      span {
        display: inline-block;
        background-color: #409eff;
        color: #fff;
        // padding: rem(10px);
        border-radius: rem(5px);
        margin: rem(5px);
      }
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.item {
  .el-radio__label {
    font-size: rem(34px);
  }
}
</style>

