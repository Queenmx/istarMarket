<template>
  <div class="rooterEle selectApartment">
      <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">选择部门</p>
        </v-header>
      <ul>
          <li class="wrap flex item" v-for="(ite,index) in list1" :key="index">
              <p>
                  <el-radio-group v-model="radioType">
                      <el-radio :label="ite">{{ite.deptName}}
                      </el-radio>
                  </el-radio-group>
              </p>
              <!-- <p class="title rest">财务部</p> -->
          </li>
      </ul>
      <!-- <footer2 :backUrl="backUrl"></footer2> -->
       <div class="footer-btn2" @click="go">确定</div>
  </div>
</template>
<script>
// import {  } from "../../util/util.js";
import { oaQuery } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import { setItem } from "@/util/util.js";
import footer2 from "../../components/footer2";
export default {
  data() {
    return {
      backUrl: {},
      isAll: false,
      radioType:'',
      list1:''
    };
  },
  components: {
    footer2
  },
   mounted() {
    this.initData();
  },
   Destroyed(){
      this.destroy()
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
     async initData(){
      getItem("userinfo");
			let userinfo=JSON.parse(localStorage.userInfo)
      var data ={
         companyId:userinfo.companyId,
			 }
      let res = await oaQuery(data)
      if(res.code==="0000"){
        // console.log(res.data)
      this.list1=res.data;
      console.log(this.list1)
			 }
    },
    go(){
     if(this.radioType && this.radioType!=''){
      //  console.log(this.radioType)
      //  setItem('department',this.radioType)
      //  console.log(localStorage)
      this.$router.push({path: '/oaSystem/addStaff',query:{deptName:this.radioType.deptName,deptId:this.radioType.deptId}})
     }
     
    },
    // async destroy(){
    //   localStorage.removeItem('department')
    // }
   
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/common.scss";
ul{
  width: 100%;
  height:100%;
  margin-bottom: rem(100px)
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
.item{
  .el-radio__label{
    font-size:rem(34px)
  }
}
</style>

