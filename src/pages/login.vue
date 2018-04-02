<template>
	<div class="login">
        <div class="logo"></div>
        <form class="form">
            <ul class="loginBox">
                <li class="item flex">
                    <div>
                        <label>登录账号</label>
                    </div>
                    <div class="rest input-wrap">
                        <input type="text" placeholder="请输入登录账号" v-model="userName">
                    </div>
                </li>
                <li class="item flex">
                    <div>
                        <label>密码</label>
                    </div>
                    <div class="rest input-wrap">
                        <input type="password" placeholder="请输入密码" v-model="pwd">
                    </div>
                </li>
            </ul>
            <div class="btn" @click="login"><span>登录</span></div>
        </form>
	</div>
</template>
<script>
import { getUser } from "@/util/axios.js";
import { setItem, checkSys } from "@/util/util.js";
import { strEnc, strDec } from "@/util/aes.js";
export default {
  data() {
    return {
      userName: "",
      pwd: ""
    };
  },
  methods: {
    async login() {
      var data = {
        userName: this.userName,
        pwd: this.pwd,
        platform: checkSys(),
        deviceno: ""
      };
      var enData = strEnc(JSON.stringify(data), "ZND20171030APIMM" );
      // console.log(this);
      if (!this.userName.trim()) {
        this.$message("账号不能为空");
      } else if (!this.pwd.trim()) {
        this.$message("密码不能为空");
      } else {
        let res = await getUser(enData);
        if (res.code === "0000") {
        let deData1 = strDec(res.data,"ZND20171030APIMM");
        let deData = JSON.parse(deData1);
          setItem("userInfo", deData);
          if (deData.changePwd === "0") {
            this.$router.push({ path: "/resetPassword" });
          } else {
            this.$router.push({ path: "/" });
          }
        } else {
          this.$message(res.msg);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.login {
  position: relative;
  height: 100%;
  .logo {
    margin: 0 auto;
    width: rem(384px);
    height: rem(284px);
    background-image: url("../assets/logo.png");
    background-size: 100%;
  }
  .form {
    position: absolute;
    padding: rem(30px) rem(48px) rem(74px) rem(53px);
    left: 50%;
    top: rem(218px);
    transform: translateX(-50%);
    width: rem(610px);
    font-size: rem(26px);
    color: $black;
    box-shadow: 0 rem(14px) rem(29px) rgba($color: #ddd, $alpha: 0.75);
    border-radius: rem(10px);
    box-sizing: border-box;
    .btn {
      margin-top: rem(74px);
      height: rem(82px);
      line-height: rem(82px);
      text-align: center;
      font-size: rem(32px);
      color: #fff;
      background: $blue;
      border-radius: rem(10px);
    }
  }
  .item {
    height: rem(100px);
    border-bottom: 1px solid $bdcolor;
  }
  label {
    display: inline-block;
    width: rem(150px);
  }
  input {
    border: none;
  }
}
</style>
<style lang="scss">
@import "../assets/style/common.scss";
.login {
  .el-input__inner {
    border: 0;
    text-align: center;
    font-size: rem(24px);
    color: #999999;
  }
  .el-button {
    width: 100%;
    margin-top: rem(74px);
    height: rem(82px);
    font-size: rem(30px);
  }
}
</style>
