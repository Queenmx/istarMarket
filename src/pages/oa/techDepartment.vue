<template>
  <div>
     <v-header class="wrap">
            <i slot="left" class="el-icon-arrow-left"></i>
            <p slot="title">{{$route.query.ite.deptName}}</p>
        </v-header>
   <ul >
      <li class="wrap flex item" v-for="(items,index) in list" :key="index">
        <div><img src="../../assets/images/avatar.jpg" alt=""></div>
        <div class="desc">{{items.userName}}</div>
      </li>
		</ul>
  </div>
</template>
<script>
import { oaQueryDept } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
import {  } from "../../util/util.js";
export default {
  data(){
    return{
      list:'',
    }
  },
  mounted() {
   
    this.initData();
  },
  methods:{
      async initData(){
      //  console.log(this.$route.query.ite) 
      getItem("userinfo");
			let userinfo=JSON.parse(localStorage.userInfo)
      var data ={
         deptId:this.$route.query.ite.deptId,
			 }
      let res = await oaQueryDept(data)
      if(res.code==="0000"){
        console.log(res.data)
       this.list=res.data;
			 }
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/style/common.scss";
    .item{
      width: 100%；
      height：rem(150px);
      line-height: rem(150px);
      div{
       
        overflow: hidden;
        
        img{
          width: rem(80px);
          height:rem(80px);
           border-radius:50%;
           vertical-align: middle;
           
        }
      }
      .desc{
        margin-left: rem(40px);
        font-size: rem(30px);
      }

    }
</style>



