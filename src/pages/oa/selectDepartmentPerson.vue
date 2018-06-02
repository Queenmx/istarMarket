<template>
  <div class="select">
     <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{$route.query.ite.deptName}}</p>
        </v-header>
   <ul class="selectPerson">
      <li class="wrap flex item item3" v-for="(ite,index) in list1" :key="index">
             
                  <!-- <! <i :class="[{'active':isAll},'el-icon-circle-check']" @click="isAll=!isAll"></i> --> 
                  <el-radio-group v-model="radioType">
                      <el-radio :label="ite.userId">{{ite.userName}}
                      </el-radio>
                  </el-radio-group> 
          </li>
		</ul>
      <div class="footer-btn2" @click="submit('apartment')">确定</div>
  </div>
</template>

<script>
import { oaQueryDept } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import {  } from "../../util/util.js";
export default {
  data(){
    return{
      list1:'',
      radioType:''
    }
  },
  mounted() {
   
    this.initData();
  },
  methods:{
      async initData(){
       console.log(this.$route.query.ite.users) 
      getItem("userinfo");
			let userinfo=JSON.parse(localStorage.userInfo)
      var data ={
         deptId:this.$route.query.ite.deptId,
			 }
      let res = await oaQueryDept(data)
      if(res.code==="0000"){
        // console.log(res.data)
       this.list1=res.data;
			 }
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/style/common.scss";
  .item3{
    height:rem(100px);
    line-height:rem(100px);
    border-bottom: 1px solid #f8f8f8
  }
    
</style>



