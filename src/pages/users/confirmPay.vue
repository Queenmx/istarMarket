<template>
  <div>
    <v-header class="header">
			<i slot="left" class="el-icon-arrow-left"></i>
			<p slot="title">支付</p>
		</v-header>
    <div class="main">
      ¥5000.00
    </div>
    <p class="p1">6位数字密码</p>
   <div class="flex f-d-r pay_content">
      <div class="ipt_pay">
          <input type="password" maxlength="1" >
      </div>
      <div class="ipt_pay">
        <input type="password" maxlength="1" >
      </div>
      <div class="ipt_pay">
        <input type="password" maxlength="1" >
      </div>
      <div class="ipt_pay">
        <input type="password" maxlength="1" >
      </div>
      <div class="ipt_pay">
        <input type="password" maxlength="1" >
      </div>
      <div class="ipt_pay">
        <input type="password" maxlength="1" >
      </div>
    </div>
</div>
  
  
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>



<style lang="scss" scoped>
  @import "../../assets/style/common.scss";
.header{
  border-bottom:0;
}
.main{
  width: 100%;
  height:rem(355px);
  background-color: #f8f8f8;
  line-height: rem(355px);
  color:#f00;
  text-align: center;
  font-size: rem(60px)
}
.p1{
  margin-top: rem(36px);
  text-align: center;
  font-size: rem(22px);
  color:#999999;
  line-height: rem(85px)
}
.pay_content{
  width: rem(690px);
  margin:0 auto;
  .ipt_pay{
      width: rem(115px);
      height:rem(112px);
      input{
            width: rem(115px);
            height:rem(108px);
            border:1px solid #ececec;
          text-align: center;
          font-size: rem(24px)
      }
  }
}

</style>