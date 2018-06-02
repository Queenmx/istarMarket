<template>
  <div class="rooterEle selectApartment">
      <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">选择抄送人</p>
        </v-header>
      <ul>
          <li class="wrap flex item" v-for="(ite,index) in list1" :key="index" @change="change($event, ite.userName)">
            <el-checkbox-group v-model="userArr" >
                <el-checkbox :label="ite.userName">{{ite.userName}}
                </el-checkbox>
            </el-checkbox-group>           
          </li>
      </ul> 
       <div class="footer-btn2" @click="go">确定</div>
  </div>
</template>
<script>
// import {  } from "../../util/util.js";
import { oaQueryCompany } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import footer2 from "../../components/footer2";
export default {
  data() {
    return {
      backUrl: {},
      isAll: false,
      radioType: "",
      cities: "",
      list1: "",
      checkList: "",
      userArr: []
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
    // showStaff() {
    //   this.$router.push({
    //     name: "attendanceMember",
    //     params: { status: "apartment" }
    //   });
    //   localStorage.setItem("attendanceMember", "apartment");
    // },
    // select() {},
    // initData(){},
   
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
      }
    },

    go() {
      if (this.userArr && this.userArr !== "") {
        console.log(this.userArr);
        setItem("sendTo", this.userArr);
        this.$router.push({ path: "/oaSystem/leave" });
      }
    },
    
    change($event,val) { 
      var self = this;
      const isChecked = $event.target.checked;
      console.log(self.list1)
      if(isChecked) {
        if(!this.userArr.includes(val)) {
          this.userArr.push(val);
        }
      } else {
        const valIndex = this.userArr.indexOf(val);
        const sliceVal = this.userArr[valIndex];
        let newArr = [];
        this.userArr.forEach((item) => {
          if(item !== sliceVal) {
            newArr.push(item);
          }
        })
        this.userArr = newArr;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
ul {
  width: 100%;
  height: 100%;
  margin-bottom: rem(100px);
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

