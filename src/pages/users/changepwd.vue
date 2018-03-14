<template>
  <div class="agency"> 
    <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">修改密码</p>
		</v-header>
    <ul>
				<split></split>
			<li class="wrap item flex"><el-input v-model="oldPwd" placeholder="请输入旧密码" type="password"></el-input></li>
      <li class="wrap item flex" ><el-input v-model="newPwd" placeholder="设置新密码" type="password"></el-input></li> 
      <li class="wrap item flex"><el-input v-model="confirm" placeholder="确认新密码" type="password"></el-input></li>
      <li class="wrap item flex"><el-button type="primary" @click="submit">确定</el-button></li>
		</ul>
  </div>
</template>
<script>
import { changePwd } from "@/util/axios.js";
import { getItem, checkSys } from "@/util/util.js";
export default {
   data(){
    return{
      oldPwd:'',
      newPwd:'',
      confirm:''
    }
  },
  mounted(){
		// this.initData()
  },
  // methods:{
  //    async initData(){
  //     getItem("userinfo");
  //     let userinfo=JSON.parse(localStorage.userInfo)
  //     console.log(userinfo.userId)
  //     var data ={
  //        userId:userinfo.userId,
  //        userName:'',
       
  //      }
  //     let res = await getAgency(data)
  //     if(res.code==="0000"){
  //     this.items=res.data.xbConsumeList
  //     // console.log(res.data.xbConsumeList)
			
			
	// 		 }
  //   },
  // }
  methods:{
    async submit(){
       getItem("userinfo");
      let userinfo=JSON.parse(localStorage.userInfo)
      console.log(userinfo);
      var data = {
      oldPwd: this.oldPwd,
      newPwd: this.newPwd,
      confirm:this.confirm,
      userName:userinfo.userName,
      userId:userinfo.userId
    };
       if(!this.oldPwd.trim()){
          this.$message("旧密码不能为空")
        }else if(!this.newPwd.trim()){
          this.$message("新密码不能为空")
        }else if(!this.confirm.trim()){
            this.$message("确认密码不能为空")
          }else if(this.newPwd === this.confirm){
            let res = await changePwd(data);
            if(res.code ==='0000'){
              console.log(res.data)
              this.$router.push('/user')
            }
          }
        }
    }
  }

</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";

  .agency{
    width: 100%;
    background-color: #f8f8f8;
    height:100%;
    .header {
    border-bottom: 0;
  }
   .item{
       background-color: #fff;
      //  height:rem(146px);
      // justify-content: space-between;
       }
}
    
</style>
<style lang="scss">
@import "../../assets/style/common.scss";
.agency{
   width: 100%;
    .el-input{
      margin-bottom:rem(40px)
    }
    .el-input__inner{
      height:rem(80px);
    
    }

   .el-button{
     width:100%;
   margin-top:rem(20px)
   } 
}
</style>


