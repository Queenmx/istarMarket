<template>
  <div class="rooterEle selectApartment">
      <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">选择审批人</p>
        </v-header>
      <ul>
          <li class="wrap flex item" v-for="(ite,index) in list1" :key="index" @change="change(ite.userName)">
             
                  <!-- <! <i :class="[{'active':isAll},'el-icon-circle-check']" @click="isAll=!isAll"></i> --> 
                  <el-radio-group v-model="radioType">
                      <el-radio :label="ite.userId">{{ite.userName}}
                      </el-radio>
                  </el-radio-group> 
                  <!-- <el-checkbox-group v-model="checkList">
                    <el-checkbox :label="ite.userId">{{ite.userName}}</el-checkbox>
                    <! <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox> -->
                  <!-- </el-checkbox-group> --> 

             
          
          </li>
      </ul> 
      <!-- <footer2 :backUrl="backUrl"></footer2> -->
       <div class="footer-btn2" @click="go">确定</div>
  </div>
</template>
<script>
// import {  } from "../../util/util.js";
import { oaQueryCompany } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "../../util/util";
import footer2 from "../../components/footer2";
import { strEnc, strDec } from '@/util/aes.js'
export default {
  data() {
    return {
      backUrl: {},
      isAll: false,
      radioType: "",
      list1: "",
      checkList: ""
    };
  },
  components: {
    footer2
  },
  mounted() {
    this.initData();
    console.log(this.$route.query);
  },
  methods: {
    showStaff() {
      this.$router.push({
        name: "attendanceMember",
        params: { status: "apartment" }
      });
      localStorage.setItem("attendanceMember", "apartment");
    },

    // initData(){},
    async initData() {
      getItem("userinfo");
      let userinfo = JSON.parse(localStorage.userInfo);
      // console.log(userinfo)
      var data = {
        companyId: userinfo.companyId
      };
       var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      let res1 = await oaQueryCompany(enData);
      let deData1 = strDec(res1,"ZND20171030APIMM");
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
        setItem("performenceApprover", this.user);
        setItem("performenceApproverId", this.radioType);
        // setItem("approverId", this.radioType);
        console.log(localStorage);
        this.$router.push({ path: "/oaSystem/performence" });
        // this.$router.push({path: '/oaSystem/leave',query:{approverId:this.radioType}})
      }
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
ul {
  width: 100%;
  height: 100%;
  padding-bottom: rem(100px);
  box-sizing: border-box;
  //   margin-bottom: rem(100px)
}
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

