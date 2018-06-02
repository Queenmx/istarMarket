<template>
    <div class="department">
        <v-header>
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">部门</p>
        </v-header>
        <split></split>
        <!-- <el-row class="department_list" v-for="(item,index) in group" :key="index">
            <div @click="goFunc(item.url)">
                <el-col :span="12" class="textAlignLeft groupName">
                    {{item.name}}
                </el-col>
                <el-col :span="12" class="textAlignRight groupNum">
                    <span>{{item.num}}人</span>
                    <i class="el-icon-arrow-right"></i>
                </el-col>
            </div>
        </el-row> -->
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
     
    </div>
</template>
<script>
import {  } from "../../util/util.js";
import { oaQuery } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
export default {
  data() {
    return {
      list2:'',
      radioType:''
    
    };
  },
  mounted() {
     this.initData1();
  },
  methods: {
    jumpRouter(ite){
      console.log(ite);
      this.$router.push({path: '/oaSystem/selectDepartmentPerson', query: {ite: ite}})
    },
    async initData1(){
       getItem("userinfo");
      let userinfo=JSON.parse(localStorage.userInfo)
      // console.log(userinfo)
      var data ={
         companyId:userinfo.companyId,
       }
         let res2 = await oaQuery(data);
         if(res2.code==="0000"){
     
      this.list2=res2.data;
        //  console.log(this.list1)
       } 
    },
    //  go(){
    //  if(this.radioType && this.radioType!=''){
    //    console.log(this.radioType)
    //     this.$router.push({path: '/oaSystem/dayly', query: {deptId: this.radioType}})
    //  }
     
    // }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common.scss";
.department{
  .item{
  height:rem(80px);
  border-bottom: 1px solid #f8f8f8;
  font-size:rem(50px)
  .right {
    color: #969696;
  }
  }
}
</style>